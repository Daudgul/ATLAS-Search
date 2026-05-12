import styles from "../styles/globalStyles";

export default function HeroIdle() {
  return (
    <div style={styles.hero}>
      <div style={styles.heroGlyph}>✦</div>
      <h2 style={styles.heroHeadline}>Discover Products</h2>
      <p style={styles.heroSub}>
        Search thousands of items — start typing above to explore.
      </p>
      <div style={styles.chips}>
        {["Jeans", "Sneakers", "Jackets", "Dresses", "Bags"].map((t) => (
          <span key={t} style={styles.chip}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
