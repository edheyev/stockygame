import React from 'react';
import '../app/vaporwave.css';
import "../app/globals.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { PixelButton } from "../components/GameStyles"; // import your styled PixelButton

// Dynamically import components
const AnimatedLineChart = dynamic(
  () => import("../components/AnimatedLineChart"),
  { ssr: false }
);
const AlternatingDisplay = dynamic(
  () => import("../components/AlternatingDisplay"),
  { ssr: false }
);

const FunnyTickerTape = dynamic(() => import("../components/FunnyTickerTape"), {
  ssr: false,
});

const NewsAndSentiment = dynamic(
  () => import("../components/NewsAndSentiment"),
  { ssr: false }
);
const BreakingNews = dynamic(
  () => import("../components/BreakingNews"),
  { ssr: false }
);

const Dashboard = () => {
  const [cryptoData, setCryptoData] = useState(generateInitialCryptoData());
  const [allStocks, setAllStocks] = useState(generateFunnyStocks());

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData((prevData) => {
        const newData = prevData.map((crypto) => {
          // Introduce a weight factor to create smoother changes
          const weight = Math.random() < 0.85 ? 2 : 5; // 85% chance for smaller changes
          const change = ((Math.random() - 0.5) * weight).toFixed(2);
          const newValue = Math.max(0, parseFloat(crypto.value) + parseFloat(change));

          // Sometimes add a random spike to simulate market excitement
          const randomSpikeChance = Math.random();
          let finalValue = newValue;

          if (randomSpikeChance < 0.15) {
            const spike = Math.random() > 0.5 ? Math.random() * 40 : Math.random() * -40;
            finalValue = Math.max(0, newValue + spike);
          }

          return {
            ...crypto,
            value: finalValue.toFixed(2),
            change: change,
          };
        });
        return newData;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center" style={{
      backgroundImage: 'url("/80s.jpeg")',
      backgroundRepeat: "repeat",
    }}>
      <div className="dashboard-container scanlines static-noise"
        style={{
          padding: "10px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          overflow: "hidden",
          maxWidth: "90%",
        }}
      >
        {/* Top Row for Header and Navigation */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "auto",
          background: "#0000ff",
          borderRadius: "0px",
          border: "5px solid #ff00ff",
        }}>
          <h1 className="gothic-font dashboard-title text-gradient"
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
            発金 StockMatic <i style={{ fontFamily: "gothic" }}>pro</i>
          </h1>
          <Link href="/dashboard2" passHref>
            <PixelButton>CLICK HERE TO PLAY THE MARKETS</PixelButton>
          </Link>
        </div>

        {/* Animated Line Chart */}
        <div style={{
          flex: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
          boxSizing: "border-box",
          overflow: "hidden",
          minHeight: 0,
          marginTop: "10px",
          background:"gray"
        }}>
          <AnimatedLineChart cryptoData={cryptoData} />
        </div>

        {/* Rolling Ticker Tape */}
        <div style={{
          flex: 0.5,
          marginBottom: "10px",
          boxSizing: "border-box",
          overflow: "hidden",
          minHeight: 0,
          height: "50px",
        }}>
          <FunnyTickerTape />
        </div>

        {/* Table, Pie Chart, and News & Sentiment */}
        <div style={{
          flex: 2,
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "stretch",
          boxSizing: "border-box",
          overflow: "hidden",
          minHeight: 0,
        }}>
          {/* Stocks Table */}
          
          <div style={{
            flex: 1,
            backgroundColor: "#858484",
            // display: "flex",
            // flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            minHeight: 0,
            
          }}>
            <AlternatingDisplay allStocks={allStocks} cryptoData={cryptoData} />
          
          </div>

          {/* Combined Chart (Pie Chart) */}
          <div style={{
            flex: 1,
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            boxSizing: "border-box",
            overflow: "hidden",
            background: "#858484"
          }}
            className="combined-chart-wrapper"
          >
             
             <BreakingNews />

          </div>


          {/* News and Sentiment */}
          <div style={{
            flex: 1,
            backgroundColor: "#858484",
            padding: "0",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            overflow: "hidden",
            minHeight: 0,
          }}>
            <NewsAndSentiment cryptoData={cryptoData} />
          </div>
        </div>
      </div>
      <div className="grain-overlay"></div>
    </div>
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

export default Dashboard;
