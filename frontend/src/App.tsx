import Header from "./components/Header";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import "./App.css";
import usePlottingData from "./hooks/usePlottingData";

const App: React.FC = () => {
    const data = usePlottingData();

    return (
        <div className="appContainer">
            <div className="mainContainer">
                <Header 
                    lastUpdatedDate={data?.lastUpdatedDate}
                />
                <Cards data={data} />
            </div>
            <Footer />
        </div>
    );
}

export default App;