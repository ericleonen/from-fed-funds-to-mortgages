
import "./FedFundsSlider.css";

type FedFundsSliderProps = {
    min: number,
    max: number,
    value: number,
    onChange: (newValue: number) => void
}

const FedFundsSlider: React.FC<FedFundsSliderProps> = ({ min, max, value, onChange }) => {
    return (
        <div id="fedFundsSliderContainer">
            <span className="endLabel">{max}%</span>
            <input
                type="range"
                min={min}
                max={max}
                step={0.01}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                id="slider"
                style={{
                    '--val': value,
                    '--min': min,
                    '--max': max,
                } as React.CSSProperties}
            />
            <span className="endLabel">{min}%</span>
        </div>
    );
};

export default FedFundsSlider;