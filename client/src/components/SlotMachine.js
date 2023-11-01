import React, { useState, useEffect } from 'react';
import '../styles/SlotMachine.css';

function SlotMachinePage() {
  const symbols = Array.from({ length: 9 }, (_, i) => `img${i + 1}.png`);
  const rows = 3; // Number of rows
  const columns = 5; // Number of columns

  const [grid, setGrid] = useState(generateInitialGrid());
  const [isSpinning, setIsSpinning] = useState(false);

  function generateInitialGrid() {
    const initialGrid = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        row.push(randomSymbol);
      }
      initialGrid.push(row);
    }

    return initialGrid;
  }

  const spinColumns = () => {
    if (!isSpinning) {
      setIsSpinning(true);

      const shuffleDuration = 3000; // Duration for shuffling
      const shuffleInterval = 100; // Interval for changing symbols
      const totalIntervals = shuffleDuration / shuffleInterval;

      for (let interval = 0; interval < totalIntervals; interval++) {
        setTimeout(() => {
          setGrid(generateInitialGrid());
        }, interval * shuffleInterval);
      }

      setTimeout(() => {
        setIsSpinning(false);
      }, shuffleDuration);
    }
  };

  useEffect(() => {
    document.title = 'Slot Machine';
  }, []);

  return (
    <div className="slot-machine">
      <h1>Slot Machine</h1>
      <div className={`machine ${isSpinning ? 'spin' : ''}`}>
        {grid[0].map((_, columnIndex) => (
          <div key={columnIndex} className="column">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="symbol">
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
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
    </div>
  );
}

export default SlotMachinePage;
