import React from 'react';
import Week from './Week.js'
import Day from './Day.js'
import { Button, Select, Spinner, Icon, div, TextInput } from 'evergreen-ui'
import './App.css';
import Year from './Year.js'
import { first } from 'glamor';
import { thisExpression } from '@babel/types';

var yearOptions = []
for (var j = 2018; j >= 1902; j--) {
  yearOptions.push(j)
}
var timer = null
const yearTime = 86400 * 365
const leapYearTime = 86400 * 366
const monthOptions = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
const dayOptions = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
const weekArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]
class App extends React.Component {

  state = {
    day: "01",
    month: "01",
    year: 0,
    time: 0,
    currentYearTime: 0,
    offsets: [],
    yearArray: [],
    timeArray: [],
    yearAge: 0,
    loading: false
  }


  computeTime = async (milliseconds = 50) => {
    var t0 = performance.now();
    this.setState({ loading: true })
    await this.sleep(milliseconds)
    var day = this.state.day
    var month = this.state.month
    var year = Number(this.state.year)
    var limit = 80;
    if (yearAge > limit) {
      limit = yearAge
    }
    var yearArray = []
    for (var i = year; i < year + limit; i++) {
      yearArray.push(i)
    }
    var birthDate = new Date(year + "-" + month + "-" + day + " 00:00:00");
    var currentDate = new Date()

    //Date.parse("2019-08-16 22:44:58")/1000;
    var timeStamp = birthDate.getTime();
    timeStamp = Math.floor(timeStamp / 1000);
    var yearAge = currentDate.getFullYear() - year;
    var millis = Date.now()
    var total = 0
    if (timeStamp < 0) {
      total = (timeStamp * -1) + Math.floor(millis / 1000);
    } else {
      total = Math.floor(millis / 1000) - timeStamp;
    }
    var time = total;
    var timeArray = []
    var offsets = []
    //compute current year offset
    var currentYear = currentDate.getFullYear();
    var yearStartDate = new Date(currentYear + "-01-01 00:00:00")
    var yearStartTime = Math.floor(yearStartDate.getTime() / 1000)
    var currentTime = Math.floor(Date.now() / 1000)
    //currentYearTime = currentTime - yearStartTime
    //compute birth year offset
    var birthYearDate = this.state.year + "-01-01 00:00:00"
    var byDate = new Date(birthYearDate);
    var birthYearTimeStamp = Math.floor(Date.parse(birthYearDate) / 1000)
    var birthDayTimeStamp = Math.floor(birthDate.getTime() / 1000)
    var birthYearOffset = Math.abs(birthDayTimeStamp - birthYearTimeStamp)
    var firstOffset = this.getDayOffSet(this.state.year)
    offsets.push(firstOffset);
    timeArray.push(birthYearOffset)
    var birthYearTime = yearTime
    if (birthDate.getFullYear() % 4 === 0) {
      birthYearTime = leapYearTime
    }
    total = total - (birthYearTime - birthYearOffset)
    for (var i = 1; i < yearAge; i++) {
      var offset = this.getDayOffSet(yearArray[i])
      offsets.push(offset)
      if (yearArray[i] % 4 === 0) {
        timeArray.push(leapYearTime)
        total = total - leapYearTime
      } else {
        timeArray.push(yearTime)
        total = total - yearTime;
      }
    }
    timeArray.push(total)
    offsets.push(this.getDayOffSet(yearArray[yearAge]))
    this.setState({ currentYearTime: total })
    for (var i = yearAge + 1; i < 80; i++) {
      timeArray.push(0)
      offsets.push(this.getDayOffSet(yearArray[i]))
    }
    this.setState({ time })
    this.setState({ offsets })
    this.setState({ yearArray })
    this.setState({ timeArray })
    this.setState({ loading: false })
    this.setState({yearAge})
    timer = setInterval(this.updateTime, 1000)
    var t1 = performance.now();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
  }

  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  getDayOffSet = (year) => {
    var yearStartDate = new Date(year + "-01-01 00:00:00")
    var day = yearStartDate.getDay() - 1;
    if (day === -1) {
      day = 6;
    }
    return day
  }

  updateTime = () => {
    var array = this.state.timeArray;
    var yearAge = this.state.yearAge
    array[yearAge]++
    this.setState({ time: this.state.time + 1, timeArray: array })
  }

