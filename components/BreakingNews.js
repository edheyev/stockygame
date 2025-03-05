import React, { useEffect, useState } from "react";
import '../app/vaporwave.css';
import '../app/globals.css';
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
            fontSize: "1.75em",
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
    "Buy yourself something nice!",
    "Marketing team goes viral for a typo.",
    "Company launches subscription model for free products.",
    "Employees celebrate after meeting that could've been an email.",
    "Investors excited about new product that's 'like Uber, but for pets.'",
    "Dolphins finally utilised for titanium mining, stocks boom",
    "Ex-CEO caught sniffing farts while drinking kombucha.",
    "Colour purp at maximum profit today",
    "Cat gives human virus that makes gold feces, gold at all time low",
    "Badgers found minting their own currency. Clawn",
    "Local community near Buxton suddenly feels inexplicably wealthy.",
    "Gold fidget spinner wins desk prop of the year.",
    "Gandalf returns as white-dalf.",
    "Pippin labeled a fool—again.",
    "The fellowship is broken.",
    "Hobbits arrive at Rivendell—now what?",
    "Urgent: Gimli's axe is broken!",
    "Wealth curator launches magazine: 'Fancy Times'.",
    "New dinosaur discovered with Tom Cruise’s face.",
    "Recipe for golden scrambled eggs released.",
    "Cure for dandruff found. Eggs!",
    "Lost golden retriever responds to 'Wind-dog'.",
    "Cruise ship has been cruising for 69 years non-stop",
    "Cruise ship has been cruising for a bruising",
    "Sea king found dead",
    "M/54 looking for bubbly M/54 for fun times and jigsaw competition partnership",
    "Ice cream declared best dessert",
    "Premium fresh tortilla chips have in fact been underappreciated",
    "Missing person found in cake",
    "Who knew that toasted pumpkin seeds are so tasty?",
    "Mafia kingpin opens a tiktok donut bakery with free kombucha.",
    "Mojo lost: :(",
    "Urgent memo: Call Trevor, says Milton.",
  ];
  return headlines[Math.floor(Math.random() * headlines.length)];
};

export default BreakingNews;
