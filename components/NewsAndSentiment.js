import React, { useEffect, useState, useRef } from "react";

import "../app/globals.css";
import '../app/vaporwave.css';

const NewsAndSentiment = ({ cryptoData }) => {
  const [currentHeadline, setCurrentHeadline] = useState("");
  const [sentiment, setSentiment] = useState("Neutral");
  const [hasMounted, setHasMounted] = useState(false);
  const [gifUrl, setGifUrl] = useState("");

  const cryptoDataRef = useRef(cryptoData);

  useEffect(() => {
    setHasMounted(true);
    setCurrentHeadline(generateFunnyHeadline());

    const headlineInterval = setInterval(() => {
      setCurrentHeadline(generateFunnyHeadline());
    }, 5000); // Change headline every 5 seconds

    return () => clearInterval(headlineInterval);
  }, []);

  // Update cryptoDataRef whenever cryptoData changes
  useEffect(() => {
    cryptoDataRef.current = cryptoData;
  }, [cryptoData]);

  useEffect(() => {
    if (hasMounted) {
      updateSentiment(); // Initial sentiment update
      const sentimentInterval = setInterval(updateSentiment, 10000); // Update sentiment every 15 seconds
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
    } else if (totalChange > 2 && totalChange <= 3) {
      newSentiment = "Cruisin";
      setGifUrl("/gifs/cruisin.webp");
    } else if (totalChange > 1 && totalChange <= 2) {
      newSentiment = "Bullish";
      setGifUrl("/gifs/flames.webp");
    } else if (totalChange > 0.5 && totalChange <= 1) {
      newSentiment = "Catish";
      setGifUrl("/gifs/cat.webp");
    } else if (totalChange >= -0.5 && totalChange <= 0.5) {
      newSentiment = "Boring";
      setGifUrl("/gifs/neutral.webp");
    } else if (totalChange > -1.5 && totalChange < -0.5) {
      newSentiment = "Rancid";
      setGifUrl("/gifs/rancid.webp");
    } else if (totalChange > -3 && totalChange <= -1.5) {
      newSentiment = "Bearish";
      setGifUrl("/gifs/tard.webp");
    } else if (totalChange <= -3) {
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
        // color: "#fff",
        // borderRadius: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        textShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
      }}
    >
      {/* Top Section: News Headlines */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          borderBottom: "1px solid #fff",
          background: "black",

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
          className="teletext-font blink"
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
            objectFit: "contain",
            opacity: 0.8,
          }}
        />
        {/* Overlay Text */}
        <h2
          className="teletext-font neon-text"
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: "2em",
            textAlign: "center",
            margin: 0,
          }}
        >
          Market Sentiment
          <br /> {sentiment}
        </h2>
      </div>
    </div>

  );
};
const generateFunnyHeadline = () => {
  const array = [
    "CEO announces new 'innovative' paperclip.",
    "Stock prices soar after company buys own shares.",
    "Analysts baffled by company's success despite no revenue.",
    "Marketing team accidentally goes viral with typo.",
    "Company introduces subscription model for free products.",
    "Employees celebrate after meeting that could've been an email.",
    "Investors excited about new product that's 'like Uber, but for pets.'",
    "Dolphins finally utilised for titanium mining, stocks boom",
    "Ex-CEO found sniffing farts and drinking kombucha",
    "Colour orange at maximum profit today",
    "Cat gives human virus that makes gold feces, gold at all time low",
    "Help I'm locked in the stocks control room please save me save me save me help help help",
    "Badgers found mining their own currency, Clawn",
    "Local community near Buxton experiences sudden feelings of wealth",
    "Gold fidget toy wins CEO desk prop of the year award",
    "Gandalf has returned as Gandalf the white",
    "Pippin is a fool of a Took",
    "The fellowship is broken",
    "The hobbits have arrived at Rivendell - but where to now?",
    "Urgent update: Gimli has broken his axe",
    "Wealth curator releases new magazine, called 'Fancy Times'",
    "New dinosaur excavated with face of Tom Cruise",
    "Recipe for golden scrambled eggs released",
    "Cure for dandruff finally discovered. Eggs!",
    "Lost golden retriever, responds to name 'Trevor'",
    "Cruise ship has been cruising for 69 years non-stop",
    "Cruise ship has been cruising for a bruising",
    "Sea king found dead",
    "M/54 looking for bubbly M/54 for fun times and jigsaw competition partnership",
    "Ice cream declared best dessert",
    "Premium fresh tortilla chips have in fact been underappreciated",
    "Missing person found in cake",
    "Who knew that toasted pumpkin seeds are so tasty?",
    "Famous mafia kingpin opens new tiktok donut bakery with free kombucha",
    "Mojo lost : (",
    "Urgent memo to Trevor please call me back - Milton",
  ];
  return array[Math.floor(Math.random() * array.length)]
}

export default NewsAndSentiment;
