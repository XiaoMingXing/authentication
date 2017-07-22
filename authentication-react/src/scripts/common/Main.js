import React, {Component} from "react";
import { Switch, Route } from 'react-router-dom'
import DataAnalysisView from "../bigdata/DataAnalysisView";
import HomeView from "../common/HomeView";
import PreSaleView from "../preSale/PreSaleView";

class Main extends Component {

    render() {
        return (<div>
            <Switch>
                <Route exact path="/" component={HomeView} />
                <Route path="/PreSaleView" component={PreSaleView} />
                <Route path="/dataAnalysis" component={DataAnalysisView} />
            </Switch>

        </div>);
    }
}

export default Main;
