export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If the src is a relative path, return it as-is (e.g., for local project assets)
  if (src.startsWith('/')) return src;

  const params = [`width=${width}`, `quality=${quality ?? 75}`, 'format=auto'];
  const url = new URL(src);
  return `${url.origin}/cdn-cgi/image/${params.join(',')}${url.pathname}`;
}
