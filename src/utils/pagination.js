import { PAGE_WINDOW } from "../constants";


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
