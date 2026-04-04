import { useState, useEffect } from "react";

const metrics = [
  {
    value: 50,
    prefix: "$",
    suffix: "M",
    label: "Total Revenue",
    tag: "Aggregate portfolio revenue",
    color: "#0B261E",
  },
  {
    value: 1.2,
    prefix: "+$",
    suffix: "B",
    label: "Market Cap",
    tag: "Combined portfolio market capitalization",
    color: "#0B261E",
    big: true,
  },
  {
    value: 46,
    prefix: "$",
    suffix: "M",
    label: "Catalytic Capital",
    sublabel: "AUM",
    tag: "Assets under management deployed for impact",
    color: "#0B261E",
  },
  {
    value: 180,
    prefix: "$",
    suffix: "M",
    label: "Capital Raised",
    tag: "Raised by portfolio companies after Positive Ventures' investment",
    color: "#0B261E",
  },
];

function useCounter(target, duration, start) {
  const [count, setCount] = useState(0);
  useEffect(function() {
    if (!start) return;
    var startTime = null;
    var isDecimal = target % 1 !== 0;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = ease * target;
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    }
    requestAnimationFrame(step);
  }, [start]);
  return count;
}

function MetricCard({ metric, start }) {
  const [hovered, setHovered] = useState(false);
  const count = useCounter(metric.value, 1800, start);
  const baseSize = metric.big ? 80 : 60;
  const hovSize  = metric.big ? 92 : 70;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: metric.big ? 1.3 : 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0 32px",
        borderLeft: "1px solid rgba(11,38,30,0.2)",
        cursor: "default",
        minHeight: 200,
      }}
    >
      {/* Big number */}
      <div style={{
        fontFamily: "monospace",
        fontSize: hovered ? hovSize : baseSize,
        fontWeight: 700,
        color: hovered ? "#134234" : "#0B261E",
        lineHeight: 1,
        letterSpacing: "-0.03em",
        transition: "font-size 0.25s cubic-bezier(0.16,1,0.3,1), color 0.2s",
        marginBottom: 16,
      }}>
        <span style={{ fontSize: "0.5em", verticalAlign: "super", opacity: 0.65 }}>{metric.prefix}</span>
        {count}
        <span style={{ fontSize: "0.5em", opacity: 0.65 }}>{metric.suffix}</span>
      </div>

      {/* Label row with pill */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{
          display: "inline-block",
          width: hovered ? 28 : 8,
          height: 8,
          borderRadius: 20,
          background: "#0B261E",
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1)",
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: "monospace",
          fontSize: 13,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#0B261E",
          fontWeight: 600,
          opacity: hovered ? 1 : 0.7,
          transition: "opacity 0.2s",
        }}>
          {metric.label}
        </span>
        {metric.sublabel && (
          <span style={{
            fontFamily: "monospace",
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#0B261E",
            background: "rgba(11,38,30,0.15)",
            padding: "2px 7px",
            borderRadius: 20,
          }}>
            {metric.sublabel}
          </span>
        )}
      </div>

      {/* Dark green tag on hover */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        background: hovered ? "#0B261E" : "transparent",
        padding: hovered ? "6px 14px" : "0px 14px",
        borderRadius: 4,
        maxWidth: "100%",
        maxHeight: hovered ? 60 : 0,
        overflow: "hidden",
        transition: "background 0.2s, padding 0.25s, max-height 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <span style={{
          fontFamily: "monospace",
          fontSize: 10,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: "#DFFF56",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s",
          lineHeight: 1.5,
        }}>
          {metric.tag}
        </span>
      </div>
    </div>
  );
}

export default function PortfolioFinancials() {
  const [start, setStart] = useState(false);
  useEffect(function() {
    var t = setTimeout(function() { setStart(true); }, 300);
    return function() { clearTimeout(t); };
  }, []);

  return (
    <div style={{
      background: "#DFFF56",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 32px",
      boxSizing: "border-box",
    }}>
      <div style={{ width: "100%", maxWidth: 960 }}>

        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 48,
        }}>
          <span style={{
            fontFamily: "monospace",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#0B261E",
            opacity: 0.5,
            whiteSpace: "nowrap",
          }}>+ Portfolio Performance +</span>
          <div style={{ flex: 1, height: 1, background: "rgba(11,38,30,0.2)" }} />
        </div>

        {/* Metrics row */}
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {metrics.map(function(metric, i) {
            return <MetricCard key={i} metric={metric} start={start} />;
          })}
        </div>

      </div>
    </div>
  );
}
