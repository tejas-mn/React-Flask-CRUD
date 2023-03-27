import React from 'react';
import './Card.css';

const Card = (props) => {
    const classes = 'card ' + props.className;
    
    //props.children contains contents inside Component
    return <div className={classes}>{props.children}</div>
}

export default Card;