/** Resolves paths for files in `public/` using Vite `import.meta.env.BASE_URL`. */
export function publicUrl(path: string): string {
  const normalized = path.replace(/^\/+/, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
}
