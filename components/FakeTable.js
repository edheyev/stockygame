import React, { useEffect, useState } from "react";
import "../app/globals.css";

const FakeTable = () => {
  const [stocks, setStocks] = useState(generateFakeStocks());

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) => {
        return prevStocks.map((stock) => {
          const change = (Math.random() * 10 - 5).toFixed(2);
          return {
            ...stock,
            price: (parseFloat(stock.price) + parseFloat(change)).toFixed(2),
            change,
          };
        });
      });
    }, 1000);
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
                transition: "background-color 0.5s ease",
              }}
            >
              <td style={{ padding: "8px" }}>{stock.name}</td>
              <td style={{ padding: "8px" }}>{stock.price}</td>
              <td style={{ padding: "8px" }}>{stock.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const generateFakeStocks = () => {
  return [
    { name: "COMPANY A", price: "100.00", change: "0.00" },
    { name: "COMPANY B", price: "150.00", change: "0.00" },
    { name: "COMPANY C", price: "200.00", change: "0.00" },
    { name: "COMPANY D", price: "250.00", change: "0.00" },
    { name: "COMPANY E", price: "300.00", change: "0.00" },
  ];
};

export default FakeTable;
