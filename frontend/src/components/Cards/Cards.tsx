import Card from "./Card/Card";
import CardGroup from "./CardGroup";
import "./Cards.css";

function Cards() {
    return (
        <div className="cardsContainer">
            <CardGroup>
                <Card title="Fed Funds Rate" />
            </CardGroup>
            <CardGroup lower>
                <Card title="3-Month Treasury Yield" />
                <Card title="10-Year Treasury Yield" />
            </CardGroup>
            <CardGroup>
                <Card title="30-Year FRM Rate" />
            </CardGroup>
        </div>
    )
}

export default Cards;