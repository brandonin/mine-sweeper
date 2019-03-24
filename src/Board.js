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
                this.generateNeighbors(randomRow, randomCol, board);
            }
            // if (!minesArray.includes({randomRow , randomCol})) minesArray.push({randomRow, randomCol});

        }
        return board;
        // minesArray.includes(rowKey * 8 + colKey) ? 'bomb' :
    }

    generateNeighbors(row, col, board) {
        // make edge cases;
    }

    handleClick(row, col) {
        const { board } = this.state;
        const duplicate = board.slice();
        if (duplicate[row][col]['value'] === 'bomb') console.log('boom');
        duplicate[row][col]['visible'] = true;
        this.setState({board: duplicate});
    }

    renderSquare = (row, col) => {
        const value = row * 8 + col;
        const { board } = this.state;
        return (
            <Square
                key = {value}
                value = {value}
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
