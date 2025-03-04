// Dashboard.js
import React from 'react';
import '../app/vaporwave.css';
import "../app/globals.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ShorkSpinAnimation from '../components/ShorkViewer';
// import TeletextChart from '../components/TeletextChart';

// Dynamically import components
const GameWindow = dynamic(
  () => import("../components/StockGame"),
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

const Dashboard2 = () => {
  const [cryptoData, setCryptoData] = useState(generateInitialCryptoData());
  const [allStocks, setAllStocks] = useState(generateFunnyStocks());

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData((prevData) => {
        const newData = prevData.map((crypto) => {
          // Introduce a weight factor to create smoother changes
          const weight = Math.random() < 0.85 ? 2 : 7; // 85% chance for smaller changes
          const change = ((Math.random() - 0.5) * weight).toFixed(2);
          const newValue = Math.max(0, parseFloat(crypto.value) + parseFloat(change));

          // Sometimes add a random spike to simulate market excitement
          const randomSpikeChance = Math.random();
          let finalValue = newValue;

          if (randomSpikeChance < 0.5) {
            const spike = Math.random() > 0.5 ? Math.random() * 40 : Math.random() * -40; // Random positive or negative spike
            finalValue = Math.max(0, newValue + spike);
          }


          return {
            ...crypto,
            value: finalValue.toFixed(2),
            change: change,
          };
        });
        if (newData.length > 10) {
          newData.shift()
        }
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col items-center" style={{
      backgroundImage: 'url("/80s.jpeg")',
      backgroundRepeat: "repeat",
    }}>


      (
      <div className="dashboard-container scanlines static-noise"
        style={{
          padding: "10px",
          // height: "100vh",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          overflow: "hidden",
          margin: 0,
          maxWidth: "90%",
        }}
      >
        {/* Top Row for Header and Sharks */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start", // Changed to center to ensure items are centered
          height: "auto",
          background: "#0000ff",
          borderRadius: "0px",
          border: "5px solid #ff00ff",
        }}>

          <h1 className="gothic-font dashboard-title text-gradient"
            style={{
              textAlign: "start",
              margin: "0 20px", // Adjust margin as needed
              fontSize: "4vw",

              padding: "20px",

              flex: 1, // Allows the text to fill the space between sharks
              display: "flex",
              justifyContent: "center", // Centers the text inside the h1 element
              alignItems: "center", // Aligns the text vertically
            }}
          >
            発金 StockMatic <i style={{ fontFamily: "gothic" }}>pro</i>
            {/* <ShorkSpinAnimation /> */}
          </h1>
        </div>
        {/* Rest of the Dashboard Components */}
        {/* Top Row: Animated Line Chart */}
        <div
          style={{
            // flex: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            boxSizing: "border-box",
            overflow: "hidden",
            minHeight: 0,
            marginTop: "10px"
          }}
        >
          <GameWindow />
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

      </div >
      <div className="grain-overlay">
      </div>
    </div >
  );
};

const generateInitialCryptoData = () => {
  return [
    { name: "Buttcoin", value: "100.00", change: "0.00" },
    { name: "Moneum", value: "100.00", change: "0.00" },
    { name: "Fun Gerbils", value: "100.00", change: "0.00" },
  ];
};

const generateFunnyStocks = () => {
  // ... (same as before)
};

export default Dashboard2;
