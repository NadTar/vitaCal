import Polygon from 'react-polygon'
import React from 'react';

class Day extends React.Component {

    state = {
        time: this.props.dayTime,
        maxSize: 50
    }

    render() {
        var string = this.getPointsString();
        const { style } = this.props
        if (this.state.time >= 0) {
            return (
                <svg height="103.792" width="100" style={{ ...style, position: 'absolute' }}>
                    <polygon points="50,0 0,103.792 100,103.792" style={{ fill: "white", stroke: "black", strokeWidth: "1" }} />
                    <polygon points={string} style={{ fill: "red" }} />
                    <text x="42" y="40" fill="black">{this.props.dayIndex}</text>
                </svg>
            )
        } else {
            return (
                <svg height="103.792" width="100" style={{ ...style, position: 'absolute' }}>
                <polygon points="50,0 0,103.792 100,103.792" style={{ fill: "red", stroke: "black", strokeWidth: "1" }} />
                <polygon points={string} style={{ fill: "white" }} />
                <text x="42" y="40" fill="black">{this.props.dayIndex}</text>
            </svg>
            )
        }
        
    }

    getPointsString = () => {
        var time = this.state.time
        if (time < 0) {
            time = 86400 + time
        }
        var ratio = time / 86400;
        var hyp = Math.sqrt((50 * 50) + (103.792 * 103.792));
        var newHyp = ratio * hyp;
        //console.log(newHyp);
        //console.log((newHyp * Math.sin(0.44879895051)));
        var x1 = 50 - (newHyp * Math.sin(0.44879895051));
        var y1 = newHyp * Math.cos(0.44879895051);
        var x2 = 50 + (newHyp * Math.sin(0.44879895051));
        var ret = "50,0 " + x1 + "," + y1 + " " + x2 + "," + y1;
        return ret;
    }

}

export default Day;