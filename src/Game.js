import React, { Component } from "react";
import Board from "./Board";

let count = 0;

class Game extends Component {
    state = {
        height: 8,
        width: 8,
        mines: 10
    }

    generateBoard(row, col) {

    }

    handleClick(i) {
        // const duplicate = this.state.board.slice();
        // this.setState({hello: 'hi'});
        console.log('hello', i);
    }

    render() {
        const { height, width, mines } = this.state;

        return (
            <Board height={height} width={width} mines={mines} />
        )
    }
}

export default Game;
