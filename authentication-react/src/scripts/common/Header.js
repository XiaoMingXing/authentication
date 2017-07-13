import React, {Component} from "react";
import logo from "./logo.svg";
import "./Header.css";

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
                            <div className="col-md-6">
                                <ul className="nav navbar-nav">
                                    <li><a href="#">主页</a></li>
                                    <li><a href="#">售前管理</a></li>
                                    <li className="active"><a href="#">数据分析</a></li>
                                    <li><a href="#">人工智能</a></li>
                                    <li><a href="#">区块链</a></li>
                                    <li><a href="#">关于我们</a></li>
                                </ul>
                            </div>
                            <div className="col-md-3 searchFrom">
                                <form className="navbar-form navbar-left" role="search">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Search"/>
                                    </div>
                                    <button type="submit" className="btn btn-default">Submit</button>
                                </form>
                            </div>
                            <div className="col-md-2 signBtns">
                                <button type="button" className="btn btn-default navbar-btn">Sign in</button>
                                <button type="button" className="btn btn-default navbar-btn">Sign up</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
