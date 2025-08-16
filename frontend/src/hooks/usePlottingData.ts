import { useEffect, useState } from "react";

function usePlottingData(): PlottingData | null {
    const [plottingData, setPlottingData] = useState<PlottingData | null>(null);

    useEffect(() => {
        fetch("https://from-fed-funds-to-mortgages-data-provider.onrender.com/plotting_data")
            .then((res) => res.json())
            .then((json) => setPlottingData(json))
            .catch((err) => console.error("Error:", err));
    }, []);

    return plottingData;
}

export default usePlottingData;