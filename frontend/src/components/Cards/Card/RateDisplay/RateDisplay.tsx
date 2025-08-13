import "./RateDisplay.css";

type RateDisplayProps = {
    value: number
}

const RateDisplay: React.FC<RateDisplayProps> = ({ value }) => {
    return (
        <div className="rateDisplayContainer">
            <div className="backgroundOval"/>
            <span className="valueText">{value}%</span>
        </div>
    )
};

export default RateDisplay;