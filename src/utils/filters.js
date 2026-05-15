export const DEFAULT_FILTERS = {
  brand: "",
  colorFamily: "",
  onSale: false,
  priceRange: null,
};

export function applyFilters(products, filters) {
  return products.filter((product) => {
    if (
      filters.brand &&
      product.brand !== filters.brand
    ) {
      return false;
    }

    if (filters.colorFamily) {
      const colors = Array.isArray(product.color_family)
        ? product.color_family
        : [product.color_family];

      if (!colors.includes(filters.colorFamily)) {
        return false;
      }
    }

    if (filters.onSale) {
      const onSale = Array.isArray(product.on_sale)
        ? product.on_sale[0]
        : product.on_sale;

      if (onSale !== "Yes") {
        return false;
      }
    }

    if (filters.priceRange) {
      const price = Number(product.price);

      if (
        price < filters.priceRange[0] ||
        price > filters.priceRange[1]
      ) {
        return false;
      }
    }

    return true;
  });
}