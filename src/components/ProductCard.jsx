import { useState } from "react";
import styles from "../styles/globalStyles";
import { formatPrice } from "../utils/formatPrice";

export default function ProductCard({ product, index }) {
  const { name, thumbnailImageUrl, price, msrp } = product;
  const priceNum = parseFloat(price);
  const msrpNum = parseFloat(msrp);
  const hasDiscount = msrp && msrpNum > priceNum;
  const discount = hasDiscount
    ? Math.round(((msrpNum - priceNum) / msrpNum) * 100)
    : null;

  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const delay = `${(index % 10) * 40}ms`;

  return (
    <div
      style={{
        ...styles.card,
        ...(hovered ? styles.cardHover : {}),
        animationDelay: delay,
      }}
      className="card-animate"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.imageWrap}>
        {imgError || !thumbnailImageUrl ? (
          <div style={styles.imgPlaceholder}>
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
            style={{
              ...styles.img,
              transform: hovered ? "scale(1.07)" : "scale(1)",
            }}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
        {hasDiscount && <span style={styles.discountBadge}>−{discount}%</span>}
      </div>

      <div style={styles.cardBody}>
        <p style={styles.productName}>{name || "Unnamed Product"}</p>
        <div style={styles.priceRow}>
          <span style={styles.price}>{formatPrice(price) ?? "—"}</span>
          {hasDiscount && <span style={styles.msrp}>{formatPrice(msrp)}</span>}
        </div>
      </div>
    </div>
  );
}
