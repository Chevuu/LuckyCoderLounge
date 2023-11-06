import React, { useState } from "react";
import "../styles/SlotMachine.css";
import { checkForWinningCombination } from "../machine-logic/SlotMachineLogic";
import { generateInitialGrid, generateOneFullLineGrid } from "../machine-logic/GridGeneration";

function SlotMachinePage() {
  const symbols = Array.from({ length: 9 }, (_, i) => `img${i + 1}.png`);
  const rows = 3;
  const columns = 5;

  const [grid, setGrid] = useState(generateInitialGrid(rows, columns, symbols));
  const [isSpinning, setIsSpinning] = useState(false);
  const [coinCount, setCoinCount] = useState(0);
  const [winningSlots, setWinningSlots] = useState([]);
  const [betValue, setBetValue] = useState(20);

  const isWinningSlot = (rowIndex, columnIndex) => {
    if (!isSpinning) {
      for (const winningSlot of winningSlots) {
        for (const [x, y] of winningSlot.slots) {
          if (
            x === rowIndex &&
            y === columnIndex &&
            y < winningSlot.multiplier
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const spinColumns = () => {
    if (!isSpinning) {
      setIsSpinning(true);

      const shuffleDuration = 3000; // Duration for shuffling
      const shuffleInterval = 100; // Interval for changing symbols
      const totalIntervals = shuffleDuration / shuffleInterval;

      // Keep track of how many intervals have completed
      let intervalsCompleted = 0;

      for (let interval = 0; interval < totalIntervals; interval++) {
        // eslint-disable-next-line
        setTimeout(() => {
          const newGrid = generateOneFullLineGrid(
            rows,
            columns,
            symbols,
            Math.floor(Math.random() * 3)
          );
          setGrid(newGrid);

          // Increment the completed intervals count
          intervalsCompleted++;

          // If all intervals have completed, log the grid and check for winnings
          if (intervalsCompleted === totalIntervals) {
            setIsSpinning(false);
            setGrid(newGrid);

            // Check for winnings and update user data
            const result = checkForWinningCombination(
              newGrid,
              betValue
            );
            const prize = result.totalMultiplier;
            const updatedCoinCount = coinCount + prize - betValue;
            setCoinCount(updatedCoinCount);

            // Extract winning slots information from the result and set them in state
            const winningSlotsInfo = result.winningLines.map((line) => {
              const slots = line.line.map(([y, x]) => {
                console.log("Slot Coordinates: x =", x, "y =", y);
                console.log("Connected: " + line.connected);
                return [x, y];
              });
              return { slots, multiplier: line.connected };
            });
            setWinningSlots(winningSlotsInfo);
          }
        }, interval * shuffleInterval);
      }
    }
  };

  return (
    <div className="slot-machine">
      <h1>
        <span role="img" aria-label="coin" className="coin-count">
          🪙 {coinCount}
        </span>
      </h1>
      <div className="options">
        <div className="bet-option">
          <label htmlFor="betValue">Bet Value:</label>
          <select
            id="betValue"
            value={betValue}
            onChange={(e) => setBetValue(parseInt(e.target.value))}
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
            <option value={2000}>2000</option>
            <option value={5000}>5000</option>
          </select>
        </div>
      </div>
      <div className={`machine ${isSpinning ? "spin" : ""}`}>
        {grid[0].map((_, columnIndex) => (
          <div key={columnIndex} className="column">
            {grid.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`symbol ${
                  isWinningSlot(rowIndex, columnIndex) ? "winning-slot" : ""
                }`}
              >
                <img
                  src={`/slot-images/fruits/cropped/${row[columnIndex]}`}
                  alt="Symbol"
                  width="160"
                  height="165"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="spin-button" onClick={spinColumns}>
        {isSpinning ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
}

export default SlotMachinePage;
