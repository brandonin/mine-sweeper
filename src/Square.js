import React from 'react';
import './App.css';

function Square(props) {
    return (
        <button className={props.className + ' square'} onClick={props.onClick}>
            {props.visible && props.value}
        </button>
    )
}

export default Square;
