// components/TopMovers.js

import React, { useEffect, useState } from "react";
import "../app/globals.css";

const TopMovers = ({ allStocks }) => {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    updateMovers();
    const interval = setInterval(updateMovers, 3000);
    return () => clearInterval(interval);
  }, [allStocks]);

  const updateMovers = () => {
    const sortedStocks = [...allStocks].sort(
      (a, b) => parseFloat(b.change) - parseFloat(a.change)
    );
    setTopGainers(sortedStocks.slice(0, 3));
    setTopLosers(sortedStocks.slice(-3).reverse());
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#1f2937",
        color: "#fff",
        borderRadius: "10px",
        padding: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Top Movers</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Top Gainers */}
        <div style={{ width: "48%" }}>
          <h3 style={{ textAlign: "center", color: "#16a34a" }}>Gainers</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {topGainers.map((stock, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                {stock.name}: +{stock.change}%
              </li>
            ))}
          </ul>
        </div>
        {/* Top Losers */}
        <div style={{ width: "48%" }}>
          <h3 style={{ textAlign: "center", color: "#dc2626" }}>Losers</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {topLosers.map((stock, index) => (
              <li key={index} style={{ marginBottom: "5px" }}>
                {stock.name}: {stock.change}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopMovers;
