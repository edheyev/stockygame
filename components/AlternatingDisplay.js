import React, { useState, useEffect } from "react";
import FlashingStocksTable from "./FlashingStocksTable";
import CombinedChart from "./CombinedChart";

const AlternatingDisplay = ({ allStocks, cryptoData }) => {
  const [showTable, setShowTable] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTable(prev => !prev);
    }, 5000); // toggle every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
     
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
