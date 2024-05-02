export function checkForWinningCombination(grid, betValue, winningLineCount) {
  let winningLines = [];
  let multiplier = 0;
  if (winningLineCount === 5) {
    winningLines = [
      [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
      [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1]],
      [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
      [[0, 0], [1, 1], [2, 2], [3, 1], [4, 0]],
      [[0, 2], [1, 1], [2, 0], [3, 1], [4, 2]],
    ];
  }
  const winningLineInfo = [];

  for (const line of winningLines) {
    const [x, y] = line[0];
    const firstItem = grid[y][x];
    let connected = 0;

    for (const [dx, dy] of line) {
      const symbol = grid[dy][dx];
      if (symbol !== firstItem) {
        break;
      }
      connected++;
    }
    if (connected === 3) multiplier += 1;
    if (connected === 4) multiplier += 3;
    if (connected === 5) multiplier += 10;

    if (connected >= 3) {
      winningLineInfo.push({ line, connected });
    }
  }

  console.log("Final multiplier: " + multiplier);
  return { totalMultiplier: betValue * multiplier, winningLines: winningLineInfo };
}
