// Dashboard.js

import "../app/globals.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import components
const AnimatedLineChart = dynamic(
  () => import("../components/AnimatedLineChart"),
  { ssr: false }
);
const FlashingStocksTable = dynamic(
  () => import("../components/FlashingStocksTable"),
  { ssr: false }
);
const FunnyTickerTape = dynamic(() => import("../components/FunnyTickerTape"), {
  ssr: false,
});
const FakePieChart = dynamic(() => import("../components/FakePieChart"), {
  ssr: false,
});
const NewsAndSentiment = dynamic(
  () => import("../components/NewsAndSentiment"),
  { ssr: false }
);

const Dashboard = () => {
  const [cryptoData, setCryptoData] = useState(generateInitialCryptoData());
  const [allStocks, setAllStocks] = useState(generateFunnyStocks());

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData((prevData) => {
        // Update cryptoData
        const newData = prevData.map((crypto) => {
          const change = (Math.random() * 10 - 5).toFixed(2);
          const newValue = Math.max(
            0,
            parseFloat(crypto.value) + parseFloat(change)
          );
          return { ...crypto, value: newValue.toFixed(2), change };
        });
        return newData;
      });

      // Update allStocks (if needed)
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#111827",
        color: "#FFFFFF",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
        margin: 0,
      }}
    >
      <h1
        style={{ textAlign: "center", margin: "0 0 10px 0", fontSize: "2vw" }}
      >
        The Stock Market{" "}
      </h1>

      {/* Top Row: Animated Line Chart */}
      <div
        style={{
          flex: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
          boxSizing: "border-box",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <AnimatedLineChart cryptoData={cryptoData} />
      </div>

      {/* Second Row: Rolling Ticker Tape */}
      <div
        style={{
          flex: 0.5, // Reduce the flex to allocate more space to other components
          marginBottom: "10px",
          boxSizing: "border-box",
          overflow: "hidden",
          minHeight: 0,
          height: "50px", // Adjust height as needed
        }}
      >
        <FunnyTickerTape />
      </div>

      {/* Third Row: Table, Pie Chart, and News & Sentiment Side by Side */}
      <div
        style={{
          flex: 2,
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "stretch",
          boxSizing: "border-box",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Table */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#1f2937",
            padding: "10px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <FlashingStocksTable allStocks={allStocks} />
        </div>

        {/* Pie Chart */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#1f2937",
            padding: "10px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <FakePieChart cryptoData={cryptoData} />
        </div>

        {/* News and Market Sentiment */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#1f2937",
            padding: "0", // Remove padding to maximize space
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <NewsAndSentiment cryptoData={cryptoData} />
        </div>
      </div>
    </div>
  );
};

const generateInitialCryptoData = () => {
  return [
    { name: "BitDogecoin", value: "100.00", change: "0.00" },
    { name: "LiteCat", value: "150.00", change: "0.00" },
    { name: "EtherHamster", value: "200.00", change: "0.00" },
    { name: "RippleRabbit", value: "250.00", change: "0.00" },
  ];
};

const generateFunnyStocks = () => {
  // ... (same as before)
};

export default Dashboard;
