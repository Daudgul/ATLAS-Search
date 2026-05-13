import { useState, useEffect, useRef } from "react";
import Spinner from "./Spinner";

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <div className="search-wrap">
      <div className="search-box">
        <span className="search-icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Search products — jeans, shoes, jackets…"
          className="search-input"
          autoComplete="off"
          spellCheck="false"
        />

        {value && (
          <button
            className="clear-btn"
            onClick={() => setValue("")}
            title="Clear"
            aria-label="Clear search"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        <button
          className="search-btn"
          onClick={handleSubmit}
          disabled={!value.trim() || loading}
          aria-label="Search"
        >
          {loading ? <Spinner size={16} /> : "Search"}
        </button>
      </div>
    </div>
  );
}
