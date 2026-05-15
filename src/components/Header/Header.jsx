import "./Header.css";

export default function Header({ searchInput, setSearchInput, onSearch }) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <div className="header__logoMark" />
          <h1>Shopflow</h1>
        </div>

        <div className="header__search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
          />

          <button onClick={onSearch}>Search</button>
        </div>
      </div>
    </header>
  );
}
