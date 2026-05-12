import styles from "../styles/globalStyles";

export default function ErrorState({ message, onRetry }) {
  return (
    <div style={styles.empty}>
      <div style={styles.emptyIcon}>
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#b04"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p style={styles.emptyTitle}>Something went wrong</p>
      <p style={styles.emptyText}>{message}</p>
      <button onClick={onRetry} style={styles.retryBtn}>
        Retry
      </button>
    </div>
  );
}
