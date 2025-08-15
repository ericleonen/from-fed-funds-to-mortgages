import "./RateDisplay.css";

type RateDisplayProps = {
    value: number
}

const RateDisplay: React.FC<RateDisplayProps> = ({ value }) => {
    return (
        <div className="rateDisplayContainer">
            <div className="backgroundOval"/>
            <span className="valueText">{value.toFixed(2)}%</span>
        </div>
    )
};

export default RateDisplay;