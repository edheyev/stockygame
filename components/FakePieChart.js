// FakePieChart.js

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../app/globals.css";
import "../app/vaporwave.css"; // Ensure your styles are imported

const FakePieChart = ({ cryptoData }) => {
  const chartRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    drawChart();
    window.addEventListener("resize", drawChart);
    return () => {
      window.removeEventListener("resize", drawChart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptoData]);

  const drawChart = () => {
    if (!chartRef.current) return;
    const data = cryptoData.map((crypto) => ({
      name: crypto.name,
      value: parseFloat(crypto.value),
    }));

    const container = d3.select(chartRef.current);
    const width = chartRef.current.offsetWidth;
    const height = chartRef.current.offsetHeight;
    const radius = Math.min(width, height) / 2;

    container.select("svg").remove();

    const svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Vaporwave color palette
    const vaporwaveColors = ["#FF77E9", "#8C1EFF", "#00FFFF", "#FFB347"];

    const color = d3.scaleOrdinal(vaporwaveColors);

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = svg.selectAll("arc").data(pie(data)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i))
      .attr("class", "neon-path");

    // Add labels
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "20px")
      .attr("fill", "#fff")
      .attr("class", "vaporwave-text")
      .text((d) => d.data.name);
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      ref={chartRef}
      className="fake-pie-chart-container"
    ></div>
  );
};

export default FakePieChart;
