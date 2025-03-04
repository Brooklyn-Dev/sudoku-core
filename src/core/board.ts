import { SudokuBoardError } from "../errors/SudokuBoardError";
import { ERROR_MESSAGES } from "../utils/constants";

class Board {
  private board: number[][]; // Integers 1 to 9 for 'filled' cells, 0 for 'empty' cells
  private readonly initialCells: Set<string>; // Cell: '[row,col]'
  readonly size: number = 9;

  constructor(initialBoard?: number[][] | number[]) {
    if (initialBoard) {
      const validatedBoard = this.validateBoardStructure(initialBoard);
      this.validateBoardValues(validatedBoard);
      this.board = validatedBoard;
    } else {
      this.board = this.createEmptyBoard();
    }

    this.initialCells = this.getInitialCells(this.board);
  }

  private getInitialCells(initialBoard: number[][]): Set<string> {
    const cells = new Set<string>();
    for (let row = 0; row < 9; row++)
      for (let col = 0; col < 9; col++)
        if (initialBoard[row][col] !== 0) cells.add(JSON.stringify([row, col]));

    return cells;
  }

  private isInitialCell = (row: number, col: number): boolean =>
    this.initialCells.has(JSON.stringify([row, col]));

  private createEmptyBoard = (): number[][] => Array.from({ length: 9 }, () => Array(9).fill(0));

  private to1DArray = (board2D: number[][]): number[] => board2D.flat();

  private to2DArray = (board1D: number[]): number[][] =>
    Array.from({ length: 9 }, (_, row) => board1D.slice(row * 9, row * 9 + 9));

  private validateBoardStructure(board: number[][] | number[]): number[][] {
    // Convert 1D array to 2D array if necessary
    if (Array.isArray(board) && board.every((item) => typeof item === "number")) {
      if (board.length !== 81) throw new SudokuBoardError(ERROR_MESSAGES.BOARD.INVALID_FORMAT);

      board = this.to2DArray(board as number[]);
    }

    // Validate dimensions
    if (
      !Array.isArray(board) ||
      board.length !== 9 ||
      board.some((row) => !Array.isArray(row) || row.length !== 9)
    )
      throw new SudokuBoardError(ERROR_MESSAGES.BOARD.INVALID_FORMAT);

    return board as number[][];
  }

  private validateBoardValues(board: number[][]): void {
    for (let row = 0; row < 9; row++)
      for (let col = 0; col < 9; col++) this.validateCellValue(board[row][col]);
  }

  private isValidCellValue = (value: number): boolean =>
    Number.isInteger(value) && value >= 0 && value <= 9;

  private isValidCellIndex = (row: number, col: number): boolean =>
    row >= 0 && row < 9 && col >= 0 && col < 9;

  private validateCellValue(value: number): void {
    if (!this.isValidCellValue(value))
      throw new SudokuBoardError(
        ERROR_MESSAGES.BOARD.INVALID_CELL_VALUE.replace("%d", value.toString())
      );
  }

  private validateCellIndex(row: number, col: number): void {
    if (!this.isValidCellIndex(row, col))
      throw new SudokuBoardError(
        ERROR_MESSAGES.BOARD.INVALID_CELL_INDEX.replace("%d", col.toString()).replace(
          "%d",
          row.toString()
        )
      );
  }
}

export default Board;
