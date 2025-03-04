// AnimatedLineChart.js

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../app/globals.css";
import "../app/vaporwave.css"; // Import the vaporwave styles

const AnimatedLineChart = ({ cryptoData }) => {
  const chartRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      // Update historical data
      setHistoricalData((prevData) => {
        const newDataPoint = {
          time: new Date(),
          values: cryptoData.map((crypto) => ({
            name: crypto.name,
            value: parseFloat(crypto.value),
          })),
        };
        // Keep only the last N data points
        const maxDataPoints = 10;
        const newData = [...prevData, newDataPoint].slice(-maxDataPoints);
        drawChart(newData);
        return newData;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptoData]);

  const drawChart = (data) => {
    if (!chartRef.current) return;

    const container = d3.select(chartRef.current);
    const containerWidth = chartRef.current.offsetWidth;
    const containerHeight = chartRef.current.offsetHeight;
    const margin = { top: 20, right: 120, bottom: 50, left: 60 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    container.select("svg").remove();

    // Add background gradient and grid
    const svg = container
      .append("svg")
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .attr("class", "vaporwave-chart");

    // Define the gradient for background
    // Add SVG filter for glow effect
    const defs = svg.append("defs");

    const filter = defs
      .append("filter")
      .attr("id", "glow");

    filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "4")
      .attr("result", "coloredBlur");

    const feMerge = filter.append("feMerge");

    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Background gradient
    defs
      .append("linearGradient")
      .attr("id", "bg-gradient")
      .attr("gradientTransform", "rotate(90)")
      .selectAll("stop")
      .data([
        { offset: "0%", color: "#8C1EFF" },
        { offset: "100%", color: "#FF77E9" },
      ])
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    svg
      .append("rect")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", `translate(${-margin.left},${-margin.top})`)
      .style("fill", "url(#bg-gradient)");

    // Retro grid lines
    const gridSize = 20;

    const gridLinesX = d3.range(0, width, gridSize);
    const gridLinesY = d3.range(0, height, gridSize);

    svg
      .selectAll(".grid-line-x")
      .data(gridLinesY)
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("y1", (d) => d)
      .attr("x2", width)
      .attr("y2", (d) => d)
      .style("stroke", "rgba(255, 255, 255, 0.5)");

    svg
      .selectAll(".grid-line-y")
      .data(gridLinesX)
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", (d) => d)
      .attr("y1", 0)
      .attr("x2", (d) => d)
      .attr("y2", height)
      .style("stroke", "rgba(255, 255, 255, 0.3)");

    // Set up scales
    const xScale = d3
      .scaleTime()
      .domain([data[0].time, data[data.length - 1].time])
      .range([0, width]);

    // Get the min and max values across all cryptocurrencies
    const allValues = data.flatMap((d) => d.values.map((v) => v.value));
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(allValues) * 0.9, d3.max(allValues) * 1.1])
      .range([height, 0]);

    // Define lines for each cryptocurrency
    const line = d3
      .line()
      .x((d) => xScale(d.time))
      .y((d) => yScale(d.value))
    // .curve(d3.curveMonotoneX);

    const vaporwaveColors = ["#FF77E9", "#8C1EFF", "#00FFFF", "#FFB347"];

    // For each cryptocurrency, draw a line
    cryptoData.forEach((crypto, index) => {
      const cryptoLineData = data.map((d) => ({
        time: d.time,
        value: d.values.find((v) => v.name === crypto.name).value,
      }));

      svg
        .append("path")
        .datum(cryptoLineData)
        .attr("fill", "none")
        .attr("stroke", vaporwaveColors[index % vaporwaveColors.length])
        .attr("stroke-width", 5)
        .attr("class", "neon-line")
        .attr("d", line);
    });

    // Add axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickFormat(d3.timeFormat("%H:%M:%S"));

    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .attr("class", "axis vaporwave-axis");

    svg.append("g").call(yAxis).attr("class", "axis vaporwave-axis");

    // Add axes labels
    svg
      .append("text")
      .attr("class", "axis-label vaporwave-axis")
      .attr("transform", `translate(${width / 2}, ${height + 40})`)
      .style("text-anchor", "middle")
      .text("Time");

    svg
      .append("text")
      .attr("class", "axis-label vaporwave-axis")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", -height / 2)
      .style("text-anchor", "middle")
      .text("Value");

    // Add legend
    const legend = svg
      .selectAll(".legend")
      .data(cryptoData)
      .enter()
      .append("g")
      .attr("class", "legend vaporwave-text")
      .attr("transform", (d, i) => `translate(0, ${i * 25})`);

    // legend
    //   .append("rect")
    //   .attr("x", width + 20)
    //   .attr("y", 0)
    //   .attr("width", 18)
    //   .attr("height", 18)
    //   .style("fill", (d, i) => vaporwaveColors[i % vaporwaveColors.length])
    //   .attr("class", "neon-rect");

    // legend
    //   .append("text")
    //   .attr("x", width + 45)
    //   .attr("y", 9)
    //   .attr("dy", ".35em")
    //   .text((d) => d.name);
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
      className="vaporwave-chart-container"
    ></div>
  );
};

export default AnimatedLineChart;