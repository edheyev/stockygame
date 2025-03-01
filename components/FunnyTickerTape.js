import React, { useEffect, useRef, useState } from "react";
import "../app/vaporwave.css";

// Ticker message arrays
const funnyStocks = [
  "FAT Corp: +42%",
  "Buy N Large: -13%",
  "Vinnie Jones Ltd: +7%",
  "Swiss Things: +100%",
  "ANU5: -50%",
  "BLOW: +666%",
  "BLUNTZ: +25%",
  "Bigfoot Believers Co: +88%",
  "Wayne Enterprises: -3%",
  "Muffins: +99%",
  "FAFF: +12%",
  "BADGR: -7%",
  "BRN: +30%",
  "P3NI5: -22%",
  "FART: +45%",
  "BEANS: -10%",
  "WHIFF: +5%",
  "GOLDS: +58%",
  "GOLDBLUM: -11%",
  "TREES: +33%",
  "Prestige Worldwide: -15%",
  "Very Big Corp: +14%",
  "Good Company: -8%",
  "WTF: +75%",
  "HIGH 5s: -6%",
];

const crashing1 = [
  "Ooooh something is happening...",
  "Buy N Large: -13%",
  "Vinnie Jones Ltd: -7%",
  "Swiss Things: -1%",
  "FART: -45%",
  "BEANS: -10%",
  "Crashing???",
];

const crashing2 = [
  "Oh dear...",
  "CRASH IMMINENT!",
  "Crashing???",
];

const crashing3 = [
  "fffffffff",
  "CRASH",
  "CRASH",
  "CRASH",
  "CRASH",
  "CRASH",
  "CRASH",
  "Stay away from windows",
  "Sell your kids",
  "Pawn the Porn",
  "No more food",
  "For sale: Hot-tub 'like-new' contact Clive @ bigclive@yahoomail.co.ck - will accept bread"
];

// Determine ticker category based on crashProgress thresholds
const getTickerCategory = (crashProgress) => {
  if (crashProgress > 0.8) {
    return "crashing3";
  } else if (crashProgress > 0.4) {
    return "crashing2";
  } else if (crashProgress > 0.1) {
    return "crashing1";
  } else {
    return "funny";
  }
};

// Generate ticker items based on category
const generateTickerItems = (category) => {
  switch (category) {
    case "crashing3":
      return shuffleArray(crashing3);
    case "crashing2":
      return shuffleArray(crashing2);
    case "crashing1":
      return shuffleArray(crashing1);
    default:
      return shuffleArray(funnyStocks);
  }
};

// Shuffle function (Fisher-Yates)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const FunnyTickerTape = ({ crashProgress = 0 }) => {
  const [tickerItems, setTickerItems] = useState([]);
  const hasMountedRef = useRef(false);
  // Store the current category to update only on change
  const currentCategoryRef = useRef(getTickerCategory(crashProgress));

  useEffect(() => {
    const newCategory = getTickerCategory(crashProgress);
    // Only update if category has changed
    if (newCategory !== currentCategoryRef.current || !hasMountedRef.current) {
      currentCategoryRef.current = newCategory;
      const items = generateTickerItems(newCategory);
      setTickerItems([...items, ...items]); // Duplicate for seamless scrolling
      hasMountedRef.current = true;
    }
  }, [crashProgress]);

  // Only render after initial mount
  if (!hasMountedRef.current) return null;

  return (
    <div
      className="teletext-ticker"
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: crashProgress > 0.5 ? "red" : "#4D4E47",
        color: "#fff",
        position: "relative",
        display: "flex",
        alignItems: "center",
        height: "100%",
        transition: "background-color 0.5s ease",
      }}
    >
      <div
        className="marquee teletext-font"
        style={{
          display: "flex",
          animation: "ticker 100s linear infinite",
        }}
      >
        {tickerItems.map((item, index) => (
          <span
            key={index}
            className="ticker-item"
            style={{
              paddingTop: "10px",
              display: "inline-block",
            }}
          >
            <span className="pixel-font">{item}</span>
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-60%);
          }
        }
      `}</style>
    </div>
  );
};

export default FunnyTickerTape;
