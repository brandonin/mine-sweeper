import React from 'react';
import './App.css';

function Square(props) {
    return (
        <button className={`${props.className} square ${props.visible ? 'visible' : 'invisible'}`} onClick={props.onClick}>
            {props.visible &&
            <span className='positionAbsolute'>
                { props.isBomb ? "💣" : props.value }
            </span>}
        </button>
    )
}

export default Square;
