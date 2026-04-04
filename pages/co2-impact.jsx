import { useState, useEffect } from "react";

const TARGET = 6678407;

const categories = [
  {
    key: "avoided",
    label: "Avoided",
    value: "5,682,675",
    description: "Emissions prevented from being released into the atmosphere",
    companies: ["Pachama/Carbon Direct", "Eureciclo", "Ruuf", "Fram", "Backchannel", "Doji", "Spott"],
  },
  {
    key: "captured",
    label: "Captured",
    value: "995,732",
    description: "Carbon removed from the atmosphere",
    companies: ["Pachama/Carbon Direct", "Funga"],
  },
  {
    key: "tracked",
    label: "Tracked",
    value: "565,912,982",
    description: "Emissions accurately tracked and monitored",
    companies: ["Eureciclo", "SINAI Technologies"],
  },
];

const corners = [
  { top: 8, left: 10 }, { top: 8, right: 10 },
  { bottom: 8, left: 10 }, { bottom: 8, right: 10 },
];

function useCounter(target, duration, start) {
  const [count, setCount] = useState(0);
  useEffect(function() {
    if (!start) return;
    var startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    }
    requestAnimationFrame(step);
  }, [start]);
  return count;
}

function CategoryCard({ cat, onClick, isActive }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={function(e) { e.stopPropagation(); onClick(cat.key); }}
      onMouseEnter={function() { setHovered(true); }}
      onMouseLeave={function() { setHovered(false); }}
      style={{
        flex: 1,
        padding: "24px 28px",
        borderLeft: "1px solid rgba(11,38,30,0.2)",
        cursor: "pointer",
        background: isActive ? "#0B261E" : hovered ? "rgba(11,38,30,0.06)" : "transparent",
        borderRadius: 4,
        transition: "background 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{
          display: "inline-block",
          width: hovered || isActive ? 24 : 7,
          height: 7,
          borderRadius: 20,
          background: isActive ? "#DFFF56" : "#0B261E",
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1)",
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: "monospace",
          fontSize: 14,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: isActive ? "#DFFF56" : "#0B261E",
          fontWeight: 600,
        }}>
          {cat.label}
        </span>
      </div>

      <div style={{
        fontFamily: "monospace",
        fontSize: 32,
        fontWeight: 700,
        color: isActive ? "#DFFF56" : "#0B261E",
        letterSpacing: "-0.02em",
        lineHeight: 1,
        marginBottom: 6,
      }}>
        {cat.value}
      </div>

      <div style={{
        fontFamily: "monospace",
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: isActive ? "rgba(223,255,86,0.6)" : "rgba(11,38,30,0.4)",
      }}>
        tons CO₂eq
      </div>
    </div>
  );
}

export default function CO2Impact() {
  const [start, setStart] = useState(false);
  const [active, setActive] = useState(null);
  const count = useCounter(TARGET, 2500, start);

  useEffect(function() {
    var t = setTimeout(function() { setStart(true); }, 400);
    return function() { clearTimeout(t); };
  }, []);

  var activeCat = categories.find(function(c) { return c.key === active; });

  return (
    <div
      onClick={function() { setActive(null); }}
      style={{
        background: "#DFFF56",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 32px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", maxWidth: 860, textAlign: "center" }}>

        <div style={{
          fontFamily: "monospace",
          fontSize: "clamp(56px, 9vw, 110px)",
          fontWeight: 700,
          color: "#0B261E",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          marginBottom: 16,
        }}>
          {count.toLocaleString("en-US")}
        </div>

        <div style={{
          fontFamily: "monospace",
          fontSize: 20,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#0B261E",
          fontWeight: 600,
          marginBottom: 10,
          opacity: 0.85,
        }}>
          Tons CO₂eq Impact
        </div>

        <p style={{
          fontFamily: "monospace",
          fontSize: 9,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "#0B261E",
          opacity: 0.45,
          lineHeight: 1.8,
          maxWidth: 580,
          margin: "0 auto 36px",
        }}>
          *Historical aggregate. This number only includes carbon equivalent captured and avoided. A portion stems from ongoing reforestation projects, meaning much of this impact will unfold in the coming years.
        </p>

        <div style={{ width: "100%", height: 1, background: "rgba(11,38,30,0.2)", marginBottom: 32 }} />

        <div style={{ display: "flex", gap: 0, marginBottom: 24 }}>
          {categories.map(function(cat) {
            return (
              <CategoryCard
                key={cat.key}
                cat={cat}
                onClick={function(key) { setActive(active === key ? null : key); }}
                isActive={active === cat.key}
              />
            );
          })}
        </div>

        {activeCat && (
          <div
            onClick={function(e) { e.stopPropagation(); }}
            style={{
              background: "#0B261E",
              borderRadius: 4,
              padding: "20px 24px",
              position: "relative",
              textAlign: "left",
            }}
          >
            {corners.map(function(pos, pi) {
              return (
                <span key={pi} style={{
                  position: "absolute",
                  top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom,
                  color: "#DFFF56", fontSize: 12, opacity: 0.5,
                  fontFamily: "monospace", lineHeight: 1,
                }}>+</span>
              );
            })}
            <div style={{
              fontFamily: "monospace", fontSize: 9, letterSpacing: "0.16em",
              color: "#DFFF56", textTransform: "uppercase", marginBottom: 6, opacity: 0.7,
            }}>
              {activeCat.label} — {activeCat.value} tons
            </div>
            <div style={{
              fontFamily: "monospace", fontSize: 10, letterSpacing: "0.07em",
              color: "rgba(223,255,86,0.5)", textTransform: "uppercase", marginBottom: 14,
            }}>
              {activeCat.description}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {activeCat.companies.map(function(co, ci) {
                return (
                  <span key={ci} style={{
                    background: "rgba(223,255,86,0.1)",
                    border: "1px solid rgba(223,255,86,0.25)",
                    color: "#fff", fontFamily: "monospace",
                    fontSize: 10, letterSpacing: "0.08em",
                    textTransform: "uppercase", padding: "4px 10px", borderRadius: 20,
                  }}>{co}</span>
                );
              })}
            </div>
            <div style={{
              marginTop: 12, fontFamily: "monospace",
              fontSize: 8, color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em", textAlign: "right",
            }}>CLICK ANYWHERE TO CLOSE</div>
          </div>
        )}

      </div>
    </div>
  );
}
