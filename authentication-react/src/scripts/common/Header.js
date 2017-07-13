import React, {Component} from "react";
import logo from "./logo.svg";

class Header extends Component {

    render() {
        return (<div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div>
                            <div className="col-md-1">
                                <a className="navbar-brand" href="#">
                                    <img src={logo} className="brand" alt="Brand"/>
                                </a>
                            </div>
                            <div className="col-md-7">
                                <ul className="nav navbar-nav">
                                    <li className="active"><a href="#">主页</a></li>
                                    <li><a href="#">售前管理</a></li>
                                    <li><a href="#">数据分析</a></li>
                                    <li><a href="#">人工智能</a></li>
                                    <li><a href="#">区块链</a></li>
                                    <li><a href="#">关于我们</a></li>
                                </ul>
                            </div>
                            <div className="col-md-7">
                                <ul className="nav navbar-nav">
                                    <li className="active"><a href="#">主页</a></li>

                                </ul>
                            </div>
                            <div className="col-md-4">
                                <form className="navbar-form navbar-left" role="search">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Search"/>
                                    </div>
                                    <button type="submit" className="btn btn-default">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
