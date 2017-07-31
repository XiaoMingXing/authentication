import React, {Component} from "react";
import logo from "./logo.svg";
import "./Header.css";
import {Link} from "react-router-dom";

class Header extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div>
                            <div className="col-md-1">
                                <Link to="/">
                                    <a className="navbar-brand">
                                        <img src={logo} className="brand" alt="Brand"/>
                                    </a>
                                </Link>
                            </div>
                            <div className="col-md-6">
                                <ul className="nav navbar-nav">
                                    <li><Link to="/">主页</Link></li>
                                    <li><Link to="/preSale">售前管理</Link></li>
                                    <li><Link to="/bigData">大数据</Link></li>
                                    <li><Link to="/ai">人工智能</Link></li>
                                    <li><Link to="/blockChain">区块链</Link></li>
                                    <li><Link to="/about">关于我们</Link></li>
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
            </div>);
    }
}
export default Header;
