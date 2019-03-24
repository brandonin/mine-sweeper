import React, { Component } from "react";
import Board from "./Board";

let count = 0;

class Game extends Component {
    state = {
        board: this.generateBoard(8, 8)
    }

    generateBoard(row, col) {
        return new Array(row*col).fill().map(() => {
            return {
                visible: false,
                value: count++
            }
        })
        // return new Array(row).fill().map(() => Array(col).fill().map(() => {
        //     return {
        //         visible: false,
        //         value: count++
        //     };
        // }))
    }

    handleClick(i) {
        const duplicate = this.state.board.slice();
        this.setState({hello: 'hi'});
        console.log('hello', i);
    }

    render() {
        const { board } = this.state;
        console.log(board);

        return (
            <Board squares={board} onClick={(i) => this.handleClick(i)}/>
        )
    }
}

export default Game;
