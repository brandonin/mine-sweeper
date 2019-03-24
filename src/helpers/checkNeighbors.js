export default function checkNeighbors(board, row, col) {
    return {
        top: row !== 0,
        left: col !== 0,
        bottom: row !== board.length - 1,
        right: col !== board[row].length - 1,
    }
}
