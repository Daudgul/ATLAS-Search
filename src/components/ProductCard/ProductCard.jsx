import { useState } from "react";

import "./ProductCard.css";

import { LIGHT_COLORS, resolveColor } from "../../utils/colors";

import { htmlDecode } from "../../utils/helpers";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);

  const images = [product.thumbnailImageUrl, product.imageUrl].filter(Boolean);

  const image = hovered && images[1] ? images[1] : images[0];

  const productName = htmlDecode(product.name);

  const colors = Array.isArray(product.color) ? product.color : [];

  const price = Number(product.price);

  const msrp = Number(product.msrp);

  const showSalePrice = !isNaN(msrp) && msrp > price;

  const onSale =
    (Array.isArray(product.on_sale) ? product.on_sale[0] : product.on_sale) ===
    "Yes";

  return (
    <article
      className="productCard"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="productCard__imageWrapper">
        {image ? (
          <img
            src={image}
            alt={productName}
            className="productCard__image"
            loading="lazy"
          />
        ) : (
          <div className="productCard__placeholder">No Image</div>
        )}
      </div>

      <div className="productCard__content">
        {product.brand && (
          <span className="productCard__brand">{product.brand}</span>
        )}

        <h3 className="productCard__title">{productName}</h3>

        {colors.length > 0 && (
          <div className="productCard__colors">
            {colors.slice(0, 4).map((color) => {
              const isLight = LIGHT_COLORS.has(color.toLowerCase());

              return (
                <span
                  key={color}
                  className={`productCard__color ${
                    isLight ? "productCard__color--light" : ""
                  }`}
                  style={{
                    background: resolveColor(color),
                  }}
                />
              );
            })}
          </div>
        )}

        <div className="productCard__pricing">
          <span
            className={`productCard__price ${
              onSale ? "productCard__price--sale" : ""
            }`}
          >
            ${price.toFixed(2)}
          </span>

          {showSalePrice && (
            <span className="productCard__msrp">${msrp.toFixed(2)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
