import "./ProductGrid.css";

import ProductCard from "../ProductCard/ProductCard";

export default function ProductGrid({ products, loading, query }) {
  if (loading) {
    return (
      <div className="productGrid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="productGrid__skeleton" />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="productGrid__empty">No products found for "{query}"</div>
    );
  }

  return (
    <div className="productGrid">
      {products.map((product) => (
        <ProductCard key={product.uid} product={product} />
      ))}
    </div>
  );
}
