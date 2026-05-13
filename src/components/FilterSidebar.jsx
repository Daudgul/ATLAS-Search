import { useState } from "react";

export default function FilterSidebar({
  facets,
  filters,
  activeFilterCount,
  onToggle,
  onClear,
  loading,
}) {
  const [collapsed, setCollapsed] = useState({});

  const [expandedFacets, setExpandedFacets] = useState({});

  console.log("Rendering FilterSidebar", {
    facets,
    filters,
    activeFilterCount,
    loading,
  });

  console.log("Collapsed state", facets);

  const toggleCollapse = (field) => {
    setCollapsed((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const toggleShowAll = (field) => {
    setExpandedFacets((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (!facets || facets.length === 0) return null;

  return (
    <aside className="filter-sidebar">
      {/* Header */}
      <div className="filter-header">
        <span className="filter-title">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="11" y1="18" x2="13" y2="18" />
          </svg>
          Filters
        </span>

        {activeFilterCount > 0 && (
          <button className="filter-clear-btn" onClick={onClear}>
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Loading shimmer */}
      {loading && <div className="filter-loading-bar shimmer" />}

      {/* Facets */}
      <div className="filter-groups">
        {facets.map((facet) => {
          const isOpen = !collapsed[facet.field];

          const activeVals = filters?.[facet.field] ?? [];

          const hasActive = activeVals.length > 0;

          const showAll = expandedFacets[facet.field] || false;

          const MAX_VISIBLE = 7;

          const visible = showAll
            ? facet.values
            : facet.values.slice(0, MAX_VISIBLE);

          const hasMore = facet.values.length > MAX_VISIBLE;

          return (
            <div
              key={facet.field}
              className={`filter-group${hasActive ? " has-active" : ""}`}
            >
              {/* Group Header */}
              <button
                className="filter-group-header"
                onClick={() => toggleCollapse(facet.field)}
                aria-expanded={isOpen}
              >
                <span className="filter-group-label">
                  {facet.label}

                  {hasActive && (
                    <span className="filter-group-count">
                      {activeVals.length}
                    </span>
                  )}
                </span>

                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {isOpen && (
                <div className="filter-values">
                  {visible.map((val, index) => {
                    const filterValue =
                      val.type === "range"
                        ? {
                            low: val.low,
                            high: val.high,
                          }
                        : val.value;

                    const isActive =
                      val.type === "range"
                        ? activeVals.some(
                            (v) => v?.low === val.low && v?.high === val.high,
                          )
                        : activeVals.includes(val.value);

                    return (
                      <label
                        key={`${facet.field}-${index}`}
                        className={`filter-value${isActive ? " active" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={isActive}
                          // IMPORTANT
                          onChange={() => onToggle(facet.field, filterValue)}
                          className="filter-checkbox"
                        />

                        <span className="filter-check-box">
                          {isActive && (
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 12 12"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            >
                              <polyline points="2 6 5 9 10 3" />
                            </svg>
                          )}
                        </span>

                        <span className="filter-value-label">{val.label}</span>

                        <span className="filter-value-count">
                          {val.count.toLocaleString()}
                        </span>
                      </label>
                    );
                  })}

                  {/* Show More */}
                  {hasMore && (
                    <button
                      className="filter-show-more"
                      onClick={() => toggleShowAll(facet.field)}
                    >
                      {showAll
                        ? "Show less"
                        : `+ ${facet.values.length - MAX_VISIBLE} more`}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
