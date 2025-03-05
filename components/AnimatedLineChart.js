import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../app/globals.css";
import "../app/vaporwave.css"; // Keep vaporwave styles if desired

const AnimatedLineChart = ({ cryptoData }) => {
  const chartRef = useRef(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      // Add a new data point based on current cryptoData
      setHistoricalData((prevData) => {
        const newDataPoint = {
          time: new Date(),
          values: cryptoData.map((crypto) => ({
            name: crypto.name,
            value: parseFloat(crypto.value),
          })),
        };
        // Keep only the last 10 data points
        const maxDataPoints = 20;
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
    const margin = { top: 20, right: 60, bottom: 40, left: 40 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    // Clear previous SVG content
    container.select("svg").remove();

    const svg = container
      .append("svg")
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // --- Gradient Background ---
    const defs = svg.append("defs");
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
      .attr("width", width)
      .attr("height", height)
      .attr("x", 0)
      .attr("y", 0)
      .style("fill", "url(#bg-gradient)");

    // --- Scales ---
    const xScale = d3
      .scaleTime()
      .domain([data[0].time, data[data.length - 1].time])
      .range([0, width]);

    const allValues = data.flatMap((d) => d.values.map((v) => v.value));
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(allValues) * 0.9, d3.max(allValues) * 1.1])
      .range([height, 0]);

    // --- Line Generator ---
    const line = d3
      .line()
      .x((d) => xScale(d.time))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // --- Draw Lines ---
    const colors = ["#FF77E9", "#8C1EFF", "#00FFFF"];
    cryptoData.forEach((crypto, index) => {
      const cryptoLineData = data.map((d) => ({
        time: d.time,
        value: d.values.find((v) => v.name === crypto.name).value,
      }));
      svg
        .append("path")
        .datum(cryptoLineData)
        .attr("fill", "none")
        .attr("stroke", colors[index % colors.length])
        .attr("stroke-width", 3)
        .attr("d", line);
        
    });

    // --- Axes ---
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(3)
      .tickFormat(d3.timeFormat("%H:%M:%S"));

    const yAxis = d3.axisLeft(yScale).ticks(3);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .attr("class", "axis");

    svg
      .append("g")
      .call(yAxis)
      .attr("class", "axis");

    // --- Axis Labels ---
    svg
      .append("text")
      .attr("transform", `translate(${width / 2}, ${height + 30})`)
      .style("text-anchor", "middle")
      .style("fill", "#fff")
      .text("Life");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -30)
      .attr("x", -height / 2)
      .style("text-anchor", "middle")
      .style("fill", "#fff")
      .text("Value");
      
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    ></div>
  );
};

export default AnimatedLineChart;
