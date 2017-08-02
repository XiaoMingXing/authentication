import React, {Component} from "react";
import MobileRepairStatistics from "../../chart/MobileRepairStatistics";


class Sale extends Component {

    render() {
        return (<div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">维修站数据分析</h3>
                </div>
                <div className="panel-body">
                    <MobileRepairStatistics />
                </div>
            </div>
        </div>);
    }
}

export default Sale;
