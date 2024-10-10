import React, { useEffect, useState } from "react";
import "../app/globals.css";

const FlashingStocksTable = () => {
  const [stocks, setStocks] = useState(generateFunnyStocks());

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) => {
        return prevStocks.map((stock) => {
          const change = (Math.random() * 20 - 10).toFixed(2); // Larger range for more dramatic changes
          return {
            ...stock,
            price: (parseFloat(stock.price) + parseFloat(change)).toFixed(2),
            change,
            isFlashing: Math.abs(change) > 5, // Flash if change is significant
          };
        });
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
      <table
        style={{
          width: "100%",
          textAlign: "center",
          color: "#fff",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#4b5563" }}>
            <th style={{ padding: "8px" }}>Stock</th>
            <th style={{ padding: "8px" }}>Price</th>
            <th style={{ padding: "8px" }}>Change</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr
              key={index}
              style={{
                backgroundColor:
                  parseFloat(stock.change) > 0 ? "#16a34a" : "#dc2626",
                animation: stock.isFlashing
                  ? "flash 1s infinite alternate"
                  : "none",
              }}
            >
              <td style={{ padding: "8px" }}>{stock.name}</td>
              <td style={{ padding: "8px" }}>{stock.price}</td>
              <td style={{ padding: "8px" }}>{stock.change}</td>
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
  return [
    { name: "FAT Corp", price: "100.00", change: "0.00" },
    { name: "Buy N Large", price: "150.00", change: "0.00" },
    { name: "Vinnie Jones", price: "200.00", change: "0.00" },
    { name: "Swiss Things", price: "250.00", change: "0.00" },
  ];
};

export default FlashingStocksTable;
