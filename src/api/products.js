const API_BASE =
  "https://api.searchspring.net/api/search/search.json";

const SITE_ID = "scmq7n";

export async function fetchProducts({
  query,
  page = 1,
  filters = {},
  sortBy ,
}) {
  const params = new URLSearchParams({
    siteId: SITE_ID,
    resultsFormat: "native",
    q: query,
    page,
  });

 filters.brands.forEach((brand) => {
  params.append("filter.brand", brand);
});

filters.colors.forEach((color) => {
  params.append(
    "filter.color_family",
    color
  );
});

  if (filters.onSale) {
    params.append(
      "filter.on_sale",
      "Yes"
    );
  }

  if (sortBy !== "default") {
    if (
  sortBy?.field &&
  sortBy?.direction
) {
  params.append(
    `sort.${sortBy.field}`,
    sortBy.direction
  );
}
  }

  const response = await fetch(
    `${API_BASE}?${params}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch products"
    );
  }

  return response.json();
}