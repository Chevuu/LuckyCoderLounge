export function generateOneFullLineGrid(rows, columns, symbols, num) {
    const initialGrid = [];
  
    for (let i = 0; i < rows; i++) {
      const row = [];
      let crookedSymbol;
      let randomSymbol = symbols[0];
      
      // Define probabilities for the custom line specified by `num`
      const randomProbability = 0.20;
      const firstTwoSameProbability = 0.20;
      const firstThreeSameProbability = 0.20;
      const firstFourSameProbability = 0.20;
  
      for (let j = 0; j < columns; j++) {
        // Generate a random number between 0 and 1
        const random = Math.random();
        
        if (i === num - 1) {
          // Check the probability conditions for the custom line
          if (random < randomProbability) {
            // 25% chance for fully random symbol
            crookedSymbol = symbols[Math.floor(Math.random() * symbols.length)];
          } else if (random < randomProbability + firstTwoSameProbability) {
            // 25% chance for the first two symbols to be the same
            if (j < 2) {
              crookedSymbol = randomSymbol;
            } else {
              crookedSymbol = symbols[Math.floor(Math.random() * symbols.length)];
              randomSymbol = crookedSymbol;
            }
          } else if (random < randomProbability + firstTwoSameProbability + firstThreeSameProbability) {
            // 20% chance for the first three symbols to be the same
            if (j < 3) {
              crookedSymbol = randomSymbol;
            } else {
              crookedSymbol = symbols[Math.floor(Math.random() * symbols.length)];
              randomSymbol = crookedSymbol;
            }
          } else if (random < randomProbability + firstTwoSameProbability + firstThreeSameProbability + firstFourSameProbability) {
            // 15% chance for the first four symbols to be the same
            if (j < 4) {
              crookedSymbol = randomSymbol;
            } else {
              crookedSymbol = symbols[Math.floor(Math.random() * symbols.length)];
              randomSymbol = crookedSymbol;
            }
          } else {
            // 10% chance for all five symbols to be the same (same as before)
            crookedSymbol = randomSymbol;
          }
        } else {
          // For other rows, stay random
          crookedSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        }
  
        row.push(crookedSymbol);
      }
      initialGrid.push(row);
    }
  
    return initialGrid;
  }
  

  export function generateInitialGrid(rows, columns, symbols) {
    const initialGrid = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        const randomSymbol =
          symbols[Math.floor(Math.random() * symbols.length)];
        row.push(randomSymbol);
      }
      initialGrid.push(row);
    }

    return initialGrid;
  }