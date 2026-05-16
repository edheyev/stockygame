import React from "react";
import FakePieChart from "./FakePieChart";
import TeletextChart from "./TeletextChart";
import '../app/vaporwave.css';
import '../app/globals.css';
const CombinedChart = ({ cryptoData }) => {
  return (
    <div style={{ padding: "0px", width: "100%", height: "100%", minHeight: 0 }} className="combined-chart-container">
    
      {/* Fake Pie Chart */}
      <div className="chart-container">
        <FakePieChart cryptoData={cryptoData} />
      </div>
      {/* Teletext Chart */}
      <div className="chart-container teletext-chart-container">
        <TeletextChart cryptoData={cryptoData} />
      </div>
    </div>
  );
};

export default CombinedChart;
