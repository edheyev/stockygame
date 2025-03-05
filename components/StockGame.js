import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import {
  GameContainer,
  PixelButton,
  PixelText,
  LoadingAnimation,
  Title,
  StatBox,
  GraphContainer,
  SidePanel,
  LiquidityButton,
} from "./GameStyles";
import CynicalTickerTape from "./CynicalTickerTape";

const { webkitSpeechRecognition } = window;
const SpeechRecognition = webkitSpeechRecognition || window.SpeechRecognition;

const GameWindow = () => {
  // Main game state variables
  const [screen, setScreen] = useState("start");
  const [playerName, setPlayerName] = useState("Chad");
  const [liquidAssets, setLiquidAssets] = useState(1000);
  const [netWorth, setNetWorth] = useState(1000);
  const [stockHoldings, setStockHoldings] = useState(0);
  const [currentStockPrice, setCurrentStockPrice] = useState(100);
  const [stockHistory, setStockHistory] = useState([100]);
  const [gameTime, setGameTime] = useState(60);
  const [eventMessage, setEventMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  // Leaderboard holds objects of shape: { name, score, tip? }
  const [leaderboard, setLeaderboard] = useState([]);
  // State for the player’s submitted tip (if applicable)
  const [playerTip, setPlayerTip] = useState("");
  const stockHoldingsRef = useRef(stockHoldings);
  // Prevent duplicate leaderboard updates
  const scoreSubmittedRef = useRef(false);

  // Disabled state for liquidity buttons (they turn red when disabled)
  const [disabledButtons, setDisabledButtons] = useState({
    netflix: false,
    kidsFund: false,
    remortgage: false,
    pawnJewelry: false,
    sellAntiques: false,
  });

  // Load leaderboard from localStorage on mount
  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    setLeaderboard(storedLeaderboard);
  }, []);

  // When the game ends (screen === "end") update the leaderboard if not already done.
  useEffect(() => {
    if (screen === "end" && !scoreSubmittedRef.current) {
      const calculatedFinalScore = netWorth;
      setFinalScore(calculatedFinalScore);
      let leaderboardArr = JSON.parse(localStorage.getItem("leaderboard") || "[]");
      leaderboardArr.push({ name: playerName, score: calculatedFinalScore });
      leaderboardArr.sort((a, b) => b.score - a.score);
      leaderboardArr = leaderboardArr.slice(0, 10);
      localStorage.setItem("leaderboard", JSON.stringify(leaderboardArr));
      setLeaderboard(leaderboardArr);
      scoreSubmittedRef.current = true;
    }
  }, [screen, netWorth, playerName]);

  // Update net worth from liquid assets + (stocks × current price)
  useEffect(() => {
    setNetWorth(liquidAssets + stockHoldings * currentStockPrice);
  }, [liquidAssets, stockHoldings, currentStockPrice]);

  // Update stock price every second (only during gameplay)
  useEffect(() => {
    if (screen !== "game") return;
    const interval = setInterval(updateStockPrice, 1000);
    return () => clearInterval(interval);
  }, [screen, currentStockPrice, stockHistory]);

  // Update game timer only during "game" mode
  useEffect(() => {
    if (screen !== "game") return;
    if (gameTime > 0) {
      const timeout = setTimeout(() => {
        setGameTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setScreen("end");
    }
  }, [gameTime, screen]);

  // Keep a ref for stockHoldings for use in speech recognition
  useEffect(() => {
    stockHoldingsRef.current = stockHoldings;
  }, [stockHoldings]);

  // Start game when player clicks start (simulate a 3-second loading delay)
  const startGame = () => {
    if (playerName.trim() !== "") {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setScreen("game");
      }, 3000);
    }
  };

  // Liquidity buttons simply add to liquid assets and then disable themselves
  const increaseLiquidity = (amount, buttonKey) => {
    setLiquidAssets((prevAssets) => prevAssets + amount);
    setDisabledButtons((prev) => ({
      ...prev,
      [buttonKey]: true,
    }));
  };

  // Randomly generate a new stock price (always ≥ £10)
  const generateRandomStockPrice = () => {
    const newPrice = currentStockPrice + (Math.random() - 0.5) * 10;
    return Math.max(10, parseFloat(newPrice.toFixed(2)));
  };

  // Update stock price and record history (keeping the last 20 values)
  const updateStockPrice = () => {
    const newPrice = generateRandomStockPrice();
    setCurrentStockPrice(newPrice);
    setStockHistory((prev) => [...prev.slice(-20), newPrice]);
  };

  // Buy stock only if enough liquid assets
  const handleBuy = () => {
    if (liquidAssets >= currentStockPrice) {
      setStockHoldings((prev) => prev + 1);
      setLiquidAssets((prev) => prev - currentStockPrice);
    } else {
    }
  };

  // Sell stock if available
  const handleSell = () => {
    if (stockHoldingsRef.current > 0) {
      setStockHoldings((prev) => prev - 1);
      setLiquidAssets((prev) => prev + currentStockPrice);
    }
  };

  // Voice recognition for “buy” or “sell” commands
  useEffect(() => {
    if (screen === "game" && SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.start();

      recognition.onresult = (event) => {
        const lastResultIndex = event.results.length - 1;
        const command = event.results[lastResultIndex][0].transcript.trim().toLowerCase();
        if (command.includes("buy") || command.includes("bye")) {
          handleBuy();
        } else if (command.includes("sell") || command.includes("cell")) {
          handleSell();
        }
      };

      recognition.onerror = (event) => {
      };

      return () => {
        recognition.stop();
      };
    }
  }, [screen]);

  // --- New Market Events (Dark & Cynical) ---
  const generateRandomEvent = () => {
    const events = [
      {
        message: "Crash of the bourgeoisie! The market implodes under capitalist greed!",
        effect: () => setCurrentStockPrice((prev) => Math.max(10, prev * 0.6)),
      },
      {
        message: "Revolutionary surge! Workers' solidarity pushes prices up—if only for a moment!",
        effect: () => setCurrentStockPrice((prev) => prev * 1.2),
      },
      {
        message: "Tech overlords unveil their latest gimmick to distract from systemic exploitation.",
        effect: () => setCurrentStockPrice((prev) => prev * 0.9),
      },
      {
        message: "Economic collapse? More like the inevitable redistribution of wealth.",
        effect: () => setCurrentStockPrice((prev) => Math.max(10, prev * 0.8)),
      },
      {
        message: "Nothing changes. The machine grinds on, sucking the life out of us all.",
        effect: () => {},
      },
    ];
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    setEventMessage(randomEvent.message);
    randomEvent.effect();
  };

  useEffect(() => {
    if (screen !== "game") return;
    const eventInterval = setInterval(generateRandomEvent, 10000);
    return () => clearInterval(eventInterval);
  }, [screen]);

  // End the game if net worth drops to or below zero
  useEffect(() => {
    if (netWorth <= 0 && screen === "game") {
      setScreen("end");
    }
  }, [netWorth, screen]);

  // Render the stock price graph using D3 in a 400x400 container
  useEffect(() => {
    const svg = d3.select("#stockGraph");
    svg.selectAll("*").remove();
    const width = 400;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 40 };

    const minY = d3.min(stockHistory) - 5;
    const yMin = minY > 0 ? 0 : minY;
    const yMax = d3.max(stockHistory) + 5;

    const xScale = d3
      .scaleLinear()
      .domain([0, stockHistory.length - 1])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(stockHistory)
      .attr("fill", "none")
      .attr("stroke", "limegreen")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .selectAll(".dot")
      .data(stockHistory)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => xScale(i))
      .attr("cy", (d) => yScale(d))
      .attr("r", 3)
      .attr("fill", "limegreen");
  }, [stockHistory]);

  // --- UI Renders ---

  // Render a common Back button at the top left that links to the home page (/)
  const renderBackButton = () => (
    <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1000 }}>
      <PixelButton onClick={() => (window.location.href = "/")}>Back</PixelButton>
    </div>
  );

  // START SCREEN: includes name input, leaderboard, and (if any) scrolling tips
  if (screen === "start") {
    // Extract tips from leaderboard entries that include a tip
    const tips = leaderboard
      .filter((entry) => entry.tip && entry.tip.trim() !== "")
      .map((entry) => ({ name: entry.name, tip: entry.tip }));
    return (
      <GameContainer>
        {renderBackButton()}
        <Title>BUY LO SELL HI</Title>
        <PixelText>Objective: End with the highest net worth!</PixelText>
        <PixelText>
          Instructions: Buy low, sell high, and watch as the system devours itself!
        </PixelText>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "none",
              background: "black",
              color: "white",
            }}
          />
        </div>
        <PixelButton onClick={startGame}>Start Game</PixelButton>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Title>High Scores</Title>
          {leaderboard.length === 0 ? (
            <PixelText>No high scores yet!</PixelText>
          ) : (
            leaderboard.map((entry, index) => (
              <PixelText key={index}>
                {index + 1}. {entry.name} - £{entry.score.toFixed(2)}
              </PixelText>
            ))
          )}
        </div>
        {tips.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <CynicalTickerTape tips={tips} />
          </div>
        )}
      </GameContainer>
    );
  }

  // LOADING SCREEN
  if (isLoading) {
    return (
      <GameContainer>
        {renderBackButton()}
        <Title>Loading...</Title>
        <LoadingAnimation>Loading...</LoadingAnimation>
      </GameContainer>
    );
  }

  // END SCREEN: shows final stats, leaderboard, and prompt for a tip if the player's entry qualifies
  if (screen === "end") {
    // Find the current player's entry (match by name and score) that lacks a tip
    const playerEntry = leaderboard.find(
      (entry) => entry.name === playerName && entry.score === finalScore && !entry.tip
    );
    return (
      <GameContainer>
        {renderBackButton()}
        <Title>Game Over</Title>
        <PixelText>Well done, {playerName}!</PixelText>
        <PixelText>Your final net worth: £{netWorth.toFixed(2)}</PixelText>
        <PixelText>Liquid Assets: £{liquidAssets.toFixed(2)}</PixelText>
        {netWorth > 1000 ? (
          <PixelText>Congratulations! You crushed the market!</PixelText>
        ) : (
          <PixelText>Commiserations! The system always wins.</PixelText>
        )}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Title>High Scores</Title>
          {leaderboard.length === 0 ? (
            <PixelText>No high scores yet!</PixelText>
          ) : (
            leaderboard.map((entry, index) => (
              <PixelText key={index}>
                {index + 1}. {entry.name} - £{entry.score.toFixed(2)}
              </PixelText>
            ))
          )}
        </div>
        {playerEntry && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Title>Tips from the Stock Giants</Title>
            <PixelText>
              How did you do it? Give some advice for the poor:
            </PixelText>
            <input
              type="text"
              placeholder="Your cynical tip here..."
              value={playerTip}
              onChange={(e) => setPlayerTip(e.target.value)}
              style={{
                padding: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "none",
                background: "black",
                color: "white",
                marginBottom: "10px",
              }}
            />
            <PixelButton
              onClick={() => {
                if (playerTip.trim() !== "") {
                  // Update the player's leaderboard entry with their tip.
                  const updatedLeaderboard = leaderboard.map((entry) => {
                    if (
                      entry.name === playerName &&
                      entry.score === finalScore &&
                      !entry.tip
                    ) {
                      return { ...entry, tip: playerTip };
                    }
                    return entry;
                  });
                  setLeaderboard(updatedLeaderboard);
                  localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));
                  setPlayerTip("");
                }
              }}
            >
              Submit Tip
            </PixelButton>
          </div>
        )}
        <PixelButton onClick={() => window.location.reload()}>Play Again</PixelButton>
      </GameContainer>
    );
  }

  // GAME SCREEN: main gameplay area with liquidity buttons, stock graph, and stats.
  return (
    <GameContainer>
      {renderBackButton()}
      <Title>BUY LO SELL HI</Title>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        {/* Left Side: Liquidity Buttons */}
        <SidePanel>
          <LiquidityButton
            onClick={() => increaseLiquidity(100, "netflix")}
            disabled={disabledButtons.netflix}
            style={disabledButtons.netflix ? { backgroundColor: "red" } : {}}
          >
            Cancel Netflix Subscription (£100)
          </LiquidityButton>
          <LiquidityButton
            onClick={() => increaseLiquidity(500, "kidsFund")}
            disabled={disabledButtons.kidsFund}
            style={disabledButtons.kidsFund ? { backgroundColor: "red" } : {}}
          >
            Raid Kids' College Fund (£500)
          </LiquidityButton>
          <LiquidityButton
            onClick={() => increaseLiquidity(300, "remortgage")}
            disabled={disabledButtons.remortgage}
            style={disabledButtons.remortgage ? { backgroundColor: "red" } : {}}
          >
            Remortgage the House (£300)
          </LiquidityButton>
          <LiquidityButton
            onClick={() => increaseLiquidity(200, "pawnJewelry")}
            disabled={disabledButtons.pawnJewelry}
            style={disabledButtons.pawnJewelry ? { backgroundColor: "red" } : {}}
          >
            Pawn Sally's Jewelry (£200)
          </LiquidityButton>
          <LiquidityButton
            onClick={() => increaseLiquidity(50, "sellAntiques")}
            disabled={disabledButtons.sellAntiques}
            style={disabledButtons.sellAntiques ? { backgroundColor: "red" } : {}}
          >
            Sell Grandma's Antiques (£50)
          </LiquidityButton>
        </SidePanel>

        {/* Center: Stock Graph and Buy/Sell Buttons */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <GraphContainer>
            {/* Updated SVG: 400x400 (2x taller than before) */}
            <svg id="stockGraph" width="400" height="400"></svg>
          </GraphContainer>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <PixelButton
              onClick={handleBuy}
              disabled={liquidAssets < currentStockPrice}
              style={liquidAssets < currentStockPrice ? { backgroundColor: "red" } : {}}
            >
              Buy
            </PixelButton>
            <PixelButton
              onClick={handleSell}
              disabled={stockHoldings === 0}
              style={stockHoldings === 0 ? { backgroundColor: "red" } : {}}
            >
              Sell
            </PixelButton>
          </div>
        </div>

        {/* Right Side: Game Stats */}
        <SidePanel>
          <StatBox>
            <PixelText>Stock Price: £{currentStockPrice.toFixed(2)}</PixelText>
            <PixelText>Liquid Assets: £{liquidAssets.toFixed(2)}</PixelText>
            <PixelText>Stock Holdings: {stockHoldings}</PixelText>
            <PixelText>Net Worth: £{netWorth.toFixed(2)}</PixelText>
          </StatBox>
          <StatBox>
            <PixelText>Game Time: {gameTime} sec</PixelText>
            <PixelText>Event: {eventMessage}</PixelText>
          </StatBox>
        </SidePanel>
      </div>
    </GameContainer>
  );
};

export default GameWindow;
