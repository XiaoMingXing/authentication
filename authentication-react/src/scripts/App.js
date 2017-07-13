import React, {Component} from "react";
import "./App.css";
import Header from "./common/Header";
import LeftPanel from "./common/LeftPanel";
import MainContent from "./common/MainContent";

class App extends Component {

    render() {
        return (
            <div className="App">
                <div className="Header row">
                    <Header />
                </div>
                <div className="Content row">
                    <LeftPanel />
                    <MainContent />
                </div>
            </div>
        );
    }
}

export default App;
