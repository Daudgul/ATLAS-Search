import React from "react";

export const EmptyState = ({ query }) => (
  <div style={{ textAlign: "center", padding: "80px 20px" }}>
    <h3 style={{ color: "#c9a84c" }}>No results for "{query}"</h3>
    <p style={{ color: "#666" }}>Try adjusting your search terms or filters.</p>
  </div>
);

export const LoadingGrid = () => (
  <div className="grid">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="product-card shimmer"
        style={{ height: "320px" }}
      />
    ))}
  </div>
);
