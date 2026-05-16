import React, { useEffect, useState, useRef } from "react";
import '../app/vaporwave.css';
import '../app/globals.css';

const NewsAndSentiment = ({ cryptoData }) => {
  const [sentiment, setSentiment] = useState("Neutral");
  const [hasMounted, setHasMounted] = useState(false);
  const [gifUrl, setGifUrl] = useState("");
  const cryptoDataRef = useRef(cryptoData);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    cryptoDataRef.current = cryptoData;
  }, [cryptoData]);

  useEffect(() => {
    if (hasMounted) {
      updateSentiment();
      const sentimentInterval = setInterval(updateSentiment, 10000);
      return () => clearInterval(sentimentInterval);
    }
  }, [hasMounted]);

  const updateSentiment = () => {
    const totalChange = cryptoDataRef.current.reduce(
      (sum, crypto) => sum + parseFloat(crypto.change),
      0
    );

    let newSentiment = "Neutral";

    if (totalChange > 3) {
      newSentiment = "Divine";
      setGifUrl("/gifs/divine.webp");
    } else if (totalChange > 2) {
      newSentiment = "Cruisin";
      setGifUrl("/gifs/cruisin.webp");
    } else if (totalChange > 1) {
      newSentiment = "Bullish";
      setGifUrl("/gifs/flames.webp");
    } else if (totalChange > 0.5) {
      newSentiment = "Catish";
      setGifUrl("/gifs/cat.webp");
    } else if (totalChange >= -0.5) {
      newSentiment = "Boring";
      setGifUrl("/gifs/neutral.webp");
    } else if (totalChange > -1.5) {
      newSentiment = "Rancid";
      setGifUrl("/gifs/rancid.webp");
    } else if (totalChange > -3) {
      newSentiment = "Bearish";
      setGifUrl("/gifs/tard.webp");
    } else {
      newSentiment = "Very Bearish";
      setGifUrl("/gifs/bearish.webp");
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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        textShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
        position: "relative",
      }}
    >
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
        <img
          src={gifUrl}
          alt="Market Sentiment"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.8,
          }}
        />
        <h2
          className="teletext-font neon-text"
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: "clamp(1rem, 2.5vh, 1.8rem)",
            lineHeight: 1.15,
            textAlign: "center",
            margin: 0,
            padding: "12px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "5px",
            maxWidth: "92%",
          }}
        >
          Market Sentiment
          <br />
          {sentiment}
        </h2>
      </div>
    </div>
  );
};

export default NewsAndSentiment;
