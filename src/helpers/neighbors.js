export function schema(board, row, col) {
    return {
        top: row !== 0,
        left: col !== 0,
        bottom: row !== board.length - 1,
        right: col !== board[row].length - 1,
    }
}

export function isNeighbor(row, col, randomRow, randomCol) {
    return (
        (randomRow === row && randomCol === col) ||              // center
        (randomRow === row - 1 && randomCol === col - 1) ||      // topLeft
        (randomRow === row - 1 && randomCol === col) ||          // top
        (randomRow === row - 1 && randomCol === col + 1) ||      // topRight
        (randomRow === row && randomCol === col + 1) ||          // right
        (randomRow === row && randomCol === col - 1) ||          // left
        (randomRow === row + 1 && randomCol === col - 1) ||      // bottomLeft
        (randomRow === row + 1 && randomCol === col) ||          // bottom
        (randomRow === row + 1 && randomCol === col + 1)         // bottomRight
    )
}


/*

Move to a features file if production
0 [0,1,2,3,4,5,6,7,8]
1 [0,1,2,3,4,5,6,7,8]
2 [0,1,2,3,4,5,6,7,8]
3 [0,1,2,3,4,5,6,7,8]
4 [0,1,2,3,4,5,6,7,8]
5 [0,1,2,3,4,5,6,7,8]
6 [0,1,2,3,4,5,6,7,8]
7 [0,1,2,3,4,5,6,7,8]
8 [0,1,2,3,4,5,6,7,8]

[5,5]

cannot have:
center      [5,5]
topLeft     [4,4]
top         [4,5]
topRight    [4,6]
right       [5,6]
left        [5,4]
bottomLeft  [6,4]
bottom      [6,5]
bottomRight [6,6]
*/
