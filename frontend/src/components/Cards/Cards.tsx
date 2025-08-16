import { useState } from "react";
import Rates from "../../constants/Rates";
import Card from "./Card";
import FedFundsSlider from "./Card/FedFundsSlider";
import CardGroup from "./CardGroup";
import "./Cards.css";
import Chart from "./Card/Chart";
import usePlottingData from "../../hooks/usePlottingData";

function Cards() {
    const data = usePlottingData();
    const [deltaFFR, setDeltaFFR] = useState(0);

    if (!data) {
        return null;
    }

    const model1 = (x: number) => data.coefs1[0] + data.coefs1[1] * x;
    const model2 = (x: number) => data.coefs2[0] + data.coefs2[1] * x;
    const model3 = (x: number) => data.coefs3[0] + data.coefs3[1] * x;

    const currFFR = data.lastFFR.value + deltaFFR;
    
    const deltaSTR = model1(deltaFFR);
    const currSTR = data.lastSTR.value + deltaSTR;

    const deltaLTR = model2(deltaSTR);
    const currLTR = data.lastLTR.value + deltaLTR;

    const deltaFRM = model3(deltaLTR);
    const currFRM = data.lastFRM.value + deltaFRM;

    return (
        <div className="cardsContainer">
            <CardGroup
                image="federal-reserve"
                imageTiltDegrees={2.5}
            >
                <Card 
                    title="Federal Funds Rate"
                    rate={Rates.FedFunds}
                    rateValue={currFFR}
                    description="The overnight unsecured lending rate between depository institutions, set by the Federal Reserve Board of Governors"
                >
                    <FedFundsSlider
                        min={0}
                        max={10 + Math.floor(data.lastFFR.value + 1)}
                        value={currFFR}
                        onChange={newFedFundsRate => setDeltaFFR(newFedFundsRate - data.lastFFR.value)}
                    />
                </Card>
            </CardGroup>
            <CardGroup 
                image="treasury"
                imageTiltDegrees={-2.5}
                lower
            >
                <Card 
                    title="3-Month Treasury Yield"
                    rate={Rates.ShortTerm}
                    rateValue={currSTR}
                    description="The short-term lending rate, set by the market and reported by the Federal Reserve"
                >
                    <Chart
                        histDeltaExogRates={data.deltaFFR}
                        histDeltaEndogRates={data.deltaSTR}
                        currDeltaExogRate={deltaFFR}
                        model={model1}
                        exogRateName="Federal Funds Rate"
                        endogRateName="3-Month Treasury Yield"
                    />
                </Card>
                <Card
                    title="10-Year Treasury Yield"
                    rate={Rates.LongTerm}
                    rateValue={currLTR}
                    description="The long-term lending rate, set by the market and reported by the Federal Reserve"
                >
                    <Chart
                        histDeltaExogRates={data.deltaSTR}
                        histDeltaEndogRates={data.deltaLTR}
                        currDeltaExogRate={deltaSTR}
                        model={model2}
                        exogRateName="3-Month Treasury Yield"
                        endogRateName="10-Year Treasury Yield"
                    />
                </Card>
            </CardGroup>
            <CardGroup
                image="house"
                imageTiltDegrees={2.5}
            >
                <Card
                    title="30-Year FRM Rate"
                    rate={Rates.FRM}
                    rateValue={currFRM}
                    description="Average weekly mortgage rate, set by the market and reported by Freddie Mac"
                >
                    <Chart
                        histDeltaExogRates={data.deltaLTR}
                        histDeltaEndogRates={data.deltaFRM}
                        currDeltaExogRate={deltaFRM}
                        model={model3}
                        exogRateName="10-Year Treasury Yield"
                        endogRateName="30-Year FRM Rate"
                    />
                </Card>
            </CardGroup>
        </div>
    )
}

export default Cards;