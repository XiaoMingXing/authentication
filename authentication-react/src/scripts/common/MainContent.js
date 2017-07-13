import React, {Component} from "react";
import SupplyChainForecast from "../chart/SupplyChainForecast";

class MainContent extends Component {

    render() {
        return (<div className="col-md-8">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Panel title</h3>
                </div>
                <div className="panel-body">
                    <SupplyChainForecast />
                </div>
            </div>
        </div>);
    }
}

export default MainContent;
