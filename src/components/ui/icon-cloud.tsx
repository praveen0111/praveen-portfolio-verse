/**
 * Magic UI — Icon Cloud (image URLs)
 * https://magicui.design/docs/components/icon-cloud
 *
 * Display is always square (no CSS non-uniform stretch). Canvas backing store
 * matches layout size × DPR; sphere scales with the container.
 */
import { useEffect, useRef, useState } from "react";

interface Icon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
}

export interface IconCloudProps {
  images: string[];
  /** Same length as `images`; shown on hover on small screens (floating tooltip). */
  labels?: string[];
  /**
   * Desktop (`lg+`): click an icon (short drag only) to select — stable side panel, no hover-driven updates.
   * Floating name tooltip is disabled when this is set.
   */
  onSelectIndex?: (index: number) => void;
}

/** Baseline layout size used to tune fibonacci sphere positions in the original design */
const BASE_SIZE = 400;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Draw image scaled to fit inside the box without cropping or stretching (object-fit: contain). */
function drawImageContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return;
  const s = Math.min(boxW / iw, boxH / ih);
  const dw = iw * s;
  const dh = ih * s;
  const dx = boxX + (boxW - dw) / 2;
  const dy = boxY + (boxH - dh) / 2;
  ctx.drawImage(img, dx, dy, dw, dh);
}

const ICON_TEXTURE_PX = 192;

const Z_NEAR = 200;
const Z_SCALE_DIV = 300;

/** Back-of-sphere opacity vs front (draw order is sorted by Z so back layers sit under front). */
const DEPTH_OPACITY_MIN = 0.12;
const DEPTH_OPACITY_MAX = 1;
/** >1 pushes mid-depth icons darker so “behind” reads more clearly when overlapping. */
const DEPTH_OPACITY_GAMMA = 1.35;

/** Fibonacci sphere radius in world units (higher = icons use more of the square). */
const SPHERE_WORLD_RADIUS = 118;
/** Half-width of each icon slot as a fraction of canvas side. */
const ICON_SLOT_FRAC = 0.09;
/**
 * Picking uses a larger radius than drawing so logos are easier to click on dense clouds
 * (especially when depthScale shrinks back-facing icons).
 */
const PICK_RADIUS_MULT = 1.5;
/** Total pointer travel (px, Euclidean) below this still counts as a click, not a drag. */
const CLICK_DRAG_THRESHOLD_PX = 26;
/** After a selected logo snaps to center, pause idle spin for this long (ms). */
const SELECT_CENTER_HOLD_MS = 1000;

function rotationTargetsForIconAtCenter(icon: { x: number; y: number; z: number }) {
  const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z));
  const targetY = Math.atan2(icon.x, icon.z);
  return { targetX, targetY };
}

