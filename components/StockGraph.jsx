import "../app/globals.css";
import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { FaStar, FaArrowUp, FaCircle, FaSquare } from "react-icons/fa";

export default function StockGraph() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const icons = [FaStar, FaArrowUp, FaCircle, FaSquare]; // Icons for each line
  const numDatesToShow = 10; // The number of recent dates to show

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/get-stock-data");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching the data:", error);
        setError(error.message);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      drawChart(data);
    }
  }, [data]);

  // Modified drawChart function in your Dashboard component
  const drawChart = (data) => {
    const margin = { top: 20, right: 30, bottom: 100, left: 50 };
    const totalWidth = 1600; // Width of the entire chart area for horizontal scrolling
    const height = 400;
    const width = 800;

    d3.select("#chart").selectAll("*").remove();
    d3.select("#y-axis").selectAll("*").remove();

    // Create div to hold both the y-axis and the scrolling chart
    const chartContainer = d3
      .select("#chart-container")
      .style("position", "relative");

    // Create SVG for y-axis (fixed)
    const yAxisSvg = chartContainer
      .append("svg")
      .attr("width", margin.left)
      .attr("height", height)
      .style("position", "absolute")
      .style("left", "0px")
      .style("top", "0px")
      .style("z-index", 1);

    // Create SVG canvas for the chart (scrollable)
    const svg = chartContainer
      .append("div")
      .style("overflow-x", "scroll")
      .style("-webkit-overflow-scrolling", "touch")
      .append("svg")
      .attr("width", totalWidth)
      .attr("height", height)
      .style("display", "block")
      .style("margin-left", `${margin.left}px`);

    const parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach((d) => {
      d.Date = parseDate(d.Date);
    });

    const xScale = d3
      .scalePoint()
      .domain(data.map((d) => d.Date))
      .range([0, totalWidth - margin.right - margin.left]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) =>
          Math.max(d.CompanyA, d.CompanyB, d.CompanyC, d.CompanyD, d.CompanyE)
        ),
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Create y-axis (fixed)
    const yAxis = d3.axisLeft(yScale);
    yAxisSvg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .attr("color", "white");

    // Create x-axis (scrollable)
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m-%d"));
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .attr("color", "white")
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em")
      .attr("transform", "rotate(-90)");

    // Line generator function for each company
    const companies = [
      "CompanyA",
      "CompanyB",
      "CompanyC",
      "CompanyD",
      "CompanyE",
    ];

    companies.forEach((company, index) => {
      const color = d3.schemeCategory10[index % 10];
      const lineGenerator = d3
        .line()
        .x((d) => xScale(d.Date))
        .y((d) => yScale(d[company]));

      // Draw the line for each company
      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);

      // Add icon at the end of each line
      const lastValue = data[data.length - 1];
      const IconComponent = icons[index % icons.length];

      svg
        .append("foreignObject")
        .attr("x", xScale(lastValue.Date) + 5)
        .attr("y", yScale(lastValue[company]) - 10)
        .attr("width", 20)
        .attr("height", 20)
        .append("xhtml:div")
        .style("color", color)
        .html(
          `<span style="font-size: 20px;">$${
            React.createElement(IconComponent).props.children
          }</span>`
        );
    });

    // Add legend for each company
    const legend = svg
      .selectAll(".legend")
      .data(companies)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d, i) =>
          `translate(${totalWidth - margin.right - 200}, ${
            margin.top + i * 30
          })`
      );

    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d, i) => d3.schemeCategory10[i % 10]);

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("fill", "white")
      .text(
        (d, i) =>
          `${React.createElement(icons[i % icons.length]).props.children} ${d}`
      );

    // Scroll to the end of the chart (centered on the latest data)
    const chartDiv = d3.select("#chart-container div");
    const scrollPosition = totalWidth - chartDiv.node().offsetWidth;
    chartDiv.node().scrollTo({ left: scrollPosition, behavior: "smooth" });
  };

  return (
    <div
      style={{
        border: "2px solid red", // Adds a red border around the container
      }}
    >
      {error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div id="y-axis"></div>
          <div
            id="chart-container"
            className="flex mx-auto"
            style={{
              width: "100%",
              maxWidth: "1000px",
              overflowX: "auto", // Horizontal scroll
              overflowY: "hidden",
              position: "relative",
              display: "flex", // New line added
              flexDirection: "column-reverse", // New line added
            }}
          ></div>
        </>
      )}
    </div>
  );
}
