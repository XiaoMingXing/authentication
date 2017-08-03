import React, {Component} from "react";
import MobileRepairStatistics from "../../chart/MobileRepairStatistics";
import MobileRepairRadar from "../../chart/MobileRepairRadar";
import MobileRepairTimeBar from "../../chart/MobileRepairTimeBar";


class Sale extends Component {

    render() {
        return (<div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">维修站Performance</h3>
                </div>
                <div className="panel-body">
                    <div className="row pull-left">
                        <label>维修站: </label>
                        <select id="dropdown-size-medium">
                            <option key="K50a40" value="K50a40">K50a40</option>
                            <option key="A6000_16G" value="A6000_16G">A6000_16G</option>
                            <option key="A7010a48" value="A7010a48">A7010a48</option>
                        </select>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <MobileRepairRadar />
                        </div>
                        <div className="col-md-8">
                            <MobileRepairTimeBar />
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">维修站维修耗时</h3>
                </div>
                <div className="panel-body">
                    <MobileRepairStatistics />
                </div>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">维修站雷达图</h3>
                </div>
                <div className="panel-body">

                </div>
            </div>
        </div>);
    }
}

export default Sale;
