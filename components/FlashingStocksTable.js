import React, { useEffect, useState, useRef } from "react";
import "../app/vaporwave.css";

const FlashingStocksTable = ({ crashProgress = 0 }) => {
  const [allStocks, setAllStocks] = useState(generateFunnyStocks());
  const [displayedStocks, setDisplayedStocks] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  // 1) meltdownRef holds the latest crashProgress
  const meltdownRef = useRef(crashProgress);

  // Whenever crashProgress changes, update meltdownRef
  useEffect(() => {
    meltdownRef.current = crashProgress;

  }, [crashProgress]);


  useEffect(() => {
    setHasMounted(true);
    // Initially pick 11
    setDisplayedStocks(selectRandomStocks(allStocks, 11));

    // 2) Setup one interval that fires every 5 seconds
    const interval = setInterval(() => {
      setAllStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const cp = meltdownRef.current; // read current meltdown from ref

          if (cp >= 1) {
            // Full meltdown
            return {
              ...stock,
              price: "0.00",
              change: "-9999",
              recommendation: "OH NO",
              isFlashing: true,
            };
          } else {
            // Normal update
            let baseChange = (Math.random() * 20 - 10).toFixed(2);
            // meltdown factor up to e.g. 20 for more negativity
            const meltdownFactor = cp * 20;

            let finalChange = parseFloat(baseChange) - meltdownFactor;
            finalChange = parseFloat(finalChange.toFixed(2));

            const newPrice = parseFloat(stock.price) + finalChange;
            const clamped = Math.max(newPrice, 0);

            return {
              ...stock,
              price: clamped.toFixed(2),
              change: finalChange.toFixed(2),
              recommendation: cp > 0.5 ? "SELL EVERYTHING!" : stock.recommendation,
              isFlashing: Math.abs(finalChange) > 5 || cp > 0.7,
            };
          }
        })
      );

      // Re-randomize displayed subset if meltdown not done
      if (meltdownRef.current < 1) {
        setDisplayedStocks(selectRandomStocks(allStocks, 11));
      }
    }, 6000 + (100 - 6000) * crashProgress);


    return () => clearInterval(interval);
  }, [allStocks]); // never re-run after mount or meltdown changes

  if (!hasMounted) return null;

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }} className="pixel-font">
      <table
        className="teletext-table"
        style={{
          width: "100%",
          textAlign: "center",
          borderCollapse: "collapse",
          tableLayout: "fixed", // Ensures fixed widths are respected
        }}
      >
        <colgroup>
          <col style={{ width: "30%" }} /> {/* Stock Name */}
          <col style={{ width: "20%" }} /> {/* Price */}
          <col style={{ width: "20%" }} /> {/* Change */}
          <col style={{ width: "30%" }} /> {/* Recommendation */}
        </colgroup>
        <tbody>
          {displayedStocks.map((stock, index) => {
            const priceNum = parseFloat(stock.price) || 0;
            const chgNum = parseFloat(stock.change) || 0;

            // Full meltdown => all red & blinking
            if (meltdownRef.current >= 1) {
              return (
                <tr key={index} style={{ backgroundColor: "black", color: "red", animation: "flash 1s infinite alternate" }}>
                  <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{stock.name}</td>
                  <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{stock.price}</td>
                  <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{stock.change}</td>
                  <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{stock.recommendation}</td>
                </tr>
              );
            }

            // Color logic
            let textColor = chgNum >= 0 ? "#00ff00" : "#ffa500"; // green vs orange
            if (Math.abs(chgNum) > 9) textColor = "#ff0000"; // big drop => red

            return (
              <tr
                key={index}
                style={{
                  backgroundColor: "black",
                  color: textColor,
                  animation: stock.isFlashing ? "flash 1s infinite alternate" : "none",
                }}
              >
                <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{stock.name}</td>
                <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{stock.price}</td>
                <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{stock.change}</td>
                <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{stock.recommendation}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <style jsx>{`
        @keyframes flash {
          from { opacity: 1; }
          to { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

/** Utility code for stocks */
function generateFunnyStocks() {
  const stockNames = [
    "FAT Corp", "Buy N Large", "Vinnie Jones Ltd", "Swiss Things", "ANU5", "BLOW",
    "BLUNTZ", "Bigfoot Believers Co", "Wayne Enterprises", "Muffins", "FAFF", "BADGR",
    "BRN", "P3NI5", "FART", "BEANS", "WHIFF", "GOLDS", "GOLDBLUM", "TREES",
    "Prestige Worldwide", "Very Big Corp", "Good Company", "WTF", "HIGH 5s",
  ];
  return stockNames.map((name) => ({
    name,
    price: (Math.random() * 500 + 50).toFixed(2),
    change: "0.00",
    recommendation: generateRecommendation(),
  }));
}

function selectRandomStocks(stocks, count) {
  const shuffled = [...stocks].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateRecommendation() {
  const recommendations = ["BUY!!!", "SELL!!", "HOLD", "MEGABUY", "MEGASELL"];
  const weights = [0.4, 0.4, 0.15, 0.025, 0.025];
  const cw = weights.map(((sum) => (v) => (sum += v))(0));
  const rnd = Math.random();
  for (let i = 0; i < cw.length; i++) {
    if (rnd < cw[i]) {
      return recommendations[i];
    }
  }
  return recommendations[recommendations.length - 1];
}

export default FlashingStocksTable;
