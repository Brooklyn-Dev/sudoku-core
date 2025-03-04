import { SudokuError } from "./SudokuError";

export class SudokuBoardError extends SudokuError {
  constructor(message: string) {
    super(message);
    this.name = "SudokuBoardError";
  }
}
