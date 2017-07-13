import React, {Component} from "react";

class MainContent extends Component {

    render() {
        return (<div className="col-md-8">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Panel title</h3>
                </div>
                <div className="panel-body">
                    Panel content
                </div>
            </div>
        </div>);
    }
}

export default MainContent;
