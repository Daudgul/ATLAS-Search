import "./App.css";

import useProducts from "./hooks/useProducts";

import Header from "./components/Header/Header";

import ProductGrid from "./components/ProductGrid/ProductGrid";

import Pagination from "./components/Pagination/Pagination";

import SortBar from "./components/SortBar/SortBar";

import FilterPanel from "./components/FilterPanel/FilterPanel";

export default function App() {
  const {
    query,
    searchInput,
    setSearchInput,
    products,
    facets,
    page,
    totalPages,
    totalResults,
    loading,
    error,
    filters,
    activeFilterCount,
    sortBy,
    setSortBy,
    sortOptions,
    handleSearch,
    handlePageChange,
    updateFilter,
    resetFilters,
    retry,
  } = useProducts();

  return (
    <>
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        onSearch={handleSearch}
      />

      <main className="app">
        <div className="app__toolbar">
          <SortBar
            totalResults={totalResults}
            query={query}
            sortBy={sortBy}
            sortOptions={sortOptions}
            setSortBy={setSortBy}
          />

          <FilterPanel
            facets={facets}
            filters={filters}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {error ? (
          <div className="app__error">
            <p>{error}</p>
            <button onClick={retry}>Try Again</button>
          </div>
        ) : (
          <>
            <ProductGrid products={products} loading={loading} query={query} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </>
  );
}
