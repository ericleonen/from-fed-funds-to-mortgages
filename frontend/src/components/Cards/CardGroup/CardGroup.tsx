import React from "react";
import "./CardGroup.css";

type CardGroupProps = {
    lower?: boolean
    image: string,
    imageTiltDegrees: number;
    children: React.ReactNode
};

const CardGroup: React.FC<CardGroupProps> = ({ lower, image, imageTiltDegrees, children }) => {
    const imgSrc = `/images/${image}.png`;

    return (
        <div 
            className="cardGroupContainer"
            style={{
                "marginTop": lower ? "128px" : "0px"
            }}
        >
            <div className="cardImageContainer">
                <img 
                    className="cardImage" 
                    src={imgSrc}
                    style={{
                        "transform": `rotate(${imageTiltDegrees}deg)`
                    }}
                />
            </div>
            {children}
        </div>
    );
};

export default CardGroup;