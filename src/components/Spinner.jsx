export default function Spinner({ size = 20 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{ animation: "spin 0.8s linear infinite" }}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeDasharray="48"
          strokeDashoffset="16"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
