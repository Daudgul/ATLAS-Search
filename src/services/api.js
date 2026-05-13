const SITE_ID = "scmq7n";

const API_BASE =
  "https://api.searchspring.net/api/search/search.json";


export async function fetchProducts({
  query,
  page = 1,
  filters = {},
  sort = null,
}) {

  const params = new URLSearchParams({
    siteId: SITE_ID,
    q: query,
    resultsFormat: "native",
    page,
  });



  Object.entries(filters).forEach(([key, values]) => {

    if (!Array.isArray(values)) return;

    values.forEach((value) => {

      if (
        key === "price" &&
        typeof value === "object"
      ) {

        if (value.low != null) {
          params.append("filter.price.low", value.low);
        }

        if (value.high != null) {
          params.append("filter.price.high", value.high);
        }

        return;
      }

      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {

        params.append(`filter.${key}`, value);
      }
    });
  });



  if (
    sort?.field &&
    sort.field !== "relevance"
  ) {

    params.append(
      "sort.field",
      sort.field
    );

    params.append(
      "sort.direction",
      sort.direction || "asc"
    );
  }

  console.log(`${API_BASE}?${params}`);


  const res = await fetch(`${API_BASE}?${params}`);

  if (!res.ok) {
    throw new Error(
      `API error ${res.status}: ${res.statusText}`
    );
  }

  return res.json();
}