// TeletextChart.js

import React, { useEffect, useState } from "react";
import '../app/vaporwave.css';
import '../app/globals.css';
const TeletextChart = ({ cryptoData }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Transform cryptoData into values between 0 and 7
        const max = Math.max(...cryptoData.map((c) => parseFloat(c.value)));
        const min = Math.min(...cryptoData.map((c) => parseFloat(c.value)));
        const transformedData = cryptoData.map((c) => {
            const value = parseFloat(c.value);
            const level = Math.round(((value - min) / (max - min)) * 7);
            return {
                name: c.name,
                level,
            };
        });
        setData(transformedData);
    }, [cryptoData]);

    const blocks = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

    return (
        <div className="teletext-chart">
            {data.map((item, index) => (
                <div key={index} className="teletext-line">
                    {item.name}: {blocks[item.level]}
                </div>
            ))}
        </div>
    );
};

export default TeletextChart;
