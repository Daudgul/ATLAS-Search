import { useState, useEffect, useRef, useCallback } from "react";
import { fetchProducts } from "./services/api";
import SearchBar from "./components/SearchBar";
import ErrorState from "./components/ErrorState";
import EmptyState from "./components/EmptyState";
import ResultsMeta from "./components/ResultsMeta";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
import HeroIdle from "./components/HeroIdle";
import styles from "./styles/globalStyles";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const search = useCallback(async (q, p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchProducts({ query: q, page: p });
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (q) => {
    setQuery(q);
    setPage(1);
    setData(null);
    search(q, 1);
  };

  const handlePageChange = (p) => {
    if (p < 1 || p > totalPages) return;

    setPage(p);
    search(query, p);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const products = data?.results ?? [];
  const totalResults = parseInt(data?.pagination?.totalResults ?? 0);
  const totalPages = data?.pagination?.totalPages || 0;

  const showResults = !loading && !error && data && products.length > 0;
  const showEmpty = !loading && !error && data && products.length === 0;

  return (
    <div style={styles.root}>
      <style>{cssAnimations}</style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>
            <span style={styles.logoMark}>✦</span>
            <span style={styles.logoText}>ATLAS</span>
            <span style={styles.logoPill}>Search Engine</span>
          </div>
          <span style={styles.tagline}>Discover products instantly</span>
        </div>
      </header>

      {/* Search hero */}
      <section style={styles.searchSection}>
        <div style={styles.searchSectionInner}>
          {!data && !loading && (
            <h1 style={styles.headline}>
              Find exactly <em style={styles.headlineEm}>what you need.</em>
            </h1>
          )}
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>
      </section>

      {/* Main content */}
      <main style={styles.main} ref={resultsRef}>
        <div style={styles.container}>
          {/* Loading skeleton */}
          {loading && (
            <div style={styles.skeletonGrid}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={styles.skeleton}>
                  <div style={styles.skeletonImg} className="shimmer" />
                  <div style={{ padding: "16px" }}>
                    <div
                      style={{ ...styles.skeletonLine, width: "90%" }}
                      className="shimmer"
                    />
                    <div
                      style={{
                        ...styles.skeletonLine,
                        width: "50%",
                        marginTop: 10,
                      }}
                      className="shimmer"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <ErrorState message={error} onRetry={() => search(query, page)} />
          )}

          {/* Empty */}
          {showEmpty && <EmptyState query={query} />}

          {/* Results */}
          {showResults && (
            <>
              <ResultsMeta
                query={query}
                total={totalResults}
                current={page}
                totalPages={totalPages}
              />
              <Pagination
                current={page}
                total={totalPages}
                onChange={handlePageChange}
              />
              <div style={styles.grid}>
                {products.map((product, i) => (
                  <ProductCard
                    key={product.id ?? i}
                    product={product}
                    index={i}
                  />
                ))}
              </div>
              <Pagination
                current={page}
                total={totalPages}
                onChange={handlePageChange}
              />
            </>
          )}

          {/* Idle state */}
          {!query && !loading && <HeroIdle />}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #161616",
          padding: "40px 24px",
          textAlign: "center",
          background: "#0a0a0a",
        }}
      >
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "25px",
          }}
        >
          <a
            href="https://github.com/Daudgul/ATLAS-Search"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#c9a84c",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            GitHub Profile
          </a>
          <a
            href="https://www.linkedin.com/in/daudgul/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#c9a84c",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            LinkedIn Profile
          </a>
        </div>
        <span>
          © {new Date().getFullYear()} ATLAS Search · Built with SearchSpring
          API
        </span>
      </footer>
    </div>
  );
}

const cssAnimations = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.35; transform: scale(1); }
    50%       { opacity: 0.6;  transform: scale(1.1); }
  }

  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }

  .shimmer {
    background: linear-gradient(90deg, #161616 25%, #1f1f1f 50%, #161616 75%);
    background-size: 600px 100%;
    animation: shimmer 1.4s infinite;
  }

  input::placeholder { color: #3a3a3a; }

  .search-box-focused {
    border-color: #c9a84c !important;
    box-shadow: 0 0 0 3px rgba(201,168,76,0.12), 0 8px 32px rgba(0,0,0,0.4) !important;
  }

  button:hover:not(:disabled) {
    filter: brightness(1.1);
  }
`;
