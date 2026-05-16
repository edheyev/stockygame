import React, { useState, useEffect } from "react";
import FlashingStocksTable from "./FlashingStocksTable";
import CombinedChart from "./CombinedChart";

const AlternatingDisplay = ({ allStocks, cryptoData }) => {
  const [showTable, setShowTable] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTable(prev => !prev);
    }, 20000); // toggle every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{ width: "100%", height: "100%", minHeight: 0, overflow: "hidden" }}
    >
      {showTable ? (
        <FlashingStocksTable allStocks={allStocks} />
      ) : (
        <CombinedChart cryptoData={cryptoData} />
      )}
    </div>
  );
};

export default AlternatingDisplay;
