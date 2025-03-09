import Board from "../src/core/board";
import { SudokuBoardError } from "../src/errors/SudokuBoardError";

describe("Board Class", () => {
  it("should create an empty board when no initial board is provided", () => {
    const board = new Board();
    expect(board.getBoard()).toEqual(Array.from({ length: 9 }, () => Array(9).fill(0)));
  });

  it("should initialise board with given values and extract initial cells", () => {
    const initialBoard = [
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

    const board = new Board(initialBoard);
    expect(board.getBoard()).toEqual(initialBoard);
    expect(board.getInitialCells().size).toBeGreaterThan(0);
  });

  it("should throw an error when modifying an initial cell", () => {
    const initialBoard = [
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

    const board = new Board(initialBoard);
    expect(() => board.setCell(0, 0, 2)).toThrow(SudokuBoardError);
  });

  it("should allow modifying non-initial cells", () => {
    const board = new Board();
    board.setCell(0, 0, 5);
    expect(board.getBoard()[0][0]).toBe(5);
  });

  it("should clone the board correctly", () => {
    const board = new Board();
    const clonedBoard = board.clone();
    expect(clonedBoard.getBoard()).toEqual(board.getBoard());
    expect(clonedBoard).not.toBe(board);
  });
});
