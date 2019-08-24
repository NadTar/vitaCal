import React from 'react';
import logo from './logo.svg';
import Day from './Day.js'
import './App.css';
import Bubble from 'react-bubble'
import anime from 'animejs/lib/anime.es.js';

const days = [0, 1, 2, 3, 4, 5, 6]
const dayNames = ["M", "T", "W", "Th", "F", "S", "S"]

class Week extends React.Component {

    constructor(props) {
        super(props);
        var array = this.computetimeArray(this.props.weekTime)
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            time: this.props.weekTime,
            offset: this.props.offset,
            id: this.props.id,
            timeArray: array,
            isHovering: false
        }
    }

    computetimeArray = (time) => {
        var total = time
        var array = []
        var count = 7
        if (total >= 0) {
            while (total > 86400 && count > 0) {
                array.push(86400)
                total = total - 86400
                count--
            }
            array.push(total)
            count--
            while (count > 0) {
                array.push(0)
                count--
            }
        } else {
            while (total < -86400 && count > 0) {
                array.push(0)
                total = total + 86400
                count--
            }
            array.push(-total)
            count--
            while (count > 0) {
                array.push(86400)
                count--
            }
        }
        return array
    }

    handleMouseHover() {
        this.setState(this.toggleHoverState);
      }
    
      toggleHoverState(state) {
        return {
          isHovering: !state.isHovering,
        };
      }

    render() {
        var {timeArray, offset, isHovering, id} = this.state
         {/*<div className="week" style={{transform: isHovering ? `scale(0.5)`:`scale(0.1)`, width: "10px", height: "10px", marginBottom: isHovering ? '15px' : '0px', zIndex: isHovering ? '1' : '0'}}  onMouseEnter={this.handleMouseHover} 
        onMouseLeave={this.handleMouseHover}>*/}
        return (
             <div 
             className="week" 
             style={{
                    transform: "scale(0.1)",
                    width: "230px", 
                    height: "230px",
                    cursor: "pointer",
                     zIndex: isHovering ? '1' : '0'}}  
            onMouseEnter={e => {
                this.handleMouseHover()
                /*anime({
                  targets: e.currentTarget,
                  backgroundPositionY: '20px',
                  scale: {
                    value: 0.5,
                    delay: 200,
                    duration: 400
                  }
                })*/
              }}
            onMouseLeave={e => {
                this.handleMouseHover()
                /*anime({
                  targets: e.currentTarget,
                  backgroundPositionX: '0px',
                  scale: {
                    value: 0.1,
                    delay: 0,
                    duration: 150
                  }
                })*/
              }}>
                {/*isHovering && <h5 style={{fontSize:"3 rem"}}>Week {id}</h5>*/}
                {days.map((d, i) => {
                    return (
                    <Day 
                    style={{ transform: `rotate(${i * (360 / 7)}deg) translate(0px,52px)`, position: "absolute", top: "65px", left: "65px"}}
                    dayTime={timeArray[i]} 
                    dayIndex={dayNames[(i + offset) % 7]} 
                    key={i}/>)
                })}
            </div>
        )
    }
}

export default Week;
