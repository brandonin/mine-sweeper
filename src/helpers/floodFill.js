import checkNeighbors from './checkNeighbors';

export default function FloodFill(board, row, col) {
    dfs(board, row, col);
    // return board;
}

function dfs(board, row, col) {
    if (board[row][col]['visible']) return;
    board[row][col]['visible'] = true;
    if (board[row][col]['value'] !== null) return;
    const {top, left, bottom, right} = checkNeighbors(board, row, col);
    if (top) dfs(board, row - 1, col);
    if (left) dfs(board, row, col - 1);
    if (bottom) dfs(board, row + 1, col);
    if (right) dfs(board, row, col + 1);
    if (top && left) dfs(board, row - 1, col - 1);
    if (top && right) dfs(board, row - 1, col + 1);
    if (bottom && left) dfs(board, row + 1, col - 1);
    if (bottom && right) dfs(board, row + 1, col + 1);
}

/*
const board = [
    [{visible: false, value:null}, {visible: false, value:1},    {visible: false, value:1},      {visible: false, value:1}],
    [{visible: false, value:null}, {visible: false, value:1},    {visible: false, value:'bomb'}, {visible: false, value:1}],
    [{visible: false, value:null}, {visible: false, value:1},    {visible: false, value:1},      {visible: false, value:1}],
    [{visible: false, value:null}, {visible: false, value:null}, {visible: false, value:null},   {visible: false, value:null}],
]
const row = 1;
const col = 0;

FloodFill(board, row, col);
*/
