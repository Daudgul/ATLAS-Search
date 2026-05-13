import { useState, useEffect, useRef } from "react";

const SAMPLE_PRODUCTS = [
  {
    name: "Premium Slim-Cut Denim",
    price: "$89",
    tag: "BESTSELLER",
    color: "#c9a84c",
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80",
  },
  {
    name: "Leather Oxford Brogue",
    price: "$214",
    tag: "NEW IN",
    color: "#8b9e6e",
    img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=300&q=80",
  },
  {
    name: "Merino Wool Coat",
    price: "$340",
    tag: "LIMITED",
    color: "#8e6b9e",
    img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&q=80",
  },
];

const MARQUEE_ITEMS = [
  "NEW ARRIVALS",
  "✦",
  "FREE SHIPPING OVER $150",
  "✦",
  "PREMIUM QUALITY",
  "✦",
  "CURATED COLLECTIONS",
  "✦",
  "NEW ARRIVALS",
  "✦",
  "FREE SHIPPING OVER $150",
  "✦",
  "PREMIUM QUALITY",
  "✦",
  "CURATED COLLECTIONS",
  "✦",
];

export default function LandingPage({ onEnterSearch }) {
  const [query, setQuery] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState(false);
  const heroRef = useRef(null);
  const inputRef = useRef(null);

  // Staggered reveal on mount
  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Spotlight cursor tracking
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handler = (e) => {
      const rect = el.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  const handleSubmit = () => {
    const q = query.trim();
    if (q) onEnterSearch(q);
  };

  const handleChipClick = (term) => {
    setQuery(term);
    onEnterSearch(term);
  };

  return (
    <div className={`landing ${revealed ? "revealed" : ""}`}>
      {/* ── Marquee ticker ─────────────────────────────── */}
      <div className="ticker">
        <div className="ticker-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="hero" ref={heroRef}>
        {/* Animated mesh background */}
        <div className="mesh-bg">
          <div className="mesh-orb orb-1" />
          <div className="mesh-orb orb-2" />
          <div className="mesh-orb orb-3" />
          <div className="mesh-grid" />
        </div>

        {/* Spotlight */}
        <div
          className="spotlight"
          style={{ left: mousePos.x, top: mousePos.y }}
        />

        {/* Left — Copy */}
        <div className="hero-copy">
          <div className="hero-eyebrow reveal-item delay-0">
            <span className="eyebrow-dot" />
            The Future of Discovery
          </div>

          <h1 className="hero-headline reveal-item delay-1">
            <span className="line line-1">Search</span>
            <span className="line line-2">
              <em>anything.</em>
            </span>
            <span className="line line-3">Find everything.</span>
          </h1>

          <p className="hero-sub reveal-item delay-2">
            Thousands of premium products, one intelligent search. Type a word —
            we'll surface exactly what you're after.
          </p>

          {/* Search bar */}
          <div className="landing-search reveal-item delay-3">
            <div className="landing-search-box">
              <svg
                className="landing-search-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                className="landing-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder='Try "jeans", "leather jacket", "sneakers"…'
                autoComplete="off"
                spellCheck="false"
              />
              <button
                className="landing-btn"
                onClick={handleSubmit}
                disabled={!query.trim()}
              >
                <span>Search</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {/* Quick chips */}
            <div className="chips reveal-item delay-4">
              <span className="chips-label">Popular:</span>
              {["Jeans", "Sneakers", "Jacket", "Dress", "Boots"].map((t) => (
                <button
                  key={t}
                  className="chip"
                  onClick={() => handleChipClick(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="stats reveal-item delay-5">
            {[
              { num: "50K+", label: "Products" },
              { num: "200+", label: "Brands" },
              { num: "4.9★", label: "Rating" },
            ].map(({ num, label }) => (
              <div key={label} className="stat">
                <span className="stat-num">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — floating product cards */}
        <div className="hero-cards reveal-item delay-2">
          <div className="cards-stack">
            {SAMPLE_PRODUCTS.map((p, i) => (
              <div
                key={i}
                className={`float-card float-card-${i}`}
                onClick={() => handleChipClick(p.name.split(" ").slice(-1)[0])}
              >
                <div className="float-card-img-wrap">
                  <img src={p.img} alt={p.name} className="float-card-img" />
                </div>
                <div className="float-card-body">
                  <span
                    className="float-card-tag"
                    style={{
                      color: p.color,
                      borderColor: p.color + "44",
                      background: p.color + "11",
                    }}
                  >
                    {p.tag}
                  </span>
                  <p className="float-card-name">{p.name}</p>
                  <p className="float-card-price">{p.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative label */}
          <div className="cards-label">
            <span className="cards-label-line" />
            <span>Curated for you</span>
            <span className="cards-label-line" />
          </div>
        </div>
      </section>

      {/* ── Feature strip ──────────────────────────────── */}
      <section className="features reveal-item delay-5">
        {[
          {
            icon: (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            ),
            title: "Instant Results",
            desc: "Real-time search across thousands of SKUs",
          },
          {
            icon: (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ),
            title: "Smart Ranking",
            desc: "AI-powered relevance for every query",
          },
          {
            icon: (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            ),
            title: "Curated Quality",
            desc: "Only the best brands and premium pieces",
          },
          {
            icon: (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            ),
            title: "Fast Delivery",
            desc: "Free shipping on orders over $150",
          },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="feature">
            <div className="feature-icon">{icon}</div>
            <div>
              <p className="feature-title">{title}</p>
              <p className="feature-desc">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Bottom CTA ─────────────────────────────────── */}

      <div className="bottom-cta reveal-item delay-5">
        <span className="cta-glyph">✦</span>
        <a
          href="https://github.com/Daudgul/ATLAS-Search"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#c9a84c",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          GitHub Profile
        </a>
        <a
          href="https://www.linkedin.com/in/daudgul/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#c9a84c",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          LinkedIn Profile
        </a>
        <button className="cta-link" onClick={() => inputRef.current?.focus()}>
          Start searching now →
        </button>
      </div>
    </div>
  );
}
