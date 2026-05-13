export default function SortBar({
  sortOptions,
  activeSort,
  onSortChange,
  filters,
  facets,
  onFilterToggle,
  totalResults,
  loading,
}) {
  const chips = [];
  Object.entries(filters).forEach(([field, values]) => {
    const facet = facets.find((f) => f.field === field);
    values.forEach((val) => {
      const valDef = facet?.values?.find((v) => {
        if (typeof val === "object") {
          return v.low === val.low && v.high === val.high;
        }

        return v.value === val;
      });
      chips.push({
        field,
        value: val,
        label: `${facet?.label ?? field}: ${
          valDef?.label ??
          (typeof val === "object" ? `${val.low} - ${val.high}` : val)
        }`,
      });
    });
  });

  const hasSortOptions = sortOptions && sortOptions.length > 1;
  console.log("Rendering SortBar", {
    sortOptions,
    activeSort,
    filters,
    facets,
    chips,
    totalResults,
    loading,
  });

  return (
    <div className="sort-bar">
      <div className="sort-bar-left">
        {chips.length > 0 ? (
          chips.map((chip) => (
            <button
              key={`${chip.field}-${chip.value}`}
              className="active-chip"
              onClick={() => onFilterToggle(chip.field, chip.value)}
              title={`Remove filter: ${chip.label}`}
            >
              {chip.label}
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ))
        ) : (
          <span className="sort-bar-count">
            {loading ? "Loading…" : `${totalResults.toLocaleString()} results`}
          </span>
        )}
      </div>

      {hasSortOptions && (
        <div className="sort-select-wrap">
          <label className="sort-label" htmlFor="sort-select">
            Sort:
          </label>
          <select
            id="sort-select"
            className="sort-select"
            value={
              activeSort ? `${activeSort.field}:${activeSort.direction}` : ""
            }
            onChange={(e) => {
              const val = e.target.value;
              if (!val) {
                onSortChange(null);
                return;
              }
              const opt = sortOptions.find(
                (o) => `${o.field}:${o.direction}` === val,
              );
              onSortChange(opt ?? null);
            }}
          >
            <option value="">Best Match</option>
            {sortOptions.map((opt) => (
              <option
                key={`${opt.field}:${opt.direction}`}
                value={`${opt.field}:${opt.direction}`}
              >
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            className="sort-select-arrow"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      )}
    </div>
  );
}
