import React, {Component} from "react";
import axios from "axios";

class UserActivity extends Component {

    constructor() {
        super();
        axios.defaults.headers.post['Content-Type'] = "application/vnd.kafka.json.v2+json";
        axios.defaults.headers.post['Accept'] = "application/vnd.kafka.v2+json";
        axios.defaults.headers.get['Accept'] = "application/vnd.kafka.json.v2+json";
    }

    checkKafkaStatus() {
        let kafka_rest = "http://localhost:8082/";
        axios
            .get(kafka_rest + "topics")
            .then(result => console.log(result))
    }

    initKafka() {
        let kafka_rest = "http://localhost:8082/";
        let consumerName = "my_json_consumer";
        let consumerInstanceName = "my_consumer_instance";
        axios.post(kafka_rest + "consumers/" + consumerName, JSON.stringify({
            "name": consumerInstanceName,
            "format": "json",
            "auto.offset.reset": "latest"
        })).then(result => console.log(result));

        axios.post(kafka_rest + "consumers/" + consumerName + "/instances/" + consumerInstanceName + "/subscription",
            JSON.stringify({"topics": ["topic-test2"]}))
            .then(result => console.log(result))
    }

    ProduceMessage() {
        let kafka_rest = "http://localhost:8082/";
        axios.post(kafka_rest + "topics/topic-test2", JSON.stringify({
            "records": [{
                "value": {
                    "level1": "result",
                    "level2": {"foo": "bar"}
                }
            }]
        })).then(result => console.log(result))
    }


    ConsumeMessage() {
        let kafka_rest = "http://localhost:8082/";
        let consumerName = "my_json_consumer";
        let consumerInstanceName = "my_consumer_instance";
        axios
            .get(kafka_rest + "consumers/" + consumerName + "/instances/" + consumerInstanceName + "/records")
            .then(result => console.log(result))
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
                    <button className="data_btn" onClick={this.checkKafkaStatus}>Check Kafka Status</button>
                    <button className="data_btn" onClick={this.initKafka}>Init Kafka</button>
                    <button className="data_btn" onClick={this.ProduceMessage}>Generate User Data</button>
                    <button className="data_btn" onClick={this.ConsumeMessage}>ConsumeMessage</button>
                </div>
            </div>
        </div>);
    }
}

export default UserActivity;
