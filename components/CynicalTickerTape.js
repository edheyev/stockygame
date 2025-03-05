import React, { useEffect, useRef, useState, useMemo } from "react";
import '../app/vaporwave.css';
import '../app/globals.css';
const CynicalTickerTape = ({ tips = [] }) => {
  // Filter out invalid tip objects (only recalc if tips change)
  const validTips = useMemo(
    () =>
      tips.filter(
        (tipObj) =>
          tipObj &&
          tipObj.name &&
          tipObj.tip &&
          tipObj.name.trim() !== "" &&
          tipObj.tip.trim() !== ""
      ),
    [tips]
  );

  // Shuffle only when validTips changes.
  const [shuffledTips, setShuffledTips] = useState([]);
  const [duration, setDuration] = useState(100); // seconds for one full cycle
  const [scrollDistance, setScrollDistance] = useState(0);
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    setShuffledTips(shuffleArray(validTips));
  }, [validTips]);

  // Duplicate the tips array for seamless scrolling. Use useMemo so the array reference is stable.
  const displayedTips = useMemo(() => [...shuffledTips, ...shuffledTips], [shuffledTips]);

  // Calculate the scroll distance and duration based on the rendered content width.
  useEffect(() => {
    if (containerRef.current && marqueeRef.current) {
      const contentWidth = marqueeRef.current.scrollWidth;
      if (contentWidth === 0) return;
      // Because the content is duplicated, one full cycle is half the total width.
      const distance = contentWidth / 2;
      setScrollDistance(distance);
      const fixedSpeed = 50; // pixels per second (adjust as needed)
      setDuration(distance / fixedSpeed);
    }
  }, [shuffledTips]); // recalc only when the shuffledTips changes

  if (!shuffledTips.length) return null;

  return (
    <div
      ref={containerRef}
      className="teletext-ticker"
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#222",
        color: "#fff",
        position: "relative",
        display: "flex",
        alignItems: "center",
        height: "40px",
      }}
    >
      <div
        ref={marqueeRef}
        className="marquee teletext-font"
        style={{
          display: "flex",
          animation: `ticker ${duration}s linear infinite`,
          whiteSpace: "nowrap",
        }}
      >
        {displayedTips.map((tipObj, index) => (
          <span key={index} style={{ padding: "0 50px" }}>
            {tipObj.name} - "{tipObj.tip}"
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${scrollDistance}px);
          }
        }
      `}</style>
    </div>
  );
};

export default CynicalTickerTape;
