// AnimatedLineChart.js

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../app/globals.css";

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
        const maxDataPoints = 30;
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
    const margin = { top: 10, right: 100, bottom: 30, left: 40 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    container.select("svg").remove();

    const svg = container
      .append("svg")
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

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
      .curve(d3.curveMonotoneX);

    const colors = d3.scaleOrdinal(d3.schemeCategory10);

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
        .attr("stroke", colors(index))
        .attr("stroke-width", 2)
        .attr("d", line);
    });

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3.axisBottom(xScale).ticks(5).tickFormat(d3.timeFormat("%H:%M:%S"))
      );

    svg.append("g").call(d3.axisLeft(yScale).ticks(5));

    // Add legend
    const legend = svg
      .selectAll(".legend")
      .data(cryptoData)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`);

    legend
      .append("rect")
      .attr("x", width + 10)
      .attr("y", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d, i) => colors(i));

    legend
      .append("text")
      .attr("x", width + 35)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("fill", "#fff")
      .text((d) => d.name);
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
