const fs = require('fs');
// ==========================================================
function dataToArr(strN) {
  const strFs = fs.readFileSync('sudoku-puzzles.txt', 'utf8');
  const strTarg = strFs.split('\n')[strN];
  const strMod = strTarg.replace(/-/g, '0');
  const arrInit = [];
  for (let i = 0; i < (strMod.length - 8); i += 9) {
    const board = [];
    for (let g = 0; g < 9; g += 1) {
      board.push(+strMod[i + g]);
    }
    arrInit.push(board);
  }
  return arrInit;
}
// ==========================================================
function getColumn(board, col) {
  const arrCol = [];
  for (let i = 0; i < 9; i += 1) {
    arrCol.push(board[i][col]);
  }
  return arrCol;
}
// ==========================================================
function getRow(board, row) {
  return board[row];
}
// ==========================================================
function getQuad(board, row, col) {
  const arrQuad = [];
  const rowKeys = (row < 3) ? [0, 1, 2] : (row < 6) ? [3, 4, 5] : [6, 7, 8];
  const colKeys = (col < 3) ? [0, 1, 2] : (col < 6) ? [3, 4, 5] : [6, 7, 8];

  for (let i = rowKeys[0]; i <= rowKeys[rowKeys.length - 1]; i += 1) {
    for (let g = colKeys[0]; g <= colKeys[colKeys.length - 1]; g += 1) {
      arrQuad.push(board[i][g]);
    }
  }
  return arrQuad;
}
// ==========================================================
function nextCell(board) {
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return 'all fielled';
}
// ==========================================================
function solve(board) {
  if (nextCell(board) === 'all fielled') {
    console.log('SUDOKU WAS SOLVED !!!!!!!!!!!!');
    return board;
  }
  const row = nextCell(board)[0];
  const col = nextCell(board)[1];

  for (let g = 1; g <= 9; g += 1) {
    if (!getColumn(board, col).includes(g)
    && !getRow(board, row).includes(g)
    && !getQuad(board, row, col).includes(g)) {
      board[row][col] = g;
      solve(board);
    }
  }

  if (nextCell(board) !== 'all fielled') {
    board[row][col] = 0;
  }

  return board;
}
// ==========================================================
console.table(solve(dataToArr(14)));
