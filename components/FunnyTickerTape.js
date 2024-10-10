// components/FunnyTickerTape.js

import React, { useEffect, useState } from "react";
import "../app/globals.css";

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
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#1f2937",
        color: "#fff",
        position: "relative",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          animation: "ticker 20s linear infinite",
        }}
      >
        {tickerItems.map((item, index) => (
          <span
            key={index}
            style={{
              marginRight: "50px",
              fontSize: "0.8em",
              display: "inline-block",
            }}
          >
            {item}
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
    "ACME Corp: +42%",
    "Initech: -13%",
    "Vandelay Ind.: +7%",
    "Globex Corp: +100%",
    "Soylent Corp: -50%",
    "Umbrella Corp: +666%",
    "Wayne Enterprises: +25%",
    "Stark Industries: +88%",
    "Gringotts Bank: -3%",
    "Wonka Industries: +99%",
  ];
  return funnyStocks;
};

export default FunnyTickerTape;
