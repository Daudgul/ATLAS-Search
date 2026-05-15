import { useState } from "react";

import "./FilterPanel.css";

export default function FilterPanel({
  facets,
  filters,
  updateFilter,
  resetFilters,
  activeFilterCount,
}) {
  const [open, setOpen] = useState(false);

  const brands = facets.brand?.values || [];

  const colors = facets.color_family?.values || [];

  return (
    <>
      <button
        className={`filterButton ${
          activeFilterCount > 0 ? "filterButton--active" : ""
        }`}
        onClick={() => setOpen(true)}
      >
        Filters
        {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
      </button>

      {open && (
        <div className="filterOverlay" onClick={() => setOpen(false)}>
          <aside className="filterPanel" onClick={(e) => e.stopPropagation()}>
            <div className="filterPanel__header">
              <h2>Filters</h2>

              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="filterPanel__section">
              <h3>Brand</h3>

              <div className="filterOptions">
                {brands.map((brand) => (
                  <button
                    key={brand.value}
                    className={
                      filters.brands.includes(brand.value) ? "selected" : ""
                    }
                    onClick={() => {
                      const alreadySelected = filters.brands.includes(
                        brand.value,
                      );

                      const updatedBrands = alreadySelected
                        ? filters.brands.filter((item) => item !== brand.value)
                        : [...filters.brands, brand.value];

                      updateFilter("brands", updatedBrands);
                    }}
                  >
                    {brand.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filterPanel__section">
              <h3>Color</h3>

              <div className="filterOptions">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    className={
                      filters.colors.includes(color.value) ? "selected" : ""
                    }
                    onClick={() => {
                      const alreadySelected = filters.colors.includes(
                        color.value,
                      );

                      const updatedColors = alreadySelected
                        ? filters.colors.filter((item) => item !== color.value)
                        : [...filters.colors, color.value];

                      updateFilter("colors", updatedColors);
                    }}
                  >
                    {color.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filterPanel__footer">
              <button className="clearButton" onClick={resetFilters}>
                Clear
              </button>

              <button className="doneButton" onClick={() => setOpen(false)}>
                Done
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
