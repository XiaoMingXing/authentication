import {Component} from 'react'
import Widget from '../../widget'
import io from "socket.io-client"


export default class PagePV extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalPV: 60
        };
        let BACKEND_URL = "http://localhost:8080";
        this.socket = io(BACKEND_URL);
    }

    componentDidMount() {
        let _this = this;
        this.socket.on("newDataComes", function (data) {
            _this.setState({totalPV: data});
        })
    }

    handleData(data) {
        this.setState({totalPV: data.result});
    }

    render() {
        const {error, loading} = this.state;
        const {title} = this.props.title;
        return (
            <Widget title={title} loading={loading} error={error}>
                Count: <strong>{this.state.totalPV}</strong>
            </Widget>
        )
    }
}
