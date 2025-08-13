import Header from "./components/Header";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="appContainer">
      <div className="mainContainer">
        <Header />
        <Cards />
      </div>
      <Footer />
    </div>
  );
}

export default App;