import styles from "../styles/globalStyles";
import { getPageRange } from "../utils/pagination";

export default function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;
  const pages = getPageRange(current, total);

  return (
    <nav style={styles.pagination} aria-label="Pagination">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        style={{
          ...styles.pageBtn,
          ...(current === 1 ? styles.pageBtnDisabled : {}),
        }}
        aria-label="Previous page"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span>Prev</span>
      </button>

      <div style={styles.pageNumbers}>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} style={styles.ellipsis}>
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => p !== current && onChange(p)}
              style={{
                ...styles.pageNumber,
                ...(p === current ? styles.pageNumberActive : {}),
              }}
              aria-current={p === current ? "page" : undefined}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        style={{
          ...styles.pageBtn,
          ...(current === total ? styles.pageBtnDisabled : {}),
        }}
        aria-label="Next page"
      >
        <span>Next</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </nav>
  );
}
