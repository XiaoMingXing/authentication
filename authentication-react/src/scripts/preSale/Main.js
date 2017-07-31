import React, {Component} from "react";

class Main extends Component {

    render() {
        var rows = this.fetchRows();
        return (<div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price
                    </th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>);
    };

    fetchRows() {
       return "Syu";
    }
}
export default Main;
