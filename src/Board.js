import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
// import
import './App.css';
import Square from './Square';

class Board extends Component {
    state = {
        board: this.generateBoard(),
    }

    generateBoard() {
        const { height, width, mines} = this.props;
        let minesArray = [];

        let board =  new Array(height).fill().map((_, rowKey) => Array(width).fill().map((_, colKey) => {
            return {
                visible: false,
                value: null
            };
        }))

        while (minesArray.length < mines) {
            const randomRow = Math.floor(Math.random() * height);
            const randomCol = Math.floor(Math.random() * width);

            if (board[randomRow][randomCol]['value'] !== "bomb") {
                minesArray.push(0);
                board[randomRow][randomCol]['value'] = 'bomb';
                this.generateNeighbors(board, randomRow, randomCol);
            }
            // if (!minesArray.includes({randomRow , randomCol})) minesArray.push({randomRow, randomCol});

        }
        return board;
        // minesArray.includes(rowKey * 8 + colKey) ? 'bomb' :
    }

    generateNeighbors(board, row, col) {
        // make edge cases;
        const top = row !== 0,
                bottom = row !== board.length - 1,
                left = col !== 0,
                right = col !== board[row].length - 1;

        if (top) board[row - 1][col]['value'] += 1;
        if (left) board[row][col - 1]['value'] += 1;
        if (bottom) board[row + 1][col]['value'] += 1;
        if (right) board[row][col + 1]['value'] += 1;
        if (top && left) board[row - 1][col - 1]['value'] += 1;
        if (top && right) board[row - 1][col + 1]['value'] += 1;
        if (bottom && left) board[row + 1][col - 1]['value'] += 1;
        if (bottom && right) board[row + 1][col + 1]['value'] += 1;
    }

    handleClick(row, col) {
        const { board } = this.state;
        const duplicate = board.slice();
        if (duplicate[row][col]['value'] !== null) duplicate[row][col]['visible'] = true;
        // else do a flood filll algorithm;

        this.setState({board: duplicate});
    }

    renderSquare = (row, col) => {
        const value = row * 8 + col;
        const { board } = this.state;
        return (
            <Square
                key = {value}
                value = {board[row][col]['value']}
                visible = {board[row][col]['visible']}
                onClick = {() => this.handleClick(row, col)}
                className = "col"
            />
        );
    }
    render() {
        const { height, width, mines } = this.props;
        return (
            <MDBContainer>
                {new Array(height).fill().map((_, rowKey) => (
                    <MDBRow key={rowKey}>
                        {new Array(width).fill().map((_, colKey) => (
                            this.renderSquare(rowKey, colKey)
                        ))}
                    </MDBRow>
                ))}

            </MDBContainer>
        )
    }
}

export default Board;
