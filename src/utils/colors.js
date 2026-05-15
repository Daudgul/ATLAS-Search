export const COLOR_MAP = {
  white: "#ffffff",
  black: "#1a1a1a",
  blue: "#3a6ea5",
  red: "#c0392b",
  green: "#4a7c59",
  yellow: "#f9d342",
  pink: "#f48fb1",
  beige: "#f5f5dc",
  brown: "#7d5a3c",
  grey: "#9e9e9e",
  gray: "#9e9e9e",
  purple: "#7b5ea7",
  orange: "#e8873a",
};

export const LIGHT_COLORS = new Set([
  "white",
  "beige",
  "yellow",
]);

export function resolveColor(name = "") {
  const key = name.toLowerCase();

  return COLOR_MAP[key] || "#cccccc";
}