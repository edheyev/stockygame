import React from "react";
import "../app/globals.css";

const MarketEventButtons = ({ onEvent }) => {
  const events = [
    { name: "Market Boom", factor: 1.2 },
    { name: "Market Crash", factor: 0.8 },
    { name: "Random Event", factor: Math.random() * (1.5 - 0.5) + 0.5 },
  ];

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {events.map((event, index) => (
        <button
          key={index}
          onClick={() => onEvent(event.factor)}
          style={{
            padding: "10px",
            backgroundColor: "#374151",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {event.name}
        </button>
      ))}
    </div>
  );
};

export default MarketEventButtons;
