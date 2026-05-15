import "./SortBar.css";

export default function SortBar({
  totalResults,
  query,
  sortBy,
  sortOptions,
  setSortBy,
}) {
  const selectedValue = sortBy ? `${sortBy.field}:${sortBy.direction}` : "";

  return (
    <div className="sortBar">
      <div className="sortBar__results">
        <strong>{totalResults.toLocaleString()}</strong> results for "{query}"
      </div>

      <select
        value={selectedValue}
        onChange={(e) => {
          const [field, direction] = e.target.value.split(":");

          setSortBy({
            field,
            direction,
          });
        }}
      >
        {sortOptions.map((option) => (
          <option
            key={`${option.field}-${option.direction}`}
            value={`${option.field}:${option.direction}`}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
