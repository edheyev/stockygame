import React, { useEffect, useState } from "react";
import "../app/globals.css";

const NewsAndSentiment = ({ cryptoData }) => {
  const [headlines, setHeadlines] = useState([]);
  const [currentHeadline, setCurrentHeadline] = useState("");
  const [sentiment, setSentiment] = useState("Neutral");
  const [hasMounted, setHasMounted] = useState(false);
  const [gifUrl, setGifUrl] = useState("");

  useEffect(() => {
    setHasMounted(true);
    const news = generateFunnyHeadlines();
    setHeadlines(news);
    setCurrentHeadline(news[0]);

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % news.length;
      setCurrentHeadline(news[index]);
    }, 5000); // Change headline every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      updateSentiment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptoData]);

  const updateSentiment = () => {
    const totalChange = cryptoData.reduce(
      (sum, crypto) => sum + parseFloat(crypto.change),
      0
    );
    let newSentiment = "Neutral";
    if (totalChange > 10) {
      newSentiment = "Bullish";
      setGifUrl("/gifs/flames.webp");
    } else if (totalChange < -10) {
      newSentiment = "Bearish";
      setGifUrl("/gifs/dance.webp");
    } else {
      newSentiment = "Neutral";
      setGifUrl("/gifs/flames.webp");
    }
    setSentiment(newSentiment);
  };

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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top Section: News Headlines */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          borderBottom: "1px solid #374151",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "25%",
        }}
      >
        <p
          style={{
            fontSize: "1.1em",
            textAlign: "center",
            margin: 0,
          }}
        >
          BREAKING: {currentHeadline}
        </p>
      </div>

      {/* Bottom Section: Market Sentiment */}
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background GIF */}
        <img
          src={gifUrl}
          alt="Market Sentiment"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.3,
          }}
        />
        {/* Overlay Text */}
        <h2
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: "2em",
            textAlign: "center",
            margin: 0,
          }}
        >
          Market Sentiment: {sentiment}
        </h2>
      </div>
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

export default NewsAndSentiment;
