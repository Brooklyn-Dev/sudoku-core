import {
  isValidCellValue,
  isValidCellIndex,
  isValidMove,
  isValidBoard,
} from "../src/utils/validators";

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

  it("should return true for a valid Sudoku board", () => {
    const validBoard = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];
    expect(isValidBoard(validBoard)).toBeTruthy();
  });

  it("should return false for an invalid Sudoku board", () => {
    const invalidBoard = [
      [5, 3, 3, 0, 7, 0, 0, 0, 0], // Duplicate 3
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ];
    expect(isValidBoard(invalidBoard)).toBeFalsy();
  });
});
