import React from "react";
import "./CardGroup.css";

type CardGroupProps = {
    lower?: boolean
    children: React.ReactNode
};

const CardGroup: React.FC<CardGroupProps> = ({ lower, children }) => {

    return (
        <div 
            className="cardGroupContainer"
            style={{
                "marginTop": lower ? "128px" : "0px"
            }}
        >
            {children}
        </div>
    );
};

export default CardGroup;