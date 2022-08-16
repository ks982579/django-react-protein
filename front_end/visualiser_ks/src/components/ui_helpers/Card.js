import React from "react";

// Import Sassy CSS
import sassy from './Card.module.scss';

const Card = (props) => {
    const additionalClasses = props.className;
    return (
        <div className={`${sassy["card-container"]} ${additionalClasses}`}>
            {props.children}
        </div>
    );
};

export default Card;