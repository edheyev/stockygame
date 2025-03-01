import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "../app/globals.css";
import "../app/vaporwave.css";

// Base styles (you can move these to vaporwave.css if you prefer)
const styles = `
@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;

const MAX_HISTORY = 50;

const AnimatedLineChart = ({ crashProgress = 0 }) => {
  const chartRef = useRef(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [cryptoData, setCryptoData] = useState(generateInitialCryptoData());

  // Keep the latest crashProgress in a ref
  const crashProgressRef = useRef(crashProgress);
  useEffect(() => {
    crashProgressRef.current = crashProgress;
  }, [crashProgress]);

  // Ref for our update timer
  const timeoutRef = useRef();

  useEffect(() => {
    const updateData = () => {
      setCryptoData((prevData) => {
        const newData = prevData.map((crypto) => {
          const lastValue = crypto.value;
          // Continuous drift: at crashProgress = 0, drift = +1; at 1, drift becomes -19.
          const drift = 1 - crashProgressRef.current * 40;
          const fluctuation = Math.random() * 2 - 1;
          const newValue = lastValue + drift + fluctuation;
          return { ...crypto, value: Math.max(-100000, newValue) };
        });

        setHistoricalData((prevHistory) => {
          const newDataPoint = {
            time: new Date(),
            values: newData.map((c) => ({ name: c.name, value: c.value })),
          };
          const newHistory = [...prevHistory, newDataPoint];
          if (newHistory.length > MAX_HISTORY) newHistory.shift();
          return newHistory;
        });
        return newData;
      });

      const nextDelay = Math.max(100, 500 - crashProgressRef.current * 400);
      timeoutRef.current = setTimeout(updateData, nextDelay);
    };

    timeoutRef.current = setTimeout(
      updateData,
      Math.max(100, 500 - crashProgressRef.current * 4)
    );
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (historicalData.length > 1) {
      drawChart(historicalData);
    }
  }, [historicalData, crashProgress]);

  const drawChart = (data) => {
    if (!chartRef.current || data.length === 0) return;

    const container = d3.select(chartRef.current);
    const width = chartRef.current.offsetWidth;
    const height = chartRef.current.offsetHeight;
    const margin = { top: 20, right: 80, bottom: 40, left: 60 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    container.select("svg").remove();
    const svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleTime()
      .domain([data[0].time, data[data.length - 1].time])
      .range([0, graphWidth]);

    // Always use dynamic y-axis scaling
    const allValues = data.flatMap((d) => d.values.map((v) => v.value));
    const yMin = d3.min(allValues) - 50;
    const yMax = d3.max(allValues) + 50;
    const yScale = d3.scaleLinear().domain([yMin, yMax]).range([graphHeight, 0]);

    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.time))
      .y((d) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    const colorScale = d3.scaleOrdinal(["#FF77E9", "#8C1EFF", "#00FFFF"]);

    // Compute intensity: 0 for crashProgress <= 0.5, then increasing linearly to 1 at crashProgress=1.
    const intensity =
      crashProgressRef.current >= 0.5
        ? (crashProgressRef.current - 0.5) / 0.5
        : 0;
    const baseStroke = 4;
    // Subtly increase stroke width: from 4 to about 7 at maximum intensity.
    const strokeWidth = baseStroke + intensity * 3;

    data[0].values.forEach((crypto) => {
      const cryptoLineData = data.map((d) => ({
        time: d.time,
        value: d.values.find((v) => v.name === crypto.name)?.value || 0,
      }));
      const origColor = colorScale(crypto.name);
      // Gradually interpolate the color toward red.
      const strokeColor =
        intensity > 0 ? d3.interpolateLab(origColor, "red")(intensity) : origColor;
      svg
        .append("path")
        .datum(cryptoLineData)
        .attr("fill", "none")
        .attr("stroke", strokeColor)
        .attr("stroke-width", strokeWidth)
        .attr("d", lineGenerator);
    });

    svg
      .append("g")
      .call(d3.axisLeft(yScale).ticks(5))
      .attr("class", "axis vaporwave-axis");
  };

  return (
    <>
      <style>{styles}</style>
      <div
        ref={chartRef}
        className="vaporwave-chart-container"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          // You can re-enable background animation here if desired:
          // background: "linear-gradient(45deg, #000, #2a2a72, #d64f4f, #00ffff)",
          // backgroundSize: "400% 400%",
          // animation: "gradientAnimation 15s ease infinite",
          // border: "2px solid #00FFFF",
        }}
      />
    </>
  );
};

const generateInitialCryptoData = () => [
  { name: "Buttcoin", value: 100 },
  { name: "Moneum", value: 110 },
  { name: "Fun Gerbils", value: 90 },
];

export default AnimatedLineChart;
