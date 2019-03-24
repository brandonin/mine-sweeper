import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
// import
import './App.css';
import Square from './Square';

class Board extends Component {

    renderSquare = (square) => {
        const { value, visible } = square;
        const { onClick } = this.props;
        return (
            <Square
                value={value}
                visible={visible}
                onClick={() => onClick(square)}
                className="col"
            />
        );
    }
    render() {
        const { squares } = this.props;
        return (
            <MDBContainer>
                <MDBRow>
                    {squares.map((row, rowKey) => {
                        if (rowKey % 8 === 0) return <MDBCol>{row.value}</MDBCol>
                        return row.value;
                    }
                        /* {row.map((col, colKey) => (
                            this.renderSquare(squares[rowKey][colKey])
                        ))} */
                    )}
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Board;
