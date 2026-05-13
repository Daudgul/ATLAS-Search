import { useState } from "react";
import { formatPrice } from "../utils/helpers";

export default function ProductCard({ product, index }) {
  const { name, thumbnailImageUrl, price, msrp } = product;

  const priceNum = parseFloat(price);
  const msrpNum = parseFloat(msrp);
  const hasDiscount = msrp && msrpNum > priceNum;
  const discount = hasDiscount
    ? Math.round(((msrpNum - priceNum) / msrpNum) * 100)
    : null;

  const [imgError, setImgError] = useState(false);
  const animationDelay = `${(index % 10) * 45}ms`;

  return (
    <div className="card" style={{ animationDelay }}>
      {/* Image */}
      <div className="card-image-wrap">
        {imgError || !thumbnailImageUrl ? (
          <div className="card-img-placeholder">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#444"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        ) : (
          <img
            src={thumbnailImageUrl}
            alt={name}
            className="card-img"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}

        {hasDiscount && <span className="discount-badge">−{discount}%</span>}
      </div>

      {/* Body */}
      <div className="card-body">
        <p className="product-name">{name || "Unnamed Product"}</p>
        <div className="price-row">
          <span className="price">{formatPrice(price) ?? "—"}</span>
          {hasDiscount && <span className="msrp">{formatPrice(msrp)}</span>}
        </div>
      </div>
    </div>
  );
}
