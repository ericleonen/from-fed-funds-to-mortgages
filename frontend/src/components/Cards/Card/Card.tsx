import Rates from "../../../constants/Rates";
import "./Card.css";

type CardProps = {
    title: string,
    rate: Rates,
    children?: React.ReactNode
};

const Card: React.FC<CardProps> = ({ title, rate, children }) => {
    return (
        <div className="cardContainer" id={rate}>
            <p className="cardTitle">{title}</p>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Card;