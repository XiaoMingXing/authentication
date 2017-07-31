import React, {Component} from "react";
import {ListGroup, ListGroupItem} from "react-bootstrap";

class Main extends Component {

    render() {
        return (<div>

            <h1>Do some pre-sale display !!</h1>

            <div className="leftPanel">
                <ListGroup>
                    <ListGroupItem href="#" active>Link 1</ListGroupItem>
                    <ListGroupItem href="#">Link 2</ListGroupItem>
                    <ListGroupItem href="#" disabled>Link 3</ListGroupItem>
                </ListGroup>
            </div>

            <div className="table">

            </div>

        </div>);
    }
}

export default Main;
