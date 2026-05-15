export function htmlDecode(str = "") {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function extractFacets(facets = []) {
  const result = {};

  facets.forEach((item) => {
    result[item.field] = item;
  });

  return result;
}