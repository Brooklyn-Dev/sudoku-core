export function isValidCellValue(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= 9;
}

export function isValidCellIndex(row: number, col: number): boolean {
  return row >= 0 && row < 9 && col >= 0 && col < 9;
}

export function isValidMove(board: number[][], row: number, col: number, value: number): boolean {
  if (!isValidCellIndex(row, col) || !isValidCellValue(value)) return false;

  // Check rows
  if (board[row].includes(value)) return false;

  // Check columns
  if (board.some((r) => r[col] === value)) return false;

  // Check 3x3 sub-grids
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 3; c++) if (board[startRow + r][startCol + c] === value) return false;

  return true;
}
