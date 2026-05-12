export function formatPrice(value) {
  const number = parseFloat(value);

  if (isNaN(number)) return "—";

  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}