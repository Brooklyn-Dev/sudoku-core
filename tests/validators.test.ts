import { isValidCellValue, isValidCellIndex, isValidMove } from "../src/utils/validators";

describe("Validators", () => {
  it("should validate correct cell values", () => {
    expect(isValidCellValue(5)).toBeTruthy();
    expect(isValidCellValue(0)).toBeTruthy();
  });

  it("should invalidate incorrect cell values", () => {
    expect(isValidCellValue(-1)).toBeFalsy();
    expect(isValidCellValue(10)).toBeFalsy();
  });

  it("should validate correct cell indices", () => {
    expect(isValidCellIndex(0, 0)).toBeTruthy();
    expect(isValidCellIndex(8, 8)).toBeTruthy();
  });

  it("should invalidate incorrect cell indices", () => {
    expect(isValidCellIndex(-1, 0)).toBeFalsy();
    expect(isValidCellIndex(9, 9)).toBeFalsy();
  });

  it("should validate legal Sudoku moves", () => {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    expect(isValidMove(board, 0, 0, 5)).toBeTruthy();
  });

  it("should invalidate illegal Sudoku moves", () => {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    board[0][1] = 5;
    expect(isValidMove(board, 0, 0, 5)).toBeFalsy();
  });
});
