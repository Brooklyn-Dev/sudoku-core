export const ERROR_MESSAGES = {
  BOARD: {
    INVALID_FORMAT: "Invalid board format. Must be a 9x9 2D array or 1D array of length 81.",
    INVALID_CELL_VALUE: "Invalid value (%d). Must be an integer between 0 and 9 inclusive.",
    INVALID_CELL_INDEX:
      "Invalid cell index (%d, %d). Must be two integers between 0 and 8 inclusive.",
    ILLEGAL_BOARD: "Illegal board state that violates Sudoku rules.",
  },
};
