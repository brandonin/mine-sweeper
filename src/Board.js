import React, { Component } from 'react';
import { MDBContainer, MDBRow } from "mdbreact";
import { schema as neighborsSchema, isNeighbor } from './helpers/neighbors';
import floodFill from './helpers/floodFill';

import './App.css';
import Square from './Square';

class Board extends Component {
    state = {
        board: this.generateBoard(),
        firstClick: true,
        visible: 0,
        clickedMine: false
    }

    generateBoard() {
        const { height, width } = this.props;

        let board =  new Array(height).fill().map((_, rowKey) => Array(width).fill().map((_, colKey) => {
            return {
                visible: false,
                value: 0,
                isBomb: false
            };
        }))
        return board;
    }

    setMines(row, col) {
        const { height, width, mines} = this.props;
        const board = this.state.board.slice();
        let numberOfMines = 0;
        while (numberOfMines < mines) {
            const randomRow = Math.floor(Math.random() * height);
            const randomCol = Math.floor(Math.random() * width);

            if (board[randomRow][randomCol]['isBomb'] !== true &&
                !isNeighbor(row, col, randomRow, randomCol)) {
                    numberOfMines++;
                    board[randomRow][randomCol]['isBomb'] = true;
                    this.generateNeighbors(board, randomRow, randomCol);
            }
        }
        this.setState({board, firstClick: false});
    }

    generateNeighbors(board, row, col) {
        const {top, left, bottom, right} = neighborsSchema(board, row, col);
        if (top) board[row - 1][col]['value']++;
        if (left) board[row][col - 1]['value']++;
        if (bottom) board[row + 1][col]['value']++;
        if (right) board[row][col + 1]['value']++;
        if (top && left) board[row - 1][col - 1]['value']++;
        if (top && right) board[row - 1][col + 1]['value']++;
        if (bottom && left) board[row + 1][col - 1]['value']++;
        if (bottom && right) board[row + 1][col + 1]['value']++;
    }

    handleClick(row, col) {
        const { board, firstClick } = this.state;
        const duplicate = board.slice();
        let clickedMine = false;
        if (firstClick) this.setMines(row, col);
        if (duplicate[row][col]['value'] !== 0) duplicate[row][col]['visible'] = true;
        else if (duplicate[row][col]['isBomb']) clickedMine = true;
        else floodFill(duplicate, row, col);

        this.setState({board: duplicate, clickedMine});
    }

    handleResetClick() {
        this.setState({board: this.generateBoard(), firstClick: true});
    }

    handleValidateClick() {
        const { height, width, mines} = this.props;
        const { board, clickedMine } = this.state;
        let visible = 0;
        board.forEach((row, rowKey) => row.forEach((_, colKey) => {
            if (board[rowKey][colKey]['visible']) visible++;
        }))
        if (visible === (height * width - mines) && !clickedMine) alert('you win');
        else alert('you lose!')
    }

    handleShowBombsClick() {
        if (this.state.firstClick) alert('Bombs have not been placed yet! Please start the game!')
        const { board } = this.state;
        let duplicate = board.slice()
        duplicate.forEach((row, rowKey) => {
            row.forEach((_, colKey) => {
                if (duplicate[rowKey][colKey]['isBomb']) duplicate[rowKey][colKey]['visible'] = true;
            })
        })

        this.setState({board: duplicate, clickedMine: true});
    }

    renderSquare = (row, col) => {
        const value = row * 8 + col;
        const { board } = this.state;
        return (
            <Square
                key = {value}
                value = {board[row][col]['value']}
                isBomb = {board[row][col]['isBomb']}
                visible = {board[row][col]['visible']}
                onClick = {() => this.handleClick(row, col)}
                className = "col"
            />
        );
    }

    render() {
        const { height, width } = this.props;
        return (
            <div>
                <button className='button' onClick={() => {this.handleResetClick()}}>New Game</button>
                <button className='button' onClick={() => {this.handleValidateClick()}}>Validate 🙂</button>
                <button className='button' onClick={() => {this.handleShowBombsClick()}}>Show Bombs</button>
                <MDBContainer>
                    {new Array(height).fill().map((_, rowKey) => (
                        <MDBRow key={rowKey}>
                            {new Array(width).fill().map((_, colKey) => (
                                this.renderSquare(rowKey, colKey)
                            ))}
                        </MDBRow>
                    ))}
                </MDBContainer>
            </div>
        )
    }
}

export default Board;
