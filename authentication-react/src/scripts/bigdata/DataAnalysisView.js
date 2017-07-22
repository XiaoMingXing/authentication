import React, {Component} from "react";
import LeftPanel from "./LeftPanel";
import MainContent from "./MainContent";

class DataAnalysisView extends Component {

    render() {
        return (<div>
            <LeftPanel />
            <MainContent />
        </div>);
    }
}

export default DataAnalysisView;
