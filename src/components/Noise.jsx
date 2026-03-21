import { useRef, useEffect } from 'react';
import './Noise.css';

const MAX_BUFFER_SIDE = 2048;
/** Cap total pixels so redraw stays reasonable on large / retina screens */
const MAX_PIXELS = 2_200_000;

function computeBufferSize(parent) {
  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
  let w = Math.max(1, Math.floor(parent.clientWidth * dpr));
  let h = Math.max(1, Math.floor(parent.clientHeight * dpr));

  if (w > MAX_BUFFER_SIDE) {
    h = Math.max(1, Math.round((h * MAX_BUFFER_SIDE) / w));
    w = MAX_BUFFER_SIDE;
  }
  if (h > MAX_BUFFER_SIDE) {
    w = Math.max(1, Math.round((w * MAX_BUFFER_SIDE) / h));
    h = MAX_BUFFER_SIDE;
  }

  while (w * h > MAX_PIXELS && (w > 256 || h > 256)) {
    w = Math.max(256, Math.floor(w * 0.92));
    h = Math.max(256, Math.floor(h * 0.92));
  }

  return { w, h };
}

const Noise = ({
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 15
}) => {
  const grainRef = useRef(null);
  const dimsRef = useRef({ w: 512, h: 512 });

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId;
    const parent = canvas.parentElement;

    const resize = () => {
      if (!canvas || !parent) return;
      const { w, h } = computeBufferSize(parent);
      dimsRef.current = { w, h };
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };

    const ro =
      parent &&
      typeof ResizeObserver !== 'undefined' &&
      new ResizeObserver(() => resize());
    if (ro && parent) ro.observe(parent);

    const drawGrain = () => {
      const { w, h } = dimsRef.current;
      if (w < 1 || h < 1) return;

      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      const len = data.length;

      for (let i = 0; i < len; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      const hidden = typeof document !== 'undefined' && document.visibilityState === 'hidden';
      if (!hidden && frame % patternRefreshInterval === 0) {
        drawGrain();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible') frame = 0;
    };

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    resize();
    loop();

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.cancelAnimationFrame(animationId);
    };
  }, [patternRefreshInterval, patternAlpha]);

  return <canvas className="noise-overlay" ref={grainRef} />;
};

export default Noise;
