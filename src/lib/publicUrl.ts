/** Resolves paths for files in `public/` when Vite `base` is not `/` (e.g. GitHub Pages project site). */
export function publicUrl(path: string): string {
  const normalized = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}
