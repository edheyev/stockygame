import React from 'react';
import '../app/vaporwave.css';
import '../app/globals.css';
import dynamic from "next/dynamic";

// Dynamically import components
const GameWindow = dynamic(
  () => import("../components/StockGame"),
  { ssr: false }
);

const Dashboard2 = () => {
  return (
    <div
      className="flex flex-col items-center"
      style={{
        backgroundImage: 'url("/80s.jpeg")',
        backgroundRepeat: "repeat",
        minHeight: "100dvh",
        height: "100dvh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <div
        className="dashboard-container scanlines static-noise"
        style={{
          padding: "10px",
          height: "100%",         // Make container fill parent height
          width: "100%",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          overflow: "hidden",
          margin: 0,
          maxWidth: "1400px",
        }}
      >
        {/* Top Row for Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
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
              textAlign: "start",
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
            {/* <ShorkSpinAnimation /> */}
          </h1>
        </div>

        {/* Main Content: Only one component (GameWindow) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            marginTop: "10px",
            boxSizing: "border-box",
            overflow: "hidden",
            minHeight: 0,
            width: "100%",
          }}
        >
          <GameWindow />
        </div>
      </div>
      <div className="grain-overlay"></div>
    </div>
  );
};

export default Dashboard2;
