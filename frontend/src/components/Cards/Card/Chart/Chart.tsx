import Plot from "react-plotly.js";
import "./Chart.css";

type ChartProps = {
    histDeltaExogRates: number[],
    histDeltaEndogRates: number[],
    currDeltaExogRate: number,
    model: (x: number) => number,
    exogRateName: string,
    endogRateName: string
};

const Chart: React.FC<ChartProps> = ({ histDeltaExogRates, histDeltaEndogRates, currDeltaExogRate, model, exogRateName, endogRateName }) => {
    const minDeltaExogRate = Math.min(...histDeltaExogRates, currDeltaExogRate);
    const maxDeltaExogRate = Math.max(...histDeltaExogRates, currDeltaExogRate);
    const currDeltaEndogRate = model(currDeltaExogRate);

    const colors = {
        main: "#212049",
        grid: "#ecececff",
        line: "red",
        scatter: "#498BCC"
    }

    return (
        <Plot
            className="chart"
            data={[
                {
                    x: histDeltaExogRates,
                    y: histDeltaEndogRates,
                    type: "scatter",
                    mode: "markers",
                    hoverinfo: "skip",
                    marker: {
                        size: 4,
                        color: colors.scatter
                    }
                },
                {
                    x: [minDeltaExogRate, maxDeltaExogRate],
                    y: [model(minDeltaExogRate), model(maxDeltaExogRate)],
                    type: "scatter",
                    mode: "lines",
                    hoverinfo: "skip",
                    line: {
                        color: colors.line,
                        width: 2
                    }
                }
            ]}
            layout={{
                margin: { t: 8, l: 32, r: 8, b: 32 },
                dragmode: false,
                showlegend: false,
                font: { family: "Roboto Flex, sans-serif", color: colors.main, size: 11 },
                paper_bgcolor: "rgba(0, 0, 0, 0)",
                plot_bgcolor: "rgba(0, 0, 0, 0)",
                xaxis: {
                    title: { text: `Δ ${exogRateName}` },
                    linecolor: colors.main,
                    linewidth: 1,
                    showgrid: true,
                    gridcolor: colors.grid,
                    ticks: "outside",
                    ticklen: 2,
                    showline: true,
                    mirror: true,
                    dtick: 1
                },
                yaxis: {
                    title: { text: `Δ ${endogRateName}` },
                    linecolor: colors.main,
                    linewidth: 1,
                    showgrid: true,
                    gridcolor: colors.grid,
                    ticks: "outside",
                    ticklen: 2,
                    showline: true,
                    mirror: true,
                    dtick: 1
                },
                shapes: [
                    {
                        type: "line",
                        x0: currDeltaExogRate,
                        y0: 0,
                        x1: currDeltaExogRate,
                        y1: currDeltaEndogRate,
                        line: {
                            color: colors.main,
                            width: 1.5,
                            dash: "dot"
                        }
                    },
                    {
                        type: "line",
                        x0: 0,
                        y0: currDeltaEndogRate,
                        x1: currDeltaExogRate,
                        y1: currDeltaEndogRate,
                        line: {
                            color: colors.main,
                            width: 1.5,
                            dash: "dot"
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