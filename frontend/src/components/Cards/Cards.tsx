import { useState } from "react";
import Rates from "../../constants/Rates";
import Card from "./Card";
import FedFundsSlider from "./Card/FedFundsSlider";
import CardGroup from "./CardGroup";
import "./Cards.css";

function Cards() {
    const origFedFundsRate = 4.33;
    const [deltaFedFundsRate, setDeltaFedFundsRate] = useState(0); 

    return (
        <div className="cardsContainer">
            <CardGroup
                image="federal-reserve"
                imageTiltDegrees={2.5}
            >
                <Card 
                    title="Federal Funds Rate"
                    rate={Rates.FedFunds}
                    rateValue={origFedFundsRate + deltaFedFundsRate}
                    description="The overnight unsecured lending rate between depository institutions, set by the Federal Reserve Board of Governors"
                >
                    <FedFundsSlider
                        min={0}
                        max={10 + Math.floor(origFedFundsRate + 1)}
                        value={origFedFundsRate + deltaFedFundsRate}
                        onChange={newFedFundsRate => setDeltaFedFundsRate(newFedFundsRate - origFedFundsRate)}
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
                    rateValue={0}
                    description="The short-term lending rate, set by the market and reported by the Federal Reserve"
                />
                <Card
                    title="10-Year Treasury Yield"
                    rate={Rates.LongTerm}
                    rateValue={0}
                    description="The long-term lending rate, set by the market and reported by the Federal Reserve"
                />
            </CardGroup>
            <CardGroup
                image="house"
                imageTiltDegrees={2.5}
            >
                <Card
                    title="30-Year FRM Rate"
                    rate={Rates.FRM}
                    rateValue={0}
                    description="Average weekly mortgage rate, set by the market and reported by Freddie Mac"
                />
            </CardGroup>
        </div>
    )
}

export default Cards;