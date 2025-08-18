import { useState } from "react";
import Rates from "../../constants/Rates";
import Card from "./Card";
import FedFundsSlider from "./Card/FedFundsSlider";
import CardGroup from "./CardGroup";
import "./Cards.css";
import Chart from "./Card/Chart";

type CardsProps = {
    data: PlottingData | null;
}

const identity = (x: number) => x;

const Cards: React.FC<CardsProps> = ({ data }) => {
    const ready = data !== null;
    const [deltaFFR, setDeltaFFR] = useState(0);

    let lastFFR = 0;
    let currFFR = 0;
    let deltaSTR = 0;
    let currSTR = 0;
    let deltaLTR = 0;
    let currLTR = 0;
    let deltaFRM = 0;
    let currFRM = 0;

    if (ready) {
        lastFFR = data.FFR.lastValue;
        currFFR = lastFFR + deltaFFR;

        deltaSTR = data.model1(deltaFFR);
        currSTR = data.STR.lastValue + deltaSTR;

        deltaLTR = data.model2(deltaSTR);
        currLTR = data.LTR.lastValue + deltaLTR;

        deltaFRM = data.model3(deltaLTR);
        currFRM = data.FRM.lastValue + deltaFRM;
    }

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
                        max={15}
                        value={currFFR}
                        onChange={newFedFundsRate => setDeltaFFR(newFedFundsRate - lastFFR)}
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
                        histDeltaExogRates={ready ? data.FFR.deltas : []}
                        histDeltaEndogRates={ready ? data.STR.deltas : []}
                        currDeltaExogRate={deltaFFR}
                        model={ready ? data.model1 : identity}
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
                        histDeltaExogRates={ready ? data.STR.deltas : []}
                        histDeltaEndogRates={ready ? data.LTR.deltas : []}
                        currDeltaExogRate={deltaSTR}
                        model={ready ? data.model2 : identity}
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
                        histDeltaExogRates={ready ? data.LTR.deltas : []}
                        histDeltaEndogRates={ready ? data.FRM.deltas : []}
                        currDeltaExogRate={deltaLTR}
                        model={ready ? data.model3 : identity}
                        exogRateName="10-Year Treasury Yield"
                        endogRateName="30-Year FRM Rate"
                    />
                </Card>
            </CardGroup>
        </div>
    )
}

export default Cards;