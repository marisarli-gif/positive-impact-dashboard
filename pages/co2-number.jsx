import { useState, useEffect, useRef } from "react";

const TARGET = 6678407;

function useCounter(target, duration, start) {
  const [count, setCount] = useState(0);
  useEffect(function() {
    if (!start) return;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    }
    requestAnimationFrame(step);
  }, [start]);
  return count;
}

export default function CO2Number() {
  const ref = useRef(null);
  const [start, setStart] = useState(false);
  const count = useCounter(TARGET, 2500, start);

  useEffect(function() {
    if (!ref.current) return;
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) setStart(true);
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return function() { obs.disconnect(); };
  }, []);

  return (
    <div ref={ref} style={{
      background: "#DFFF56",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 32px",
      boxSizing: "border-box",
    }}>
      <div style={{ width: "100%", maxWidth: 860, textAlign: "center" }}>

        <div style={{
          fontFamily: "monospace",
          fontSize: "clamp(56px, 10vw, 120px)",
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
          fontSize: "clamp(16px, 2.2vw, 26px)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#0B261E",
          fontWeight: 600,
          marginBottom: 10,
          opacity: 0.85,
        }}>
          Tons CO₂eq Impact
        </div>

        <div style={{ height: 1, background: "rgba(11,38,30,0.2)", margin: "24px auto", maxWidth: 480 }} />

        <p style={{
          fontFamily: "monospace",
          fontSize: "clamp(10px, 1.1vw, 13px)",
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "#0B261E",
          opacity: 0.45,
          margin: "0 auto",
          lineHeight: 1.8,
          maxWidth: 580,
        }}>
          *Historical aggregate. This number only includes carbon equivalent captured and avoided. A portion stems from ongoing reforestation projects, meaning much of this impact will unfold in the coming years.
        </p>

      </div>
    </div>
  );
}
