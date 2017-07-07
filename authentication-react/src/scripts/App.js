import React, {Component} from "react";
import logo from "./logo.svg";
import "./App.css";
import ShoppingList from "./shopping/shopping-list";
import GoodList from "./shopping/good-list";

class App extends Component {

    renderShoppingList(name) {
        return <ShoppingList name={name} />;
    }

    renderGoodList() {
        return <GoodList />;
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div>
                    <div className="shopping-list">
                        {this.renderShoppingList('Shopping')}
                    </div>
                    <div className="good-list">
                        {this.renderGoodList('Goods')}
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
