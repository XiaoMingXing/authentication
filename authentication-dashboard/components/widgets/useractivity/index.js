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
        this.socket.on("news", function (doc) {
            console.log("MESSAGES", doc);
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
