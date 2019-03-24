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
        while (minesArray.length < mines) {
            const random = Math.floor(Math.random() * height * width);
            if (!minesArray.includes(random)) minesArray.push(random);
        }
        return new Array(height).fill().map((_, rowKey) => Array(width).fill().map((_, colKey) => {
            return {
                visible: false,
                value: minesArray.includes(rowKey * 8 + colKey) ? 'bomb' : null
            };
        }))
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
