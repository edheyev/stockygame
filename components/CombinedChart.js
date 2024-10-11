// CombinedChart.js

import React from "react";
import FakePieChart from "./FakePieChart";
import TeletextChart from "./TeletextChart";
import "../app/globals.css";
import "../app/vaporwave.css"; // Ensure your styles are imported

const CombinedChart = ({ cryptoData }) => {
    return (
        <div style={{ padding: "10px" }}
            className="combined-chart-container">
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
