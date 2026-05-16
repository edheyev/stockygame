import styled, { keyframes } from "styled-components";
import '../app/vaporwave.css';
import '../app/globals.css';
// Container for the game window
export const GameContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  min-height: 0;
  background-color: #111;
  color: #fff;
  font-family: 'Press Start 2P', sans-serif; /* Pixelated font */
  overflow: hidden;
  padding: clamp(52px, 7vh, 72px) clamp(10px, 1.4vw, 16px) clamp(10px, 1.6vh, 16px);
  box-sizing: border-box;
`;

// Title for the game
export const Title = styled.h1`
  font-size: clamp(1.1rem, 2.3vw, 1.9rem);
  text-align: center;
  margin: 0 0 clamp(8px, 1.2vh, 12px);
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #32cd32;
  line-height: 1.15;
`;

// Styled pixelated buttons
export const PixelButton = styled.button`
  background-color: #008080;
  border: 2px solid #fff;
  color: #fff;
  padding: clamp(6px, 0.9vh, 10px) clamp(10px, 1.2vw, 18px);
  margin: 8px;
  font-size: clamp(0.62rem, 0.95vw, 1rem);
  cursor: pointer;
  text-transform: uppercase;
  font-family: 'Press Start 2P', sans-serif;
  transition: all 0.1s ease-in-out;
  box-shadow: 4px 4px 0px #000;
  line-height: 1.25;
  
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
  margin: clamp(6px, 0.8vh, 10px) 0;
  font-size: clamp(0.65rem, 0.95vw, 0.92rem);
  color: #32cd32;
  line-height: 1.35;
  text-align: center;
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
  width: min(100%, 54vh);
  max-width: 520px;
  max-height: min(54vh, 100%);
  flex: 1 1 auto;
  aspect-ratio: 1 / 1;
  min-height: 0;
  border: 2px solid limegreen;
  margin-bottom: 0;
  background-color: #222;
  overflow: hidden;
`;

// Side panel for liquidity buttons and stats
export const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #333;
  padding: clamp(8px, 1vh, 12px);
  border-radius: 10px;
  box-sizing: border-box;
  gap: clamp(6px, 0.8vh, 10px);
  min-height: 0;
  overflow: hidden;
`;

// Liquidity buttons for gaining assets
export const LiquidityButton = styled(PixelButton)`
  width: 100%;
  margin: 0;
`;

// Stat box for showing current stats
export const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid limegreen;
  padding: clamp(8px, 1vh, 12px);
  width: 100%;
  background-color: #333;
  box-sizing: border-box;
  gap: 4px;
`;
