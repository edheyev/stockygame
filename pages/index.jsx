import React from 'react';
import '../app/vaporwave.css';
import '../app/globals.css';

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { PixelButton } from "../components/GameStyles";

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
  const [allStocks] = useState(generateFunnyStocks());

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData((prevData) => {
        return prevData.map((crypto) => {
          const weight = Math.random() < 0.85 ? 2 : 5;
          const change = ((Math.random() - 0.5) * weight).toFixed(2);
          const newValue = Math.max(0, parseFloat(crypto.value) + parseFloat(change));

          const randomSpikeChance = Math.random();
          let finalValue = newValue;

          if (randomSpikeChance < 0.15) {
            const spike = Math.random() > 0.5 ? Math.random() * 40 : Math.random() * -40;
            finalValue = Math.max(0, newValue + spike);
          }

          return {
            ...crypto,
            value: finalValue.toFixed(2),
            change,
          };
        });
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col items-center"
      style={{
        backgroundImage: 'url("/80s.jpeg")',
        backgroundRepeat: "repeat",
        width: "100vw",
        height: "100dvh",
        minHeight: "100dvh",
        overflow: "hidden",
      }}
    >
      <div
        className="dashboard-container scanlines static-noise"
        style={{
          padding: "10px",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          overflow: "hidden",
          maxWidth: "1400px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            background: "#0000ff",
            borderRadius: "0px",
            border: "5px solid #ff00ff",
            padding: "clamp(8px, 1.2vh, 14px)",
            overflow: "hidden",
          }}
        >
          <h1
            className="gothic-font dashboard-title text-gradient"
            style={{
              textAlign: "center",
              margin: "0",
              fontSize: "clamp(1.7rem, 3.8vw, 3.8rem)",
              padding: "0 8px",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              lineHeight: 1,
              minWidth: 0,
            }}
          >
            発金 StockMatic <i style={{ fontFamily: "gothic" }}>pro</i>
          </h1>
          <Link href="/dashboard2" passHref>
            <PixelButton className="liquidity-button pixel-button" style={{ margin: 0, flexShrink: 0 }}>
              CLICK HERE TO PLAY THE MARKETS
            </PixelButton>
          </Link>
        </div>

        <div
          style={{
            flex: "2.3 1 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            boxSizing: "border-box",
            overflow: "hidden",
            minHeight: 0,
            marginTop: "10px",
            background: "gray",
            padding: "8px",
          }}
        >
          <AnimatedLineChart cryptoData={cryptoData} />
        </div>

        <div
          style={{
            flex: "0 0 clamp(40px, 6vh, 56px)",
            marginBottom: "10px",
            boxSizing: "border-box",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <FunnyTickerTape />
        </div>

        <div
          style={{
            flex: "1.6 1 0",
            display: "flex",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "stretch",
            boxSizing: "border-box",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: "#858484",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              minHeight: 0,
              padding: "10px",
            }}
          >
            <AlternatingDisplay allStocks={allStocks} cryptoData={cryptoData} />
          </div>

          <div
            style={{
              flex: 1,
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxSizing: "border-box",
              overflow: "hidden",
              background: "#858484",
              minHeight: 0,
            }}
            className="combined-chart-wrapper"
          >
            <BreakingNews />
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: "#858484",
              padding: "10px",
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
