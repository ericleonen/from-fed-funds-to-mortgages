import Header from "./components/Header";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import "./App.css";
import usePlottingData from "./hooks/usePlottingData";
import ScreenWidthWarningModal from "./components/ScreenWidthWarningModal";

const App: React.FC = () => {
    const data = usePlottingData();

    return (
        <>
            <title>From Fed Funds to Mortgages</title>
            <div className="appContainer">
                <div className="mainContainer">
                    <Header 
                        lastUpdatedDate={data?.lastUpdatedDate}
                    />
                    <Cards data={data} />
                </div>
                <Footer />
            </div>
            <ScreenWidthWarningModal minScreenWidth={1380} />
        </>
    );
}

export default App;