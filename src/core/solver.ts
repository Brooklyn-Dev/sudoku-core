import { isValidMove } from "../utils/validators";
import { deepCopy2DArray } from "../utils/boardUtils";

class Solver {
  private board: number[][];
  private delay: number;

  /**
   * Constructor for Solver class.
   * @param {number[][]} board - Initial 2D board array.
   * @param {number} [delay=100] - Wait time between visualised solving steps (ms).
   */
  constructor(board: number[][], delay: number = 100) {
    this.board = deepCopy2DArray(board);
    this.delay = delay;
  }

  /**
   * Updates the delay used for step visualisation.
   * @param {number} newDelay - New delay in milliseconds.
   */
  setVisualisationDelay(newDelay: number): void {
    this.delay = newDelay;
  }

  /**
   * Waits for the pre-set delay duration before proceeding (used for visualisation).
   * @returns {Promise<void>} A promise that resolves after the delay.
   */
  private wait = (): Promise<boolean> => new Promise((res) => setTimeout(res, this.delay));

  /**
   * Solves the Sudoku puzzle using backtracking (fastest approach).
   * @returns A solved board if solvable, otherwise null.
   */
  solve(): number[][] | null {
    return this.backtrackSolve() ? this.board : null;
  }

  /**
   * Solves the Sudoku puzzle step-by-step for visualisation purposes.
   * @param callback - Function to visualise each step.
   * @returns A promise that resolves with a solved board or null.
   */
  async solveWithSteps(callback: (board: number[][]) => void): Promise<number[][] | null> {
    const success = await this.backtrackWithSteps(callback);
    return success ? this.board : null;
  }

  /**
   * Backtracking algorithm to solve the board as fast as possible.
   * @returns true if solved, false if unsolvable.
   */
  private backtrackSolve(): boolean {
    const emptyCell = this.findEmptyCell();
    if (!emptyCell) return true; // No empty cells, puzzle solved

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++)
      if (isValidMove(this.board, row, col, num)) {
        this.board[row][col] = num;

        if (this.backtrackSolve()) return true;
        this.board[row][col] = 0; // Undo move if not solvable
      }

    return false; // No valid number found, so backtrack
  }

  /**
   * Backtracking algorithm with a delay for visualisation.
   * @param callback - Function to visualize each step.
   * @returns A promise resolving to true if solved, false if unsolvable.
   */
  private async backtrackWithSteps(callback: (board: number[][]) => void): Promise<boolean> {
    const emptyCell = this.findEmptyCell();
    if (!emptyCell) return true;

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++)
      if (isValidMove(this.board, row, col, num)) {
        this.board[row][col] = num;
        callback(deepCopy2DArray(this.board)); // Update UI
        await this.wait(); // Delay for visualisation

        if (await this.backtrackWithSteps(callback)) return true;

        this.board[row][col] = 0;
        callback(deepCopy2DArray(this.board)); // Update UI after backtracking
        await this.wait();
      }

    return false;
  }

  /**
   * Finds the next empty cell (0) on the board.
   * @returns The row and column of an empty cell, or null if full.
   */
  private findEmptyCell(): [number, number] | null {
    for (let row = 0; row < 9; row++)
      for (let col = 0; col < 9; col++) if (this.board[row][col] === 0) return [row, col];
    return null;
  }
}

export default Solver;
