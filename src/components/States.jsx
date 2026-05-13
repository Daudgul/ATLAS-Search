export function EmptyState({ query }) {
  return (
    <div className="state-center">
      <div className="state-icon">
        <svg
          width="52"
          height="52"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#444"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" stroke="#555" />
        </svg>
      </div>
      <p className="state-title">No results for "{query}"</p>
      <p className="state-text">
        Try a different keyword, check your spelling, or browse our popular
        categories below.
      </p>
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="state-center">
      <div className="state-icon">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#b04"
          strokeWidth="1.4"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="state-title">Something went wrong</p>
      <p className="state-text">{message}</p>
      <button className="retry-btn" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}
