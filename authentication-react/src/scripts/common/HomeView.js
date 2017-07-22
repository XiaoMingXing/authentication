import React, {Component} from "react";
import { Switch, Route } from 'react-router-dom'
import DataAnalysisView from "../bigdata/DataAnalysisView";
import HomeView from "../common/HomeView";
import PreSaleView from "../preSale/PreSaleView";

class Main extends Component {

    render() {
        return (<div>

            <h1>Welcome to dashboard!</h1>

        </div>);
    }
}

export default Main;
