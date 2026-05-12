import { RESULTS_PER_PAGE } from "../constants";
import styles from "../styles/globalStyles";

export default function ResultsMeta({ query, total, current, totalPages }) {
  const from = (current - 1) * RESULTS_PER_PAGE + 1;
  const to = Math.min(current * RESULTS_PER_PAGE, total);
  return (
    <div style={styles.resultsMeta}>
      <span style={styles.metaQuery}>"{query}"</span>
      <span style={styles.metaDivider}>·</span>
      <span style={styles.metaCount}>{total.toLocaleString()} results</span>
      <span style={styles.metaDivider}>·</span>
      <span style={styles.metaRange}>
        Showing {from}–{to}
      </span>
    </div>
  );
}
