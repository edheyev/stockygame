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

const { webkitSpeechRecognition } = window;
const SpeechRecognition = webkitSpeechRecognition || window.SpeechRecognition;

const GameWindow = () => {
    // Repeat for other variables

    const [screen, setScreen] = useState("start"); // Tracks the current screen
    const [playerName, setPlayerName] = useState("Chad"); // Player's name
    const [liquidAssets, setLiquidAssets] = useState(1000); // Start with £1,000
    const [netWorth, setNetWorth] = useState(1000); // Net worth equals starting assets
    const [stockHoldings, setStockHoldings] = useState(0); // How many stocks user owns
    const [currentStockPrice, setCurrentStockPrice] = useState(100); // Initial stock price
    const [stockHistory, setStockHistory] = useState([100]); // Store stock price history
    const [gameTime, setGameTime] = useState(60); // 1-minute timer (in seconds)
    const [eventMessage, setEventMessage] = useState(""); // Store the event message
    const [debt, setDebt] = useState(0); // Debt that accumulates over time
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [finalScore, setFinalScore] = useState(0);
    const stockHoldingsRef = useRef(stockHoldings);

    // Disabled states for the liquidity buttons
    const [disabledButtons, setDisabledButtons] = useState({
        netflix: false,
        kidsFund: false,
        remortgage: false,
        pawnJewelry: false,
        sellAntiques: false,
    });
    const inflationRate = 0.01; // Inflation rate that increases debt

    // Handle input name and start the game
    const startGame = () => {
        if (playerName.trim() !== "") {
            setIsLoading(true); // Show loading screen
            setTimeout(() => {
                setIsLoading(false); // Remove loading screen after 3 seconds
                setScreen("game"); // Move to the game screen
            }, 3000);
        }
    };

    const increaseLiquidity = (amount, buttonKey) => {
        setLiquidAssets((prevAssets) => {
            const newAssets = prevAssets + amount;
            if (newAssets < 0) {
                setDebt((prevDebt) => prevDebt + Math.abs(newAssets));
                return 0; // Assets can't be negative
            }
            return newAssets;
        });

        // Disable the clicked button
        setDisabledButtons((prev) => ({
            ...prev,
            [buttonKey]: true,
        }));
    };

    const generateRandomStockPrice = () => {
        const newPrice = currentStockPrice + (Math.random() - 0.5) * 10; // Small random changes
        return Math.max(10, parseFloat(newPrice.toFixed(2))); // Keep price above £10
    };

    const updateStockPrice = () => {
        const newPrice = generateRandomStockPrice();
        setCurrentStockPrice(newPrice);
        setStockHistory((prev) => [...prev.slice(-20), newPrice]); // Keep last 20 values
    };

    const handleBuy = () => {
        if (liquidAssets >= currentStockPrice) {
            setStockHoldings((prevHoldings) => prevHoldings + 1); // Buy 1 stock
            setLiquidAssets((prevAssets) => prevAssets - currentStockPrice); // Deduct stock price from liquid assets
        } else {
            const amountNeeded = currentStockPrice - liquidAssets;
            setDebt((prevDebt) => prevDebt + amountNeeded); // Add the deficit to debt
            setLiquidAssets(0); // Liquid assets become 0 since all are spent
            setStockHoldings((prevHoldings) => prevHoldings + 1); // Buy 1 stock
        }
    };

    const handleSell = () => {
        console.log("handlesell1", stockHoldingsRef.current);

        if (stockHoldingsRef.current > 0) {
            console.log("handlesell");
            setStockHoldings((prevHoldings) => prevHoldings - 1); // Sell 1 stock
            setLiquidAssets((prevAssets) => prevAssets + currentStockPrice); // Add stock value to liquid assets
        }
    };

    // Update net worth whenever assets, debt, or stock price change
    useEffect(() => {
        setNetWorth(liquidAssets + stockHoldings * currentStockPrice - debt);
    }, [liquidAssets, stockHoldings, currentStockPrice, debt]);

    // Update stock price every second
    useEffect(() => {
        const interval = setInterval(updateStockPrice, 1000);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        stockHoldingsRef.current = stockHoldings;
    }, [stockHoldings]);
    // Save player data when the game ends
    useEffect(() => {
        if (screen === "end") {
            const calculatedFinalScore = netWorth;
            setFinalScore(calculatedFinalScore);
            savePlayerData(calculatedFinalScore);
        }
    }, [screen, netWorth]);

    useEffect(() => {
        if (screen === "game" && SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.start();

            recognition.onresult = (event) => {
                const lastResultIndex = event.results.length - 1;
                const command = event.results[lastResultIndex][0].transcript.trim().toLowerCase();
                console.log('Voice command received:', command);

                if (command.includes('buy') || command.includes('bye')) {
                    console.log("Buying")

                    handleBuy();
                } else if (command.includes('sell') || command.includes('cell')) {
                    console.log("SELLING")
                    handleSell();
                }
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
            };

            // Clean up the recognition when component unmounts or screen changes
            return () => {
                recognition.stop();
            };
        }
    }, [screen]); // Re-run when the screen changes


    // Game Timer Logic
    useEffect(() => {
        if (gameTime > 0) {
            const timeout = setTimeout(() => {
                setGameTime(gameTime - 1);
            }, 1000);
            return () => clearTimeout(timeout);
        } else if (screen === "game") {
            setScreen("end"); // Move to the end screen when time runs out
        }
    }, [gameTime, screen]);

    // Apply inflation to debt
    useEffect(() => {
        const inflationInterval = setInterval(() => {
            setDebt((prevDebt) => prevDebt * (1 + inflationRate));
        }, 5000); // Every 5 seconds
        return () => clearInterval(inflationInterval);
    }, [inflationRate]);

    // Generate random market events
    const generateRandomEvent = () => {
        const events = [
            { message: "Market crash! Stock prices plummet!", effect: () => setCurrentStockPrice((prev) => Math.max(10, prev * 0.7)) },
            { message: "Market boom! Stock prices soar!", effect: () => setCurrentStockPrice((prev) => prev * 1.3) },
            { message: "Tech giant announces new product!", effect: () => setCurrentStockPrice((prev) => prev * 1.1) },
            { message: "Economic slowdown!", effect: () => setCurrentStockPrice((prev) => Math.max(10, prev * 0.9)) },
            { message: "No significant events.", effect: () => { } },
        ];

        const randomEvent = events[Math.floor(Math.random() * events.length)];
        setEventMessage(randomEvent.message);
        randomEvent.effect();
    };

    useEffect(() => {
        const eventInterval = setInterval(generateRandomEvent, 10000); // Every 10 seconds
        return () => clearInterval(eventInterval);
    }, []);

    // End game if net worth drops below zero
    useEffect(() => {
        if (netWorth <= 0 && screen === "game") {
            setScreen("end");
        }
    }, [netWorth, screen]);

    // Render the stock price graph using D3
    useEffect(() => {
        const svg = d3.select("#stockGraph");
        svg.selectAll("*").remove(); // Clear previous graph

        const width = 400;
        const height = 200;
        const margin = { top: 20, right: 20, bottom: 20, left: 40 };

        const xScale = d3
            .scaleLinear()
            .domain([0, stockHistory.length - 1])
            .range([margin.left, width - margin.right]);

        const yScale = d3
            .scaleLinear()
            .domain([d3.min(stockHistory) - 5, d3.max(stockHistory) + 5])
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

    // Start Screen UI
    if (screen === "start") {
        return (
            <GameContainer>
                <Title>BUY LO SELL HI</Title>
                <div style={{ marginBottom: "20px", textAlign: "center" }}>
                    <PixelText>Objective: End with the highest net worth!</PixelText>
                    <PixelText>Instructions: Buy low, sell high, and watch out for market events!</PixelText>
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        style={{ padding: "10px", fontSize: "16px", borderRadius: "5px", border: "none", background: 'black', color: 'white' }}
                    />
                </div>
                <PixelButton onClick={startGame}>Start Game</PixelButton>
            </GameContainer>
        );
    }

    // Loading Screen UI
    if (isLoading) {
        return (
            <GameContainer>
                <Title>Loading...</Title>
                <LoadingAnimation>Loading...</LoadingAnimation>
            </GameContainer>
        );
    }

    // End Screen UI
    if (screen === "end") {
        return (
            <GameContainer>
                <Title>Game Over</Title>
                <PixelText>Well done, {playerName}!</PixelText>
                <PixelText>Your final net worth: £{netWorth.toFixed(2)}</PixelText>
                <PixelText>Liquid Assets: £{liquidAssets.toFixed(2)}</PixelText>
                <PixelText>Debt: £{debt.toFixed(2)}</PixelText>
                {netWorth > 1000 ? (
                    <PixelText>Congratulations! You crushed the market!</PixelText>
                ) : (
                    <PixelText>Commiserations! Better luck next time!</PixelText>
                )}
                {/* Optionally display leaderboard here */}
            </GameContainer>
        );
    }

    // Game Screen UI
    return (
        <GameContainer>
            <Title>BUY LO SELL HI</Title>

            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                {/* Left Side: Liquidity Buttons */}
                <SidePanel>
                    <LiquidityButton
                        onClick={() => increaseLiquidity(100, "netflix")}
                        disabled={disabledButtons.netflix}
                    >
                        Cancel Netflix Subscription (£100)
                    </LiquidityButton>
                    <LiquidityButton
                        onClick={() => increaseLiquidity(500, "kidsFund")}
                        disabled={disabledButtons.kidsFund}
                    >
                        Raid Kids' College Fund (£500)
                    </LiquidityButton>
                    <LiquidityButton
                        onClick={() => increaseLiquidity(300, "remortgage")}
                        disabled={disabledButtons.remortgage}
                    >
                        Remortgage the House (£300)
                    </LiquidityButton>
                    <LiquidityButton
                        onClick={() => increaseLiquidity(200, "pawnJewelry")}
                        disabled={disabledButtons.pawnJewelry}
                    >
                        Pawn Sally's Jewelry (£200)
                    </LiquidityButton>
                    <LiquidityButton
                        onClick={() => increaseLiquidity(50, "sellAntiques")}
                        disabled={disabledButtons.sellAntiques}
                    >
                        Sell Grandma's Antiques (£50)
                    </LiquidityButton>
                </SidePanel>

                {/* Center: Stock Graph and Buttons */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <GraphContainer>
                        <svg id="stockGraph" width="400" height="200"></svg>
                    </GraphContainer>

                    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                        <PixelButton onClick={handleBuy}>Buy</PixelButton>
                        <PixelButton onClick={handleSell}>Sell</PixelButton>
                    </div>
                </div>

                {/* Right Side: Stats */}
                <SidePanel>
                    <StatBox>
                        <PixelText>Stock Price: £{currentStockPrice}</PixelText>
                        <PixelText>Liquid Assets: £{liquidAssets.toFixed(2)}</PixelText>
                        <PixelText>Stock Holdings: {stockHoldings}</PixelText>
                        <PixelText>Net Worth: £{netWorth.toFixed(2)}</PixelText>
                        <PixelText>Debt: £{debt.toFixed(2)}</PixelText>
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
