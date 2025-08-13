import "./Card.css";

type CardProps = {
    title: string
};

const Card: React.FC<CardProps> = ({ title }) => {
    return (
        <div className="cardContainer">
            <p>{title}</p>
        </div>
    );
};

export default Card;