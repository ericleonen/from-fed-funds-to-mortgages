import Rates from "../../constants/Rates";
import Card from "./Card/Card";
import CardGroup from "./CardGroup";
import "./Cards.css";

function Cards() {
    return (
        <div className="cardsContainer">
            <CardGroup>
                <Card 
                    title="Federal Funds Rate"
                    rate={Rates.FedFunds}
                />
            </CardGroup>
            <CardGroup lower>
                <Card 
                    title="3-Month Treasury Yield"
                    rate={Rates.ShortTerm}
                />
                <Card
                    title="10-Year Treasury Yield"
                    rate={Rates.LongTerm}
                />
            </CardGroup>
            <CardGroup>
                <Card
                    title="30-Year FRM Rate"
                    rate={Rates.FRM}
                />
            </CardGroup>
        </div>
    )
}

export default Cards;