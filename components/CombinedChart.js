import React from "react";
import FakePieChart from "./FakePieChart";
import TeletextChart from "./TeletextChart";
import BreakingNews from "./BreakingNews"; // Import the new breaking news component
import '../app/vaporwave.css';
import '../app/globals.css';
const CombinedChart = ({ cryptoData }) => {
  return (
    <div style={{ padding: "0px" }} className="combined-chart-container">
    
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
