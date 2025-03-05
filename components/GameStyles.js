import styled, { keyframes } from "styled-components";
import '../app/vaporwave.css';
import '../app/globals.css';
// Container for the game window
export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #111;
  color: #fff;
  font-family: 'Press Start 2P', sans-serif; /* Pixelated font */
  overflow: hidden;
`;

// Title for the game
export const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #32cd32;
`;

// Styled pixelated buttons
export const PixelButton = styled.button`
  background-color: #008080;
  border: 2px solid #fff;
  color: #fff;
  padding: 10px 20px;
  margin: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  text-transform: uppercase;
  font-family: 'Press Start 2P', sans-serif;
  transition: all 0.1s ease-in-out;
  box-shadow: 4px 4px 0px #000;
  
  &:hover {
    background-color: #32cd32;
    box-shadow: 2px 2px 0px #000;
  }

  &:active {
    box-shadow: 1px 1px 0px #000;
  }
`;

// Pixelated text for messages
export const PixelText = styled.p`
  margin-left: 40px;
  font-size: 1.2rem;
  color: #32cd32;
  margin-top: 10px;
`;

// Loading animation for the intro
const pixelBlink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

export const LoadingAnimation = styled.div`
  font-size: 1.2rem;
  color: #ff4500;
  margin-bottom: 10px;
  animation: ${pixelBlink} 1s infinite;
`;

// Graph container
export const GraphContainer = styled.div`
  width: 100%;
  max-width: 900px;
  height: 200px;
  border: 2px solid limegreen;
  margin-bottom: 10px;
  background-color: #222;
`;

// Side panel for liquidity buttons and stats
export const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  background-color: #333;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
`;

// Liquidity buttons for gaining assets
export const LiquidityButton = styled(PixelButton)`
  width: 90%;
  margin-bottom: 5px;
`;

// Stat box for showing current stats
export const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid limegreen;
  padding: 10px;
  width: 100%;
  background-color: #333;
`;
