import React, {Component} from "react";
import axios from "axios";

class UserActivity extends Component {

    GenerateData() {
        let _this = this;
        axios
            .get("http://localhost:5000/userActivity")
            .then(function (result) {
                console.log(result);
                return UserActivity.onSuccess(result.data);
            })
    }

    static onSuccess(result) {
        console.log("SUCCESS!");
    }

    render() {
        return (<div>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">User Activity Analysis</h3>
                </div>
                <div className="panel-body">
                    <button className="data_btn" onClick={this.GenerateData}>Generate User Data</button>
                </div>
            </div>
        </div>);
    }
}

export default UserActivity;
