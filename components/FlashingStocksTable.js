import React, { useEffect, useState } from "react";
import "../app/vaporwave.css";

const FlashingStocksTable = () => {
  const [allStocks, setAllStocks] = useState(generateFunnyStocks());
  const [displayedStocks, setDisplayedStocks] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Initially select 10 stocks to display
    setDisplayedStocks(selectRandomStocks(allStocks, 4));

    const interval = setInterval(() => {
      // Update prices and recommendations for all stocks
      setAllStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const change = (Math.random() * 20 - 10).toFixed(2); // Random change between -10 and +10
          const price = (parseFloat(stock.price) + parseFloat(change)).toFixed(
            2
          );
          const recommendation = generateRecommendation();
          return {
            ...stock,
            price,
            change,
            isFlashing: Math.abs(change) > 5, // Flash if change is significant
            recommendation,
          };
        })
      );

      // Randomly select stocks to display
      setDisplayedStocks(selectRandomStocks(allStocks, 4));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [allStocks]);

  if (!hasMounted) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }} className="pixel-font">
      <table className="teletext-table"
        style={{
          width: "100%",
          textAlign: "center",
          borderCollapse: "collapse",
        }}
      >
        {/* <thead>
          <tr >
            <th style={{ padding: "8px" }}>Stock</th>
            <th style={{ padding: "8px" }}>Price</th>
            <th style={{ padding: "8px" }}>Change</th>
            <th style={{ padding: "8px" }}>DO</th>
          </tr>
        </thead> */}
        <tbody>
          {displayedStocks.map((stock, index) => (
            <tr
              key={index}
              style={{
                backgroundColor:
                  parseFloat(stock.change) > 0 ? 'rgba(255, 119, 233, 0.8)' : 'rgba(0, 255, 255, 0.8)',
                animation: stock.isFlashing
                  ? "flash 1s infinite alternate"
                  : "none",
              }}
            >
              <td style={{ padding: "8px" }}>{stock.name}</td>
              <td style={{ padding: "8px" }}>{stock.price}</td>
              <td style={{ padding: "8px" }}>{stock.change}</td>
              <td style={{ padding: "8px" }}>{stock.recommendation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        @keyframes flash {
          from {
            opacity: 1;
          }
          to {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

const generateFunnyStocks = () => {
  const stockNames = [
    "FAT Corp",
    "Buy N Large",
    "Vinnie Jones Ltd",
    "Swiss Things",
    "ANU5",
    "BLOW",
    "BLUNTZ",
    "Bigfoot Believers Co",
    "Wayne Enterprises",
    "Muffins",
    "FAFF",
    "BADGR",
    "BRN",
    "P3NI5",
    "FART",
    "BEANS",
    "WHIFF",
    "GOLDS",
    "GOLDBLUM",
    "TREES",
    "Prestige Worldwide",
    "Very Big Corp",
    "Good Company",
    "WTF",
    "HIGH 5s",
  ];

  return stockNames.map((name) => ({
    name,
    price: (Math.random() * 500 + 50).toFixed(2), // Random starting price between 50 and 550
    change: "0.00",
    recommendation: generateRecommendation(),
  }));
};

const selectRandomStocks = (stocks, count) => {
  // Shuffle the array and select the first 'count' stocks
  const shuffled = [...stocks].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateRecommendation = () => {
  const recommendations = ["BUY!!!", "SELL!!", "HOLD", "MEGABUY", "MEGASELL"];
  // Weighted random selection to make "MEGABUY" and "MEGASELL" less frequent
  const weights = [0.4, 0.4, 0.15, 0.025, 0.025];
  const cumulativeWeights = weights.map(
    ((sum) => (value) => (sum += value))(0)
  );
  const random = Math.random();
  for (let i = 0; i < cumulativeWeights.length; i++) {
    if (random < cumulativeWeights[i]) {
      return recommendations[i];
    }
  }
  return recommendations[recommendations.length - 1];
};

export default FlashingStocksTable;