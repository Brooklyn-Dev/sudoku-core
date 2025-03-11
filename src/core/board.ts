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
  private board: number[][]; // 9x9 board with values 1-9, or 0 empty cells
  private readonly initialCells: Set<string>; // Cells initially present on the board
  readonly size: number = 9;

  /**
   * Constructor for Board class.
   * @param {number[][] | number[] | undefined} initialBoard - Optional 2D or 1D array to initialise the board.
   */
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

  /**
   * Gets the board state as a 2D array.
   * @returns {Board} A read-only view of the board.
   */
  getBoard = (): ReadonlyArray<ReadonlyArray<number>> => this.board;

  /**
   * Gets the set of initial cells
   * @returns {Board} A read-only set of initial cells.
   */
  getInitialCells = (): ReadonlySet<string> => this.initialCells;

  /**
   * Checks if a given cell is an initial cell.
   * @param {number} row - Row index.
   * @param {number} col - Column index.
   * @returns {boolean} Boolean indicating if the cell is an initial cell.
   */
  isInitialCell = (row: number, col: number): boolean =>
    this.initialCells.has(JSON.stringify([row, col]));

  /**
   * Sets a value at a given position in the board.
   * @param {number} row - Row index.
   * @param {number} col - Column index.
   * @param {number} value - The number (0-9) to be placed.
   * @throws {SudokuBoardError} If the cell is initial or input is invalid.
   */
  setCell(row: number, col: number, value: number): void {
    validateCellIndex(row, col);
    validateCellValue(value);

    if (this.initialCells.has(JSON.stringify([row, col])))
      throw new SudokuBoardError("Cannot modify an initial board value.");

    this.board[row][col] = value;
  }

  /**
   * Clones the board instance using deepCopy.
   * @returns {Board} A copy of the board instance.
   */
  clone = (): Board => new Board(deepCopy2DArray(this.board));
}

export default Board;
