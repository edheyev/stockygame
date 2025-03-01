import React, { useEffect, useState } from "react";
import "../app/globals.css";
import dynamic from "next/dynamic";

// Dynamically import components
const AnimatedLineChart = dynamic(
  () => import("../components/AnimatedLineChart"),
  { ssr: false }
);
const CombinedChart = dynamic(
  () => import("../components/CombinedChart"),
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
  const [allStocks, setAllStocks] = useState(generateFunnyStocks());

  // Crash states
  const [isCrashing, setIsCrashing] = useState(false);
  const [crashProgress, setCrashProgress] = useState(0); // 0 = no crash, 1 = full meltdown

  // Listen for keyboard press (e.g. "c") to trigger crash
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "c" && !isCrashing) {
        triggerCrash();
      }
      if (e.key.toLowerCase() === "r" && isCrashing) {
        resetCrash();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCrashing]);

  // Random update interval for stocks
  useEffect(() => {
    const interval = setInterval(() => {
      setAllStocks((prevData) =>
        prevData.map((stock) => randomizeData(stock, 3, 8))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // When crashing, increment crashProgress from 0 to 1 over 60s.
  useEffect(() => {
    if (!isCrashing) return;
    const totalDuration = 60000; // 60 seconds in ms
    const startTime = performance.now();
    const updater = (now) => {
      const elapsed = now - startTime;
      const newProgress = Math.min(elapsed / totalDuration, 1);
      setCrashProgress(newProgress);
      if (newProgress < 1) {
        requestAnimationFrame(updater);
      }
    };
    requestAnimationFrame(updater);
  }, [isCrashing]);

  const triggerCrash = () => {
    setIsCrashing(true);
    setCrashProgress(0); // reset progress
  };

  const resetCrash = () => {
    setIsCrashing(false);
    setCrashProgress(0);
    // Optionally, you can also reset stocks if needed:
    setAllStocks(generateFunnyStocks());
  };

  return (
    <div
      className="flex flex-col items-center"
      style={{
        backgroundRepeat: "repeat", position: "relative", width: "100%", height: "100vh"
      }}>
      <div
        className="dashboard-container scanlines static-noise"
        style={{
          padding: "10px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          overflow: "hidden",
          margin: 0,
          maxWidth: "90%",
          position: "relative", // needed for overlay positioning
        }}
      >
        {/* Top Row for Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "auto",
          }}
        >
          <h1
            className="gothic-font dashboard-title text-gradient"
            style={{
              textAlign: "center",
              margin: "0 20px",
              fontSize: "4vw",
              padding: "20px",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            発金 StockMatic <i style={{ fontFamily: "gothic" }}>pro</i>{" "}
          </h1>

        </div>

        {/* Main Content Area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            marginTop: "10px",
            overflow: "hidden",
          }}
        >
          {/* Left Column: LARGE STOCK TABLE */}
          <div
            style={{
              flex: 3,
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              boxSizing: "border-box",
              overflow: "auto",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Live Stocks</h2>
            <FlashingStocksTable allStocks={allStocks} crashProgress={crashProgress} />
          </div>

          {/* Right Column: Chart(s) + News */}
          <div
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              overflow: "hidden",
            }}
          >
            {/* Chart on top */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              <AnimatedLineChart crashProgress={crashProgress} />
            </div>
            {/* Optionally, add other components (CombinedChart, News, etc.) below */}
          </div>
        </div>

        {/* Bottom Ticker Tape */}
        <div
          style={{
            flex: "0 0 50px",
            marginTop: "10px",
            overflow: "hidden",
          }}
        >
          <FunnyTickerTape crashProgress={crashProgress} />
        </div>

        {/* ERROR: NO MONEY overlay */}
        {crashProgress >= 1 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "4rem",
              fontWeight: "bold",
              color: "red",
              animation: "flash 1s infinite",
              pointerEvents: "none",
            }}
          >
            ERROR: NO MONEY
          </div>
        )}
      </div>
      <div className="grain-overlay"></div>
      <div></div>

    </div>
  );
};

// Helpers
function generateInitialCryptoData() {
  return [
    { name: "Buttcoin", value: "100.00", change: "0.00" },
    { name: "Moneum", value: "100.00", change: "0.00" },
    { name: "Fun Gerbils", value: "100.00", change: "0.00" },
  ];
}

function generateFunnyStocks() {
  return [
    { name: "STONKS", value: "500.00", change: "0.00" },
    { name: "YOLO CORP", value: "999.99", change: "0.00" },
    { name: "MOON BUX", value: "200.00", change: "0.00" },
  ];
}

function randomizeData(item, minWeight, maxWeight) {
  const weight = Math.random() < 0.85 ? minWeight : maxWeight;
  const change = ((Math.random() - 0.5) * weight).toFixed(2);
  const newValue = Math.max(0, parseFloat(item.value) + parseFloat(change));
  return {
    ...item,
    value: newValue.toFixed(2),
    change,
  };
}

export default Dashboard;
