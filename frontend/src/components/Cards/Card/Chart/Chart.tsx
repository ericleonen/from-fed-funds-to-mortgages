import Plot from "react-plotly.js";
import "./Chart.css";

type ChartProps = {
    deltaExogRate: number
};

const Chart: React.FC<ChartProps> = ({ deltaExogRate }) => {

    return (
        <Plot
            className="chart"
            data={[
                {
                    x: [-3, -2, -1, 0, 1, 2, 3],
                    y: [-2.5, -1.8, -1.1, 0, 1.1, 1.9, 2.8],
                    type: "scatter",
                    mode: "markers"
                },
                {
                    x: [-3, -2, -1, 0, 1, 2, 3],
                    y: [-3, -2, -1, 0, 1, 2, 3],
                    type: "scatter",
                    mode: "lines"
                }
            ]}
            layout={{
                margin: { t: 32, l: 32, r: 32, b: 32 },
                dragmode: false,
                showlegend: false,
                xaxis: {
                    title: { text: "Δ Exogeneous Rate" }
                },
                yaxis: {
                    title: { text: "Δ Endogeneous Rate" }
                },
                shapes: [
                    {
                        type: "line",
                        x0: deltaExogRate,
                        y0: 0,
                        x1: deltaExogRate,
                        y1: deltaExogRate,
                        line: {
                            color: "red",
                            width: 2
                        }
                    }
                ]
            }}
            useResizeHandler={true}
            config={{ displayModeBar: false }}
        />
    );
};

export default Chart;