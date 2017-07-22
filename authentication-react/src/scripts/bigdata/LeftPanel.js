import React, {Component} from "react";

class LeftPanel extends Component {

    render() {
        return (<div className="col-md-3">
            <ul className="list-group">
                <li className="list-group-item active">
                    <h4 className="list-group-item-heading">
                        <span>库存预测</span>
                        <span className="badge pull-right">14</span>
                    </h4>
                    <p className="list-group-item-text">

                    </p>
                </li>
                <li className="list-group-item">
                    <h4 className="list-group-item-heading">
                        <span>销量预测</span>
                        <span className="badge pull-right">14</span>
                    </h4>
                    <p className="list-group-item-text">

                    </p>
                </li>
                <li className="list-group-item">
                    <h4 className="list-group-item-heading">
                        <span>物流可视化</span>
                        <span className="badge pull-right">0</span>
                    </h4>
                    <p className="list-group-item-text">
                    </p>
                </li>
            </ul>
        </div>);
    }
}

export default LeftPanel;
