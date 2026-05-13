import { useRef } from "react";
import "./App.css";

import LandingPage from "./components/LandingPage";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";
import ResultsMeta from "./components/ResultsMeta";
import SkeletonGrid from "./components/SkeletonGrid";
import FilterSidebar from "./components/FilterSidebar";
import SortBar from "./components/SortBar";
import { EmptyState, ErrorState } from "./components/States";
import { useSearch } from "./hooks/useSearch";

export default function App() {
  console.log("COMPONENT RENDERED");
  const {
    query,
    page,
    products,
    facets,
    sortOptions,
    totalResults,
    totalPages,
    filters,
    activeFilterCount,
    sort,
    loading,
    error,
    hasSearched,
    handleSearch,
    handlePageChange,
    handleFilterToggle,
    handleClearFilters,
    handleSortChange,
    retry,
  } = useSearch();

  const resultsRef = useRef(null);

  const onPageChange = (p) => {
    handlePageChange(p);
    setTimeout(
      () =>
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      80,
    );
  };

  if (!hasSearched && !loading) {
    return <LandingPage onEnterSearch={handleSearch} />;
  }

  const showSkeleton = loading && products.length === 0;
  const showOverlay = loading && products.length > 0;
  const showError = !loading && !!error;
  const showEmpty = !loading && !error && hasSearched && products.length === 0;
  const showResults = products.length > 0;

  return (
    <div className="app-root">
      <header className="header">
        <div className="header-inner">
          <button
            className="logo"
            onClick={() => window.location.reload()}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Go to home"
          >
            <span className="logo-mark">✦</span>
            <span className="logo-text">ATLAS</span>
            <span className="logo-pill">Search</span>
          </button>

          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>
      </header>

      <div className="content-layout">
        {(facets.length > 0 || loading) && (
          <FilterSidebar
            facets={facets}
            filters={filters}
            activeFilterCount={activeFilterCount}
            onToggle={handleFilterToggle}
            onClear={handleClearFilters}
            loading={loading}
          />
        )}

        <main className="main" ref={resultsRef}>
          <div className="results-area">
            {(showResults || showSkeleton) && (
              <SortBar
                sortOptions={sortOptions}
                activeSort={sort}
                onSortChange={handleSortChange}
                filters={filters}
                facets={facets}
                onFilterToggle={handleFilterToggle}
                totalResults={totalResults}
                loading={loading}
              />
            )}

            {showSkeleton && <SkeletonGrid count={8} />}
            {showError && <ErrorState message={error} onRetry={retry} />}
            {showEmpty && <EmptyState query={query} />}

            {showResults && (
              <>
                <ResultsMeta
                  query={query}
                  total={totalResults}
                  current={page}
                />

                <Pagination
                  current={page}
                  total={totalPages}
                  onChange={onPageChange}
                />

                <div className={`grid${showOverlay ? " grid-loading" : ""}`}>
                  {products.map((product, i) => (
                    <ProductCard
                      key={product.id ?? `${query}-${page}-${i}`}
                      product={product}
                      index={i}
                    />
                  ))}
                </div>

                <Pagination
                  current={page}
                  total={totalPages}
                  onChange={onPageChange}
                />
              </>
            )}
          </div>
        </main>
      </div>

      <footer className="footer">
        <span className="footer-logo">✦ ATLAS</span>
        <span>Powered by SearchSpring · © {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
