export function sortProducts(products, sortBy) {
  const sorted = [...products];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => Number(a.price) - Number(b.price));

    case "price-desc":
      return sorted.sort((a, b) => Number(b.price) - Number(a.price));

    case "name-asc":
      return sorted.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case "name-desc":
      return sorted.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

    default:
      return sorted;
  }
}