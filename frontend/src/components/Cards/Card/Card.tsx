import Rates from "../../../constants/Rates";
import "./Card.css";
import RateDisplay from "./RateDisplay";

type CardProps = {
    title: string,
    rate: Rates,
    rateValue: number,
    description: string,
    children?: React.ReactNode
};

const Card: React.FC<CardProps> = ({ title, rate, rateValue, description, children }) => {
    return (
        <div className="cardContainer" id={rate}>
            <p className="cardTitle">{title}</p>
            <div className="cardContent">
                {rate === Rates.FedFunds && children}
                <div className="cardInfoContainer">
                    <RateDisplay value={rateValue} />
                    <p 
                        className="description"
                        style={{
                            "textAlign": rate === Rates.FedFunds ? "right" : "center"
                        }}
                    >
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;