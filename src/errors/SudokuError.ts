export class SudokuError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SudokuError";
  }
}
