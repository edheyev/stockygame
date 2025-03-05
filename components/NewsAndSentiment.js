import React, { useEffect, useState, useRef } from "react";
import "../app/globals.css";
import "../app/vaporwave.css";

const NewsAndSentiment = ({ cryptoData }) => {
  const [currentHeadline, setCurrentHeadline] = useState("");
  const [sentiment, setSentiment] = useState("Neutral");
  const [hasMounted, setHasMounted] = useState(false);
  const [gifUrl, setGifUrl] = useState("");

  // We'll keep the latest cryptoData in a ref so that updateSentiment always uses the current data.
  const cryptoDataRef = useRef(cryptoData);

  // On initial mount, set hasMounted to true and set an initial headline.
  useEffect(() => {
    setHasMounted(true);
    setCurrentHeadline(generateFunnyHeadline());
    const headlineInterval = setInterval(() => {
      setCurrentHeadline(generateFunnyHeadline());
    }, 5000);
    return () => clearInterval(headlineInterval);
  }, []);

  // Whenever cryptoData changes, update our ref.
  useEffect(() => {
    cryptoDataRef.current = cryptoData;
  }, [cryptoData]);

  // Once mounted, update sentiment every 10 seconds.
  useEffect(() => {
    if (hasMounted) {
      updateSentiment(); // do an immediate update
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

  // A simple function to randomly pick a headline.
  const generateFunnyHeadline = () => {
    const headlines = [
      "CEO announces new 'innovative' paperclip.",
      "Stock prices soar after company buys own shares.",
      "Analysts baffled by success despite zero revenue.",
      "Marketing team goes viral for a typo.",
      "Company launches subscription model for free products.",
      "Meeting that could've been an email sparks celebration.",
      "Investors excited about a product that's 'like Uber for pets.'",
      "Dolphins deployed for titanium mining—stocks boom!",
      "Ex-CEO caught sniffing farts while drinking kombucha.",
      "Orange is the new black—profit skyrockets!",
      "Cat infects human with gold-producing virus!",
      "Help! Locked in stock control room—send aid!",
      "Badgers found minting their own currency.",
      "Local community suddenly feels inexplicably wealthy.",
      "Gold fidget spinner wins desk prop of the year.",
      "Gandalf returns as a corporate overlord.",
      "Pippin labeled a fool—again.",
      "The fellowship has splintered into quarterly reports.",
      "Hobbits arrive at Rivendell—now what?",
      "Urgent: Gimli's axe is broken!",
      "Wealth curator launches magazine: 'Fancy Times'.",
      "New dinosaur discovered with Tom Cruise’s face.",
      "Recipe for golden scrambled eggs goes viral.",
      "Cure for dandruff? Apparently, it's eggs!",
      "Lost golden retriever now known as 'Trevor'.",
      "Non-stop cruise ship now a floating corporate retreat.",
      "Bruised cruise ship struggles to stay afloat.",
      "Sea king found dead—corporate takeover imminent.",
      "M/54 seeks partner for jigsaw and existential dread.",
      "Ice cream declared the ultimate capitalist indulgence.",
      "Tortilla chips: The unsung hero of high finance.",
      "Missing person found in a cake—what a slice!",
      "Toasted pumpkin seeds steal the spotlight.",
      "Mafia kingpin opens a tiktok donut bakery.",
      "Mojo lost: Existential crisis ensues.",
      "Urgent memo: Call Trevor, says Milton.",
    ];
    return headlines[Math.floor(Math.random() * headlines.length)];
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
      {/* Full-box Background with GIF */}
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
        {/* Overlay headline text with a dark translucent background */}
        <h2
          className="teletext-font neon-text"
          style={{
            position: "relative",
            zIndex: 1,
            fontSize: "2em",
            textAlign: "center",
            margin: 0,
            padding: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "5px",
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
