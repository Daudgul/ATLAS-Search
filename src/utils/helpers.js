export const RESULTS_PER_PAGE = 20;
export const PAGE_WINDOW = 2;


export function formatPrice(val) {
  const n = parseFloat(val);
  if (isNaN(n)) return null;
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}


export function getPageRange(current, total) {
  const pages = [];
  const start = Math.max(1, current - PAGE_WINDOW);
  const end = Math.min(total, current + PAGE_WINDOW);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("…");
  }

  for (let i = start; i <= end; i++) pages.push(i);

  if (end < total) {
    if (end < total - 1) pages.push("…");
    pages.push(total);
  }

  return pages;
}