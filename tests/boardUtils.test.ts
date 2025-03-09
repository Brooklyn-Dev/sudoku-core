import {
  extractInitialCells,
  createEmptyBoard,
  to1DArray,
  to2DArray,
  deepCopy1DArray,
  deepCopy2DArray,
  isBoardFull,
  isSolvedBoard,
} from "../src/utils/boardUtils";

describe("Board Utils", () => {
  it("should extract initial cells correctly", () => {
    const board = [
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
    const initialCells = extractInitialCells(board);
    expect(initialCells.size).toBeGreaterThan(0);
    expect(initialCells.has(JSON.stringify([0, 0]))).toBe(true);
    expect(initialCells.has(JSON.stringify([2, 2]))).toBe(true);
  });

  it("should create an empty board", () => {
    const board = createEmptyBoard();
    expect(board.length).toBe(9);
    expect(board.every((row) => row.length === 9 && row.every((cell) => cell === 0))).toBe(true);
  });

  it("should correctly convert 2D board to 1D array", () => {
    const board = createEmptyBoard();
    const board1D = to1DArray(board);
    expect(board1D.length).toBe(81);
    expect(board1D.every((cell) => cell === 0)).toBe(true);
  });

  it("should correctly convert 1D array to 2D board", () => {
    const board1D = Array(81).fill(0);
    const board2D = to2DArray(board1D);
    expect(board2D.length).toBe(9);
    expect(board2D.every((row) => row.length === 9)).toBe(true);
  });

  it("should deeply copy a 1D array", () => {
    const board1D = [1, 2, 3, 4, 5];
    const copy = deepCopy1DArray(board1D);
    expect(copy).toEqual(board1D);
    expect(copy).not.toBe(board1D);
  });

  it("should deeply copy a 2D array", () => {
    const board2D = createEmptyBoard();
    const copy = deepCopy2DArray(board2D);
    expect(copy).toEqual(board2D);
    expect(copy).not.toBe(board2D);
  });

  it("should detect a full board", () => {
    const board = Array.from({ length: 9 }, () => Array(9).fill(1));
    expect(isBoardFull(board)).toBe(true);
  });

  it("should detect an incomplete board", () => {
    const board = createEmptyBoard();
    expect(isBoardFull(board)).toBe(false);
  });

  it("should detect a solved board", () => {
    const solvedBoard = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];
    expect(isSolvedBoard(solvedBoard)).toBe(true);
  });

  it("should detect an unsolved board", () => {
    const board = createEmptyBoard();
    expect(isSolvedBoard(board)).toBe(false);
  });
});
