import React from 'react';
import logo from './logo.svg';
import Day from './Day.js'
import Week from './Week.js'
import './App.css';


class Year extends React.Component {

    constructor(props) {
        super(props);
        var array = this.computetimeArray(this.props.yearTime, this.props.reverse, this.props.year)
        this.state = {
            time: this.props.yearTime,
            offset: this.props.offset,
            year: this.props.year,
            reverse: this.props.reverse,
            age: this.props.age,
            timeArray: array
        }
    }

    

    computetimeArray = (time, reverse, year) => {
        var total = time
        var timeArray = [];
        for (var i = 0; i < 53; i++) {
            timeArray.push(0);
        }
        if (!reverse) {
            for (var i = 0; i < 53; i++) {
                if (total >= 604800) {
                    timeArray[i] = 604800
                    total = total - 604800
                } else if (total > 0) {
                    timeArray[i] = total;
                    total = 0;
                }
            }
            return timeArray
        } else {
            for (var i = 0; i < 52; i++) {
                timeArray[i] = 604800
            }
            if (year % 4 === 0) {
                timeArray[52] = 86400 * 2
            } else {
                timeArray[52] = 86400
            }
            for (var i = 0; i < 53; i++) {
                if (total >= 604800) {
                    timeArray[i] = 0
                    total = total - 604800
                } else if (total > 0) {
                    timeArray[i] = -total;
                    total = 0;
                }
            }
            return timeArray
        }
    }

    render() {
        var {timeArray} = this.state
        return (
            <div className="row">
                <span>{this.state.year} | {this.state.age} </span>
                {timeArray.map((d, i) => {
                    return <Week weekTime={d} offset={this.state.offset} style={{ transform: "scale(0.01)" }} key={i} id={(53 * this.props.age) + i} />
                })}
            </div>
        )
    }
}

export default Year;