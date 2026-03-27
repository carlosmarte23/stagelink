export function buildUnspashImageUrl(
  baseUrl,
  { width = 800, quality = 75 } = {},
) {
  const url = new URL(baseUrl);

  url.searchParams.set("fit", "crop");
  url.searchParams.set("fm", "jpg");
  url.searchParams.set("auto", "format");
  url.searchParams.set("w", width);
  url.searchParams.set("q", quality);

  return url.toString();
}
