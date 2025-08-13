import Rates from "../../../constants/Rates";
import "./Card.css";

type CardProps = {
    title: string,
    rate: Rates
};

const Card: React.FC<CardProps> = ({ title, rate }) => {
    return (
        <div className="cardContainer" id={rate}>
            <p className="cardTitle">{title}</p>
        </div>
    );
};

export default Card;