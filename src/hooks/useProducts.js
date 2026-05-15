import { useCallback, useEffect, useState } from "react";

import { fetchProducts } from "../api/products";

import { extractFacets } from "../utils/helpers";

export const DEFAULT_FILTERS = {
  brands: [],
  colors: [],
  onSale: false,
};

export default function useProducts() {
  const [query, setQuery] = useState("dress");

  const [sortOptions, setSortOptions] = useState([]);

  const [searchInput, setSearchInput] = useState("dress");

  const [products, setProducts] = useState([]);

  const [facets, setFacets] = useState({});

  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const [sortBy, setSortBy] = useState(null);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [totalResults, setTotalResults] = useState(0);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const loadProducts = useCallback(
    async ({
      searchQuery = query,
      currentPage = page,
      currentFilters = filters,
      currentSort = sortBy,
    } = {}) => {
      try {
        setLoading(true);

        setError("");

        const data = await fetchProducts({
          query: searchQuery,
          page: currentPage,
          filters: currentFilters,
          sortBy: currentSort,
        });

        setProducts(data.results || []);

        setFacets(extractFacets(data.facets || []));

        setSortOptions(data.sorting?.options || []);

        setTotalPages(data.pagination?.totalPages || 1);

        setTotalResults(data.pagination?.totalResults || 0);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    },
    [query, page, filters, sortBy],
  );

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSearch = () => {
    const trimmed = searchInput.trim();

    if (!trimmed) return;

    setFilters(DEFAULT_FILTERS);

    setSortBy(null);

    setPage(1);

    setQuery(trimmed);

    loadProducts({
      searchQuery: trimmed,
      currentPage: 1,
      currentFilters: DEFAULT_FILTERS,
      currentSort: "default",
    });
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);

    loadProducts({
      currentPage: nextPage,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const updateFilter = (key, value) => {
    const updatedFilters = {
      ...filters,
      [key]: value,
    };

    setFilters(updatedFilters);

    setPage(1);

    loadProducts({
      currentPage: 1,
      currentFilters: updatedFilters,
    });
  };

  const changeSort = (value) => {
    setSortBy(value);

    setPage(1);

    loadProducts({
      currentPage: 1,
      currentSort: value,
    });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);

    setSortBy("default");

    setPage(1);

    loadProducts({
      currentFilters: DEFAULT_FILTERS,
      currentSort: "default",
      currentPage: 1,
    });
  };

  const activeFilterCount =
    filters.brands.length + filters.colors.length + (filters.onSale ? 1 : 0);

  return {
    query,
    searchInput,
    setSearchInput,

    products,
    facets,

    page,
    totalPages,
    totalResults,

    filters,
    activeFilterCount,

    sortBy,
    sortOptions,

    loading,
    error,

    handleSearch,
    handlePageChange,

    updateFilter,
    resetFilters,

    setSortBy: changeSort,

    retry: loadProducts,
  };
}
