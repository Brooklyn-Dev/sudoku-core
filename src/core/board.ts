import { SudokuBoardError } from "../errors/SudokuBoardError";
import {
  createEmptyBoard,
  deepCopy2DArray,
  extractInitialCells,
  validateBoardStructure,
  validateBoardValues,
  validateCellIndex,
  validateCellValue,
} from "../utils/boardUtils";

class Board {
  private board: number[][]; // Integers 1 to 9 for 'filled' cells, 0 for 'empty' cells
  private readonly initialCells: Set<string>; // Cell: '[row,col]'
  readonly size: number = 9;

  constructor(initialBoard?: number[][] | number[]) {
    if (initialBoard) {
      const validatedBoard = validateBoardStructure(initialBoard);
      validateBoardValues(validatedBoard);
      this.board = validatedBoard;
    } else {
      this.board = createEmptyBoard();
    }

    this.initialCells = extractInitialCells(this.board);
  }

  getInitialCells = (): ReadonlySet<string> => this.initialCells;

  isInitialCell = (row: number, col: number): boolean =>
    this.initialCells.has(JSON.stringify([row, col]));

  getBoard = (): ReadonlyArray<ReadonlyArray<number>> => this.board;

  setCell(row: number, col: number, value: number): void {
    validateCellIndex(row, col);
    validateCellValue(value);

    if (this.initialCells.has(JSON.stringify([row, col])))
      throw new SudokuBoardError("Cannot modify an initial board value.");

    this.board[row][col] = value;
  }

  clone = (): Board => new Board(deepCopy2DArray(this.board));
}

export default Board;