export function IconCloud({ images, labels, onSelectIndex }: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [logicalSize, setLogicalSize] = useState(BASE_SIZE);
  const [texturePx, setTexturePx] = useState(192);
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: BASE_SIZE / 2, y: BASE_SIZE / 2 });
  const [targetRotation, setTargetRotation] = useState<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    distance: number;
    startTime: number;
    duration: number;
  } | null>(null);
  const animationFrameRef = useRef<number>(0);
  const rotationRef = useRef({ x: 0, y: 0 });
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);
  const isDraggingRef = useRef(false);
  const dprRef = useRef(1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isLgScreen, setIsLgScreen] = useState(false);
  const isLgScreenRef = useRef(false);
  const onSelectIndexRef = useRef(onSelectIndex);
  onSelectIndexRef.current = onSelectIndex;
  /** Pointer-down hit + drag distance — click-to-select without counting drags as clicks */
  const pointerDownHitRef = useRef<number | null>(null);
  const dragDistRef = useRef(0);
  const pointerCaptureIdRef = useRef<number | null>(null);
  /** When true, rAF must not apply scripted targetRotation (cleared synchronously on drag; state can lag a frame). */
  const skipTargetRotationRef = useRef(false);
  /** After select-snap animation ends, idle spin stays off until this timestamp (performance.now()). */
  const postSelectHoldUntilRef = useRef<number | null>(null);
  /** True while animating toward a logo clicked in select mode — triggers hold when snap completes. */
  const pendingSelectHoldAfterSnapRef = useRef(false);

  const worldToPx = (v: number) => v * (logicalSize / BASE_SIZE);

  const desktopSelectMode = Boolean(onSelectIndex);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      const m = mq.matches;
      setIsLgScreen(m);
      isLgScreenRef.current = m;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const showFloatingTooltip =
    Boolean(labels?.length) &&
    hoveredIndex !== null &&
    Boolean(labels?.[hoveredIndex ?? -1]) &&
    !(isLgScreen && desktopSelectMode);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const cr = el.getBoundingClientRect();
      const w = cr.width;
      const h = cr.height;
      const logical = Math.floor(Math.min(w, h));
      if (logical < 16) return;

      const dpr = clamp(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1, 2.5);
      dprRef.current = dpr;

      const iconRadiusLogical = logical * ICON_SLOT_FRAC;
      const tex = clamp(Math.round(iconRadiusLogical * 2 * dpr * 2.25), 128, 384);

      setLogicalSize(logical);
      setTexturePx(tex);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!images?.length) return;

    imagesLoadedRef.current = new Array(images.length).fill(false);
    const r = texturePx / 2;

    const newIconCanvases = images.map((src, index) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = texturePx;
      offscreen.height = texturePx;
      const offCtx = offscreen.getContext("2d");

      if (offCtx) {
        const img = new Image();
        img.decoding = "async";
        img.src = src;
        img.onload = () => {
          offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
          drawImageContain(offCtx, img, 0, 0, texturePx, texturePx);
          imagesLoadedRef.current[index] = true;
        };
        img.onerror = () => {
          imagesLoadedRef.current[index] = false;
        };
      }
      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;
  }, [images, texturePx]);

  useEffect(() => {
    if (isDraggingRef.current) return;
    setMousePos({ x: logicalSize / 2, y: logicalSize / 2 });
  }, [logicalSize]);

  useEffect(() => {
    const numIcons = images.length || 20;
    const newIcons: Icon[] = [];
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const rad = Math.sqrt(1 - y * y);
      const phi = i * increment;
      const x = Math.cos(phi) * rad;
      const z = Math.sin(phi) * rad;
      newIcons.push({
        x: x * SPHERE_WORLD_RADIUS,
        y: y * SPHERE_WORLD_RADIUS,
        z: z * SPHERE_WORLD_RADIUS,
        scale: 1,
        opacity: 1,
        id: i,
      });
    }
    setIconPositions(newIcons);
  }, [images]);

  const clientToCanvas = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const L = logicalSize;
    if (!canvas) return { x: L / 2, y: L / 2 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * L,
      y: ((clientY - rect.top) / rect.height) * L,
    };
  };

  /** Frontmost icon under point (largest rotated Z wins when overlapping). */
  const pickIconAtLogical = (x: number, y: number): number | null => {
    const L = logicalSize;
    if (L < 16 || !iconPositions.length) return null;
    const iconRadiusLogical = L * ICON_SLOT_FRAC;
    const rx = rotationRef.current.x;
    const ry = rotationRef.current.y;
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);

    let bestZ = -Infinity;
    let bestIndex: number | null = null;

    iconPositions.forEach((icon, index) => {
      if (!imagesLoadedRef.current[index]) return;

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const depthScale = (rotatedZ + Z_NEAR) / Z_SCALE_DIV;
      const pickR = iconRadiusLogical * depthScale * PICK_RADIUS_MULT;
      const screenX = L / 2 + worldToPx(rotatedX);
      const screenY = L / 2 + worldToPx(rotatedY);
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < pickR * pickR && rotatedZ > bestZ) {
        bestZ = rotatedZ;
        bestIndex = index;
      }
    });

    return bestIndex;
  };

  const updateHoverFromEvent = (clientX: number, clientY: number) => {
    if (!labels?.length || isDraggingRef.current || (isLgScreenRef.current && desktopSelectMode)) {
      setHoveredIndex(null);
      return;
    }
    const { x, y } = clientToCanvas(clientX, clientY);
    const idx = pickIconAtLogical(x, y);
    if (idx === null || !labels[idx]) {
      setHoveredIndex(null);
      return;
    }
    setHoveredIndex(idx);
    setTooltipPos({ x: clientX + 14, y: clientY + 14 });
  };

  const handlePointerDown = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const L = logicalSize;
    const iconRadiusLogical = L * ICON_SLOT_FRAC;
    const { x, y } = clientToCanvas(clientX, clientY);
    setMousePos({ x, y });

    setTargetRotation(null);
    skipTargetRotationRef.current = false;
    pendingSelectHoldAfterSnapRef.current = false;
    postSelectHoldUntilRef.current = null;

    pointerDownHitRef.current = pickIconAtLogical(x, y);
    dragDistRef.current = 0;

    setHoveredIndex(null);

    const zNear = Z_NEAR;
    const zScaleDiv = Z_SCALE_DIV;

    // Snap-to-icon fights manual drag (rotationRef overwritten each frame). Skip when using click-to-select.
    if (!desktopSelectMode) {
      iconPositions.forEach((icon) => {
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);

        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        const screenX = L / 2 + worldToPx(rotatedX);
        const screenY = L / 2 + worldToPx(rotatedY);
        const depthScale = (rotatedZ + zNear) / zScaleDiv;
        const pickR = iconRadiusLogical * depthScale * PICK_RADIUS_MULT;
        const dx = x - screenX;
        const dy = y - screenY;

        if (dx * dx + dy * dy < pickR * pickR) {
          const { targetX, targetY } = rotationTargetsForIconAtCenter(icon);
          const currentX = rotationRef.current.x;
          const currentY = rotationRef.current.y;
          const distance = Math.sqrt(Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2));
          const duration = Math.min(2000, Math.max(800, distance * 1000));
          setTargetRotation({
            x: targetX,
            y: targetY,
            startX: currentX,
            startY: currentY,
            distance,
            startTime: performance.now(),
            duration,
          });
        }
      });
    }

    isDraggingRef.current = true;
    setIsDragging(true);
    setLastMousePos({ x: clientX, y: clientY });
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    setMousePos(clientToCanvas(clientX, clientY));

    if (isDraggingRef.current) {
      const deltaX = clientX - lastMousePos.x;
      const deltaY = clientY - lastMousePos.y;
      if (deltaX !== 0 || deltaY !== 0) {
        skipTargetRotationRef.current = true;
        pendingSelectHoldAfterSnapRef.current = false;
        postSelectHoldUntilRef.current = null;
        setTargetRotation(null);
      }
      dragDistRef.current += Math.hypot(deltaX, deltaY);
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.0034,
        y: rotationRef.current.y - deltaX * 0.0034,
      };
      setLastMousePos({ x: clientX, y: clientY });
    } else {
      updateHoverFromEvent(clientX, clientY);
    }
  };

  const releaseCaptureIfAny = (el: HTMLCanvasElement) => {
    const id = pointerCaptureIdRef.current;
    if (id == null) return;
    try {
      el.releasePointerCapture(id);
    } catch {
      /* not capturing */
    }
    pointerCaptureIdRef.current = null;
  };

  const endPointer = (el: HTMLCanvasElement | null, applySelect: boolean) => {
    if (el) releaseCaptureIfAny(el);

    const selectCb = onSelectIndexRef.current;
    const hit = pointerDownHitRef.current;
    const dist = dragDistRef.current;
    pointerDownHitRef.current = null;
    dragDistRef.current = 0;

    if (applySelect && selectCb && hit !== null && dist < CLICK_DRAG_THRESHOLD_PX) {
      selectCb(hit);
      const icon = iconPositions[hit];
      if (icon) {
        const { targetX, targetY } = rotationTargetsForIconAtCenter(icon);
        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const rotDist = Math.hypot(targetX - currentX, targetY - currentY);
        const duration = Math.min(1400, Math.max(450, rotDist * 950));
        skipTargetRotationRef.current = false;
        pendingSelectHoldAfterSnapRef.current = true;
        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance: rotDist,
          startTime: performance.now(),
          duration,
        });
      }
    }

    isDraggingRef.current = false;
    skipTargetRotationRef.current = false;
    setIsDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || logicalSize < 16) return;

    const L = logicalSize;
    const dpr = dprRef.current;
    canvas.width = Math.max(1, Math.round(L * dpr));
    canvas.height = Math.max(1, Math.round(L * dpr));
    canvas.style.width = `${L}px`;
    canvas.style.height = `${L}px`;

    const zNear = Z_NEAR;
    const zScaleDiv = Z_SCALE_DIV;
    const zSpan = 2 * SPHERE_WORLD_RADIUS;
    const iconHalfLogical = L * ICON_SLOT_FRAC;
    const drawDiameter = iconHalfLogical * 2;

    const animate = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, L, L);

      const centerX = L / 2;
      const centerY = L / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const dx = mousePos.x - centerX;
      const dy = mousePos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.003 + (distance / maxDistance) * 0.01;

      const now = performance.now();

      if (targetRotation && !skipTargetRotationRef.current) {
        const elapsed = now - targetRotation.startTime;
        const progress = Math.min(1, elapsed / targetRotation.duration);
        const easedProgress = easeOutCubic(progress);
        rotationRef.current = {
          x: targetRotation.startX + (targetRotation.x - targetRotation.startX) * easedProgress,
          y: targetRotation.startY + (targetRotation.y - targetRotation.startY) * easedProgress,
        };
        if (progress >= 1) {
          setTargetRotation(null);
          if (pendingSelectHoldAfterSnapRef.current) {
            pendingSelectHoldAfterSnapRef.current = false;
            postSelectHoldUntilRef.current = performance.now() + SELECT_CENTER_HOLD_MS;
          }
        }
      } else if (!isDraggingRef.current) {
        const holdUntil = postSelectHoldUntilRef.current;
        if (holdUntil == null || now >= holdUntil) {
          if (holdUntil != null) postSelectHoldUntilRef.current = null;
          rotationRef.current = {
            x: rotationRef.current.x + (dy / L) * speed,
            y: rotationRef.current.y - (dx / L) * speed,
          };
        }
      }

      const rx = rotationRef.current.x;
      const ry = rotationRef.current.y;
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      type DrawItem = {
        index: number;
        rotatedX: number;
        rotatedY: number;
        rotatedZ: number;
      };
      const drawList: DrawItem[] = [];

      iconPositions.forEach((icon, index) => {
        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;
        drawList.push({ index, rotatedX, rotatedY, rotatedZ });
      });

      drawList.sort((a, b) => a.rotatedZ - b.rotatedZ);

      for (const { index, rotatedX, rotatedY, rotatedZ } of drawList) {
        const depthScale = (rotatedZ + zNear) / zScaleDiv;
        const depthT = clamp((rotatedZ + SPHERE_WORLD_RADIUS) / zSpan, 0, 1);
        const opacity =
          DEPTH_OPACITY_MIN +
          (DEPTH_OPACITY_MAX - DEPTH_OPACITY_MIN) * Math.pow(depthT, DEPTH_OPACITY_GAMMA);

        ctx.save();
        ctx.translate(centerX + worldToPx(rotatedX), centerY + worldToPx(rotatedY));
        ctx.scale(depthScale, depthScale);
        ctx.globalAlpha = opacity;

        if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
          ctx.drawImage(
            iconCanvasesRef.current[index],
            -iconHalfLogical,
            -iconHalfLogical,
            drawDiameter,
            drawDiameter,
          );
        }

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [iconPositions, isDragging, mousePos, targetRotation, images.length, logicalSize]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[min(416px,67vw)] touch-none lg:mx-0 lg:max-w-none"
    >
      <div className="block w-full pt-[100%]" aria-hidden />
      <canvas
        ref={canvasRef}
        className={
          isDragging
            ? "absolute inset-0 block h-full w-full cursor-grabbing touch-none rounded-lg select-none"
            : labels?.length && hoveredIndex !== null
              ? "absolute inset-0 block h-full w-full cursor-pointer touch-none rounded-lg select-none"
              : "absolute inset-0 block h-full w-full cursor-grab touch-none rounded-lg select-none"
        }
        onPointerDown={(e) => {
          if (!e.isPrimary) return;
          if (e.pointerType === "mouse" && e.button !== 0) return;
          pointerCaptureIdRef.current = e.pointerId;
          e.currentTarget.setPointerCapture(e.pointerId);
          handlePointerDown(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (!e.isPrimary) return;
          handlePointerMove(e.clientX, e.clientY);
        }}
        onPointerUp={(e) => {
          if (!e.isPrimary) return;
          endPointer(e.currentTarget, true);
        }}
        onPointerCancel={(e) => {
          if (!e.isPrimary) return;
          setHoveredIndex(null);
          endPointer(e.currentTarget, false);
        }}
        onPointerLeave={() => {
          if (!isDraggingRef.current) setHoveredIndex(null);
        }}
        aria-label={
          desktopSelectMode
            ? "Draggable tech stack: drag to rotate; click an icon for details"
            : "Draggable tech stack icon cloud"
        }
        role="img"
      />
      {showFloatingTooltip && (
        <div
          role="tooltip"
          className="pointer-events-none fixed z-[300] max-w-[min(18rem,calc(100vw-1.5rem))] rounded-md border-[3px] border-black bg-[hsl(var(--think-accent))] px-3 py-1.5 font-comic text-sm font-bold leading-tight text-black shadow-[4px_4px_0_0_rgba(0,0,0,0.35)]"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          {labels![hoveredIndex!]}
        </div>
      )}
    </div>
  );
}
