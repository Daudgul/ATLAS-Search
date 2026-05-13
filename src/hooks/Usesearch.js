import { useState, useCallback, useRef, useEffect } from "react";
import { fetchProducts } from "../services/api";
import { RESULTS_PER_PAGE } from "../utils/helpers";



export function useSearch() {
  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [facets, setFacets] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const requestIdRef = useRef(0);

  const performSearch = useCallback(async (currentQuery, currentPage, currentFilters, currentSort) => {
    const thisRequest = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchProducts({
        query: currentQuery,
        page: currentPage,
        filters: currentFilters,
        sort: currentSort,
      });

      if (thisRequest !== requestIdRef.current) return;

      setProducts(data?.results ?? []);
      setFacets(
        Array.isArray(data?.facets)
          ? data.facets.filter((f) => f?.values?.length > 0)
          : []
      );

      setSortOptions(
        Array.isArray(data?.sorting?.options)
          ? data.sorting.options
          : []
      );

      setPagination(data?.pagination ?? null);
      setHasSearched(true);

    } catch (err) {
      if (thisRequest !== requestIdRef.current) return;

      setError(err?.message || "Something went wrong");
      setProducts([]);

    } finally {
      if (thisRequest === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!query.trim()) return;

    performSearch(query, page, filters, sort);

  }, [query, page, filters, sort, performSearch]);

  const handleSearch = useCallback((q) => {
    setQuery(q);
    setPage(1);
    setFilters({});
    setSort(null);
  }, []);

  const handlePageChange = useCallback((p) => {
    setPage(p);
  }, []);
const handleFilterToggle = useCallback((field, value) => {

  if (!value) return;

  setFilters((prev) => {

    const currentValues = Array.isArray(prev[field])
      ? prev[field]
      : [];

    let updatedValues = [];

    if (
      field === "price" &&
      typeof value === "object"
    ) {

      const alreadyExists = currentValues.some(
        (v) =>
          v?.low === value.low &&
          v?.high === value.high
      );

      updatedValues = alreadyExists
        ? currentValues.filter(
            (v) =>
              !(
                v?.low === value.low &&
                v?.high === value.high
              )
          )
        : [...currentValues, value];
    }

    else {

      updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
    }

    const nextFilters = { ...prev };

    if (updatedValues.length > 0) {
      nextFilters[field] = updatedValues;
    } else {
      delete nextFilters[field];
    }

    return nextFilters;
  });

  setPage(1);

}, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setPage(1);
  }, []);

  const handleSortChange = useCallback((option) => {
    setSort(option);
    setPage(1);
  }, []);

  const totalResults = Number(pagination?.totalResults ?? 0);

  const totalPages =
    pagination?.totalPages ??
    Math.ceil(totalResults / RESULTS_PER_PAGE);

  const activeFilterCount = Object.values(filters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return {
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

    retry: () => performSearch(query, page, filters, sort),
  };
}