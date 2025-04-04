/**
 * Checks if a given cell value is valid in Sudoku (0-9).
 * @param {number} value - The cell value to validate.
 * @returns {boolean} True if the value is between 0 and 9 (inclusive), false otherwise.
 */
export function isValidCellValue(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= 9;
}

/**
 * Checks if the given row and column indices are within the valid Sudoku board range (0-8).
 * @param {number} row - The row index.
 * @param {number} col - The column index.
 * @returns {boolean} True if both indices are within the valid range, false otherwise.
 */
export function isValidCellIndex(row: number, col: number): boolean {
  return row >= 0 && row < 9 && col >= 0 && col < 9;
}

/**
 * Determines if placing a value in a specific cell follows Sudoku rules.
 * @param {number[][]} board - A 9x9 Sudoku board.
 * @param {number} row - The row index of the cell.
 * @param {number} col - The column index of the cell.
 * @param {number} value - The value to be placed in the cell.
 * @returns {boolean} True if the move is valid, false otherwise.
 */
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

/**
 * Checks if the board is valid by verifying each row, column, and subgrid.
 * @param {number[][]} board - A 9x9 Sudoku board.
 * @returns {boolean} True if the board is valid, false otherwise.
 */
export function isValidBoard(board: number[][]): boolean {
  /**
   * Helper function to check if an array contains only unique numbers (ignore 0s).
   * @param {number[]} nums - Array of numbers to check.
   * @returns {boolean} True if unique, false otherwise.
   */
  function hasUniqueNumbers(nums: number[]): boolean {
    const seen = new Set<number>();
    for (const num of nums)
      if (num !== 0) {
        if (seen.has(num)) return false; // Duplicate found
        seen.add(num);
      }

    return true;
  }

  // Check rows and columns
  for (let i = 0; i < 9; i++) {
    const row = board[i];
    const column = board.map((row) => row[i]);

    if (!hasUniqueNumbers(row) || !hasUniqueNumbers(column)) return false;
  }

  // Check 3x3 subgrids
  for (let boxRow = 0; boxRow < 9; boxRow += 3)
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      const subgrid: number[] = [];

      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) subgrid.push(board[boxRow + i][boxCol + j]);

      if (!hasUniqueNumbers(subgrid)) return false;
    }

  return true;
}
