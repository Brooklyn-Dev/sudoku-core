import Solver from "../src/core/solver";
import { SudokuBoardError } from "../src/errors/SudokuBoardError";

describe("Solver", () => {
  const solvableBoard: number[][] = [
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

  const solvedBoard: number[][] = [
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

  const unsolvableBoard: number[][] = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 8], // Duplicate 8
  ];

  it("should solve a valid Sudoku puzzle", () => {
    const solver = new Solver(solvableBoard);
    const result = solver.solve();
    expect(result).toEqual(solvedBoard);
  });

  it("should throw an error for an unsolvable puzzle", () => {
    expect(() => {
      new Solver(unsolvableBoard);
    }).toThrow(SudokuBoardError);
  });

  it("should handle an already solved board correctly", () => {
    const solver = new Solver(solvedBoard);
    const result = solver.solve();
    expect(result).toEqual(solvedBoard);
  });

  it("should call the solveWithSteps callback function at each step", async () => {
    const solver = new Solver(solvableBoard, 0);
    const callback = jest.fn();

    jest.spyOn(solver as any, "wait").mockResolvedValue(true);

    await solver.solveWithSteps(callback);

    expect(callback).toHaveBeenCalled();
  });

  it("should call setVisualisationDelay and correctly update delay time", () => {
    const solver = new Solver(solvableBoard, 200);
    solver.setVisualisationDelay(500);
    expect(solver["delay"]).toBe(500);
  });
});
