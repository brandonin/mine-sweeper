import React from 'react';
import './App.css';

function Square(props) {
    const value = props.value !== 0 ? props.value : '';

    return (
        <button className={`${props.className} square ${props.visible ? 'visible' : 'invisible'}`} onClick={props.onClick}>
            {props.visible &&
            <span className='positionAbsolute'>
                { props.isBomb ? "💣" : value }
            </span>}
        </button>
    )
}

export default Square;
