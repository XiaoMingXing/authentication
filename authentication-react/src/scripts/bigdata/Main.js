import React, {Component} from "react";
import Storage from "./forecast/Storage";
import Logistic from "./forecast/Logistic";
import Sale from "./forecast/Sale";
import { Switch, Route, Link } from 'react-router-dom'


class Main extends Component {

    render() {
        return (<div>
            <div className="col-md-3">
                <ul className="list-group">
                    <Link to="/bigData">
                        <li className="list-group-item active">
                            <h4 className="list-group-item-heading">
                                <span>库存预测</span>
                                <span className="badge pull-right">14</span>
                            </h4>
                            <p className="list-group-item-text">

                            </p>
                        </li>
                    </Link>
                    <Link to="/bigData/sale">
                        <li className="list-group-item">
                            <h4 className="list-group-item-heading">
                                <span>销量预测</span>
                                <span className="badge pull-right">14</span>
                            </h4>
                            <p className="list-group-item-text">

                            </p>
                        </li>
                    </Link>
                    <Link to="/bigData/logistic">
                        <li className="list-group-item">
                            <h4 className="list-group-item-heading">
                                <span>物流可视化</span>
                                <span className="badge pull-right">0</span>
                            </h4>
                            <p className="list-group-item-text">
                            </p>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="col-md-8">
                <h2>This is data analysis page!</h2>
                <Switch>
                    <Route exact path='/bigData' component={Sale}/>
                    <Route path='/bigData/storage' component={Storage}/>
                    <Route path='/bigData/logistic' component={Logistic}/>
                </Switch>
            </div>
        </div>);
    }
}

export default Main;
