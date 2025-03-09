import { SudokuBoardError } from "../errors/SudokuBoardError";
import { ERROR_MESSAGES } from "../utils/constants";
import { isValidCellIndex, isValidCellValue, isValidMove } from "./validators";

/**
 * Extracts the initial (non-zero) cells from a Sudoku board.
 * @param {number[][]} board - A 9x9 Sudoku board.
 * @returns {Set<string>} A set of stringified coordinates of initial cells.
 */
export function extractInitialCells(board: number[][]): Set<string> {
  const cells = new Set<string>();
  for (let row = 0; row < 9; row++)
    for (let col = 0; col < 9; col++)
      if (board[row][col] !== 0) cells.add(JSON.stringify([row, col]));

  return cells;
}

/**
 * Creates an empty 9x9 Sudoku board filled with zeros.
 * @returns {number[][]} A 9x9 array initialised with zeros.
 */
export function createEmptyBoard(): number[][] {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

/**
 * Converts a 2D Sudoku board into a 1D array.
 * @param {number[][]} board2D - A 9x9 Sudoku board.
 * @returns {number[]} A 1D array representation of the board.
 */
export function to1DArray(board2D: number[][]): number[] {
  return board2D.flat();
}

/**
 * Converts a 1D array into a 2D 9x9 Sudoku board.
 * @param {number[]} board1D - A 1D array of length 81.
 * @returns {number[][]} A 9x9 2D array representation of the board.
 */
export function to2DArray(board1D: number[]): number[][] {
  return Array.from({ length: 9 }, (_, row) => board1D.slice(row * 9, row * 9 + 9));
}

/**
 * Creates a deep copy of a 1D Sudoku board array.
 * @param {number[]} board1D - A 1D array of length 81.
 * @returns {number[]} A deep copy of the input array.
 */
export function deepCopy1DArray(board1D: number[]): number[] {
  return board1D.map((row) => row);
}

/**
 * Creates a deep copy of a 2D Sudoku board.
 * @param {number[][]} board2D - A 9x9 Sudoku board.
 * @returns {number[][]} A deep copy of the input 2D array.
 */
export function deepCopy2DArray(board2D: number[][]): number[][] {
  return board2D.map((row) => [...row]);
}

/**
 * Checks if a Sudoku board is completely filled.
 * @param {number[][]} board - A 9x9 Sudoku board.
 * @returns {boolean} True if all cells are filled, false otherwise.
 */
export function isBoardFull(board: number[][]): boolean {
  return board.every((row) => row.every((cell) => cell !== 0));
}

/**
 * Checks if a Sudoku board is correctly solved.
 * @param {number[][]} board - A 9x9 Sudoku board.
 * @returns {boolean} True if solved, false otherwise.
 */
export function isSolvedBoard(board: number[][]): boolean {
  if (!Array.isArray(board) || board.length !== 9 || board.some((row) => row.length !== 9))
    return false;

  for (let row = 0; row < 9; row++)
    for (let col = 0; col < 9; col++) {
      const value = board[row][col];
      if (value === 0) return false;

      board[row][col] = 0;

      if (!isValidMove(board, row, col, value)) {
        board[row][col] = value;
        return false;
      }

      board[row][col] = value;
    }

  return true;
}

/**
 * Validates a cell value (should be between 0 and 9).
 * @param {number} value - The value to validate.
 * @throws {SudokuBoardError} If the value is invalid.
 */
export function validateCellValue(value: number): void {
  if (!isValidCellValue(value))
    throw new SudokuBoardError(
      ERROR_MESSAGES.BOARD.INVALID_CELL_VALUE.replace("%d", value.toString())
    );
}

/**
 * Validates a cell index (row and column should be between 0 and 8).
 * @param {number} row - The row index.
 * @param {number} col - The column index.
 * @throws {SudokuBoardError} If the index is invalid.
 */
export function validateCellIndex(row: number, col: number): void {
  if (!isValidCellIndex(row, col))
    throw new SudokuBoardError(
      ERROR_MESSAGES.BOARD.INVALID_CELL_INDEX.replace("%d", col.toString()).replace(
        "%d",
        row.toString()
      )
    );
}

/**
 * Validates the structure of a Sudoku board and converts a 1D array input into a 2D array
 * @param {number[][] | number[]} board - The board to validate.
 * @returns {number[][]} A properly structured 9x9 board.
 * @throws {SudokuBoardError} If the structure is invalid.
 */
export function validateBoardStructure(board: number[][] | number[]): number[][] {
  // Convert 1D array to 2D array if necessary
  if (Array.isArray(board) && board.every((item) => typeof item === "number")) {
    if (board.length !== 81) throw new SudokuBoardError(ERROR_MESSAGES.BOARD.INVALID_FORMAT);
    board = to2DArray(board as number[]);
  }

  // Validate dimensions
  if (
    !Array.isArray(board) ||
    board.length !== 9 ||
    board.some((row) => !Array.isArray(row) || row.length !== 9)
  ) {
    throw new SudokuBoardError(ERROR_MESSAGES.BOARD.INVALID_FORMAT);
  }

  return board as number[][];
}

/**
 * Validates all cell values in a Sudoku board.
 * @param {number[][]} board - A 9x9 Sudoku board.
 * @throws {SudokuBoardError} If any cell value is invalid.
 */
export function validateBoardValues(board: number[][]): void {
  for (let row = 0; row < 9; row++)
    for (let col = 0; col < 9; col++) validateCellValue(board[row][col]);
}
