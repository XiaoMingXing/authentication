import React, {Component} from "react";
import Chart from "chart.js";
import ProgressBar from "progressbar.js";
import Datamap from "datamaps";
import d3 from "datamaps/node_modules/d3";

class LenovoCase extends Component {

    constructor(props) {

        super(props);

        const data = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        };

        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true
        };

        this.state = {
            data: data,
            options: options,
        };

        this._chart = null;

        this.style = {
            width: 600
        }
    }

    render() {
        const progressBarStyle = {
            margin: "20px",
            width: "200px",
            height: "100px"
        };

        const mapStyle = {
            position: "relative",
            width: "1000px",
            height: "600px"
        };


        return (<div>
            <div id="india" style={mapStyle}></div>
            <div className="barChart" style={this.style}>
                <canvas id="myChart"/>
            </div>
            <div>
                <div className="progressBar" style={progressBarStyle}></div>
                <div id="circleChart" style={progressBarStyle}>

                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="#ec5e30" strokeWidth="8"/>
                        <circle cx="40" cy="40" r="34" fill="none" stroke="#e6e6e6" strokeWidth="8"
                                strokeDasharray="251.2" strokeDashoffset="58.16"/>
                        <circle cx="40" cy="40" r="23" fill="none" stroke="#e6e6e6" strokeWidth="8"/>
                        <circle cx="40" cy="40" r="23" fill="none" stroke="#559e6c" strokeWidth="8"
                                strokeDasharray="251.2" strokeDashoffset="238.30"/>
                        <text x="23" y="38" fontFamily="Verdana" fontSize="5" color="#559e6c" fill="#559e6c">
                            3.19%(30CD)
                        </text>
                        <text x="25" y="48" fontFamily="Verdana" fontSize="5" color="#559e6c" fill="#ec5e30">
                            5.4%(90BD)
                        </text>
                    </svg>
                </div>
                <div className="mapContainer">

                </div>
            </div>
        </div>);
    }

    componentDidMount() {

        if (this._chart) this._chart.destroy();

        var ctx = document.getElementById("myChart").getContext("2d");

        this._chart = new Chart(ctx, {
            type: 'bar',
            data: this.state.data,
            options: this.state.options
        });

        var bar = new ProgressBar.SemiCircle(".progressBar", {
            strokeWidth: 6,
            color: '#FFEA82',
            trailColor: '#eee',
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            svgStyle: null,
            text: {
                value: '',
                alignToBottom: false
            },
            from: {color: '#FFEA82'},
            to: {color: '#ED6A5A'},
            // Set default step function for all animate calls
            step: (state, bar) => {
                bar.path.setAttribute('stroke', state.color);
                var value = Math.round(bar.value() * 100);
                if (value === 0) {
                    bar.setText('');
                } else {
                    bar.setText(value);
                }

                bar.text.style.color = state.color;
            }
        });

        bar.text.style.fontSize = '1.6rem';
        bar.animate(0.8);

        /*Map*/

        var bubble_map = new Datamap({
            element: document.getElementById('india'),
            scope: 'india',
            geographyConfig: {
                popupOnHover: true,
                highlightOnHover: true,
                borderColor: '#444',
                borderWidth: 0.5,
                dataUrl: 'https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json'
                //dataJson: topoJsonData
            },
            fills: {
                'bad': '#D0021B',
                'good': '#5C9D6C',
                'unSelect': '#DDDDDD',
                defaultFill: '#fff'
            },
            data: {
                /*'JH': {fillKey: 'MINOR'},
                 'MH': {fillKey: 'MINOR'}*/
            },
            setProjection: function (element) {
                var projection = d3.geo.mercator()
                    .center([78.9629, 23.5937]) // always in [East Latitude, North Longitude]
                    .scale(1000);
                var path = d3.geo.path().projection(projection);
                return {path: path, projection: projection};
            }
        });


        let bubbles = [
            {
                latitude: 19.7515,
                longitude: 75.7139,
                fillKey: "bad",
                radius: 10,
                state: "mock city 3"
            },
            {
                latitude: 19.7515,
                longitude: 85.7139,
                fillKey: "unSelect",
                radius: 20,
                state: "Maharastra"
            },
            {
                centered: "AP",
                fillKey: "unSelect",
                radius: 10,
                state: "Andhra Pradesh"
            },
            {
                centered: "TN",
                fillKey: "bad",
                radius: 16,
                state: "Tamil Nadu"
            },
            {
                centered: "WB",
                fillKey: "bad",
                radius: 5,
                state: "West Bengal"
            },
            {
                latitude: 15.9129,
                longitude: 79.7400,
                fillKey: "bad",
                radius: 5,
                state: "mock city 1"
            },
            {
                latitude: 16.9129,
                longitude: 80.7400,
                fillKey: "bad",
                radius: 5,
                state: "mock city 2"
            },
            {
                centered: "MP",
                fillKey: "unSelect",
                radius: 15,
                state: "Madhya Pradesh"
            },
            {
                centered: "UP",
                fillKey: "good",
                radius: 8,
                state: "Uttar Pradesh"
            },
            {
                centered: "RJ",
                fillKey: "good",
                radius: 7,
                state: "Rajasthan"
            }
        ];

        setTimeout(() => { // only start drawing bubbles on the map when map has rendered completely.
            bubble_map.bubbles(bubbles, {
                popupTemplate: function (geo, data) {
                    return `<div class="hoverinfo">city: ${data.state}, Slums: ${data.radius}%</div>`;
                }
            });
        }, 1000);

    }
}

export default LenovoCase;
