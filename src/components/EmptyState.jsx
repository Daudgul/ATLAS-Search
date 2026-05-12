import styles from "../styles/globalStyles";

export default function EmptyState({ query }) {
  return (
    <div style={styles.empty}>
      <div style={styles.emptyIcon}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#444"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" stroke="#666" />
          <line x1="11" y1="8" x2="11" y2="14" stroke="#333" />
        </svg>
      </div>
      <p style={styles.emptyTitle}>No results for "{query}"</p>
      <p style={styles.emptyText}>
        Try a different keyword or check your spelling.
      </p>
    </div>
  );
}
