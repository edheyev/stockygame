// components/NewsHeadlines.js

import React, { useEffect, useState } from "react";
import "../app/globals.css";

const NewsHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const news = generateFunnyHeadlines();
    setHeadlines(news);
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#1f2937",
        color: "#fff",
        borderRadius: "10px",
        padding: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Latest News</h2>
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {headlines.slice(0, 5).map((headline, index) => (
          <li key={index} style={{ marginBottom: "10px", fontSize: "1em" }}>
            • {headline}
          </li>
        ))}
      </ul>
    </div>
  );
};

const generateFunnyHeadlines = () => [
  "CEO announces new 'innovative' paperclip.",
  "Stock prices soar after company buys own shares.",
  "Analysts baffled by company's success despite no revenue.",
  "Marketing team accidentally goes viral with typo.",
  "Company introduces subscription model for free products.",
  "Employees celebrate after meeting that could've been an email.",
  "Investors excited about new product that's 'like Uber, but for pets.'",
];

export default NewsHeadlines;
