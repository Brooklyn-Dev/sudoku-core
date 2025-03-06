import { SudokuBoardError } from "../errors/SudokuBoardError";
import { ERROR_MESSAGES } from "../utils/constants";
import { isValidCellIndex, isValidCellValue, isValidMove } from "./validators";

export function extractInitialCells(board: number[][]): Set<string> {
  const cells = new Set<string>();
  for (let row = 0; row < 9; row++)
    for (let col = 0; col < 9; col++)
      if (board[row][col] !== 0) cells.add(JSON.stringify([row, col]));

  return cells;
}

export function createEmptyBoard(): number[][] {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

export function to1DArray(board2D: number[][]): number[] {
  return board2D.flat();
}

export function to2DArray(board1D: number[]): number[][] {
  return Array.from({ length: 9 }, (_, row) => board1D.slice(row * 9, row * 9 + 9));
}

export function deepCopy1DArray(board1D: number[]): number[] {
  return board1D.map((row) => row);
}

export function deepCopy2DArray(board2D: number[][]): number[][] {
  return board2D.map((row) => [...row]);
}

export function isBoardFull(board: number[][]): boolean {
  return board.every((row) => row.every((cell) => cell !== 0));
}

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

export function validateCellValue(value: number): void {
  if (isValidCellValue(value))
    throw new SudokuBoardError(
      ERROR_MESSAGES.BOARD.INVALID_CELL_VALUE.replace("%d", value.toString())
    );
}

export function validateCellIndex(row: number, col: number): void {
  if (isValidCellIndex(row, col))
    throw new SudokuBoardError(
      ERROR_MESSAGES.BOARD.INVALID_CELL_INDEX.replace("%d", col.toString()).replace(
        "%d",
        row.toString()
      )
    );
}

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

export function validateBoardValues(board: number[][]): void {
  for (let row = 0; row < 9; row++)
    for (let col = 0; col < 9; col++) validateCellValue(board[row][col]);
}
