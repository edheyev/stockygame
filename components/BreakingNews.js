import React, { useEffect, useState } from "react";
import "../app/vaporwave.css";

const BreakingNews = () => {
  const [currentHeadline, setCurrentHeadline] = useState("");

  useEffect(() => {
    // Immediately set a headline and update it every 5 seconds.
    const updateHeadline = () => {
      setCurrentHeadline(generateFunnyHeadline());
    };
    updateHeadline();
    const headlineInterval = setInterval(updateHeadline, 5000);
    return () => clearInterval(headlineInterval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000", // Black background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <h1
       
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
        BREAKING: {currentHeadline}
      </h1>
    </div>
  );
};

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

export default BreakingNews;