  resetState = () => {
    this.setState({
      day: "01",
      month: "01",
      year: 0,
      time: 0,
      currentYearTime: 0,
      offsets: [],
      yearArray: [],
      timeArray: [],
      yearAge: 0,
      loading: false,
    })
    clearInterval(timer)
  }



  render() {
    var { timeArray, yearArray, offsets, loading, time } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Vita Life Calendar
            {time > 0 && <Button onClick={this.resetState}
              disabled={this.state.year === 0}
              style={{ position: "absolute", top: "20px", left: "5px", marginLeft: "10px"}}
              iconBefore="circle-arrow-left">Reset</Button>}
          </h1>
          {time === 0 && < h2>Please Enter Your Date of Birth to Begin</h2>}
          {time === 0 && <div className="options">
            <Select style={{ margin: "10px" }} width={80} onChange={event => this.setState({ day: event.target.value })} disabled={loading}>
              {dayOptions.map((a, i) => {
                return <option key={i}>{a}</option>
              })}
            </Select>
            <Select style={{ margin: "10px" }} width={80} onChange={event => this.setState({ month: event.target.value })} disabled={loading}>
              {monthOptions.map((a, i) => {
                return <option key={i}>{a}</option>
              })}
            </Select>
            <Select style={{ margin: "10px" }} width={80} onChange={event => this.setState({ year: event.target.value })} disabled={loading}>
              {yearOptions.map((a, i) => {
                return <option key={i}>{a}</option>
              })}
            </Select>
            {time === 0 && <Button onClick={this.computeTime} disabled={this.state.year === 0}>Submit</Button>}
          </div>}
        </header>
        {time > 0 && !loading &&
          <div className="info">
            <div className="infoheader">
              <Icon icon="time"/>
              <h2>LifeTime</h2>
            </div>
            <div className="stats">
              <div className="stat">{this.state.time} seconds</div>
              <div className="stat">{Math.floor(this.state.time / 60)} minutes</div>
              <div className="stat">{Math.floor(this.state.time / 3600)} hours</div>
              <div className="stat">{Math.floor(this.state.time / 86400)} days</div>
              <div className="stat">{Math.floor(this.state.time / (604800))} weeks</div>
              <div className="stat">{Math.floor(this.state.time / (30.436875 * 86400))} months</div>
              <div className="stat">{Math.floor(this.state.time / (86400 * 365.25))} years {Math.floor((this.state.time / (30.436875 * 86400))) % 12} months</div>
            </div>
          </div>}
        {/*<Week weekTime={500000} offset={0} style={{ transform: "scale(0.05)" }}  id={53}/>*/}
        {loading && <div className="loader">
          <span style={{ marginBottom: "40px" }}>Building your Calendar...</span>
          <Spinner size={40} style={{ transform: "scale(3)" }} />
        </div>}
        {time > 0 && !loading && <Calendar timeArray={timeArray} yearArray={yearArray} offsets={offsets} time={this.state.time}/>}
      </div>)

  }

}

class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        initTime: this.props.time
    }
}

  shouldComponentUpdate() {
    return (this.props.time - this.state.initTime % 3600) === 0
  }
  
  render() {
    var {timeArray, yearArray, offsets, time} = this.props
    return (
      <div className="container">
          <div className="label">
            <span>Year | Age</span>
            <span style={{left: "10.5%"}}>Feb</span>
            <span style={{left: "18%"}}>Mar</span>
            <span style={{left: "26%"}}>Apr</span>
            <span style={{left: "35%"}}>May</span>
            <span style={{left: "43%"}}>Jun</span>
            <span style={{left: "51%"}}>Jul</span>
            <span style={{left: "59%"}}>Aug</span>
            <span style={{left: "67%"}}>Sep</span>
            <span style={{left: "75%"}}>Oct</span>
            <span style={{left: "83%"}}>Nov</span>
            <span style={{left: "91%"}}>Dec</span>
            <span style={{left: "99%"}}>Jan</span>
          </div>
          {timeArray.map((t, i) => {
            return <Year yearTime={t} year={yearArray[i]} reverse={i === 0} offset={offsets[i]} age={i} key={i} />
          })}
        </div>)
  }
}

export default App;
