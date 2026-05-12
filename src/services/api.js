import { API_BASE, SITE_ID } from "../constants";


export async function fetchProducts({ query, page = 1, signal }) {
  const params = new URLSearchParams({
    siteId: SITE_ID,
    q: query,
    resultsFormat: "native",
    page,
  });

  const response = await fetch(`${API_BASE}?${params}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

