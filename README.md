# sudoku-core

A TypeScript library for [Sudoku](https://en.wikipedia.org/wiki/Sudoku) logic; comprised of 3 modules: Board, Solver and Generator.

## Modules

- Board: handle board representation, moves and validation
- Solver: provide a back-tracking algorithm to solve sudoku, with a variant to 'show' the step-by-step process
- Generator: generate random, solvable sudoku of variable difficulty controlled by the quantity of initial clues
