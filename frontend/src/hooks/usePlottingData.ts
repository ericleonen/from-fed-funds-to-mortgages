import { useEffect, useState } from "react";

function makeModel(coefs: [number, number]): Model {
    return (x: number) => coefs[0] + coefs[1]*x;
}

function usePlottingData(): PlottingData | null {
    const [plottingData, setPlottingData] = useState<PlottingData | null>(null);

    useEffect(() => {
        fetch("https://from-fed-funds-to-mortgages-data-provider.onrender.com/plotting_data")
            .then((res) => res.json())
            .then((json) => {
                setPlottingData({
                    lastUpdatedDate: json.lastUpdatedDate,
                    FFR: {
                        lastValue: json.lastFFR,
                        deltas: json.deltaFFR
                    },
                    STR: {
                        lastValue: json.lastSTR,
                        deltas: json.deltaSTR
                    },
                    LTR: {
                        lastValue: json.lastLTR,
                        deltas: json.deltaLTR
                    },
                    FRM: {
                        lastValue: json.lastFRM,
                        deltas: json.deltaFRM
                    },
                    model1: makeModel(json.coefs1),
                    model2: makeModel(json.coefs2),
                    model3: makeModel(json.coefs3)
                })
            })
            .catch((err) => console.error("Error:", err));
    }, [setPlottingData]);

    return plottingData;
}

export default usePlottingData;