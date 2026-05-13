export default function SkeletonGrid({ count = 8 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-img shimmer" />
          <div className="skeleton-body">
            <div className="skeleton-line shimmer" style={{ width: "88%" }} />
            <div
              className="skeleton-line shimmer"
              style={{ width: "55%", marginTop: 10 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
