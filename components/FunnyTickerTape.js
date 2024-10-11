// components/FunnyTickerTape.js

import React, { useEffect, useState } from "react";
import "../app/vaporwave.css";

const FunnyTickerTape = () => {
  const [tickerItems, setTickerItems] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const items = generateFunnyTickerItems();
    setTickerItems([...items, ...items]); // Duplicate for seamless scrolling
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      className="teletext-ticker"
      style={{
        width: "100%",
        overflow: "hidden",
        // backgroundColor: "#4D4E47",
        color: "#fff",
        position: "relative",
        display: "flex",
        alignItems: "center",
        height: "100%",
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
              // marginRight: "30px",
              // marginTop: "30px",
              // fontSize: "0.8em",
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
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

const generateFunnyTickerItems = () => {
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

  return shuffleArray(funnyStocks);
};

// Shuffle function using Fisher-Yates algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default FunnyTickerTape;
