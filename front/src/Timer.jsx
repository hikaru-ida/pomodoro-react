
import React from 'react';
import * as Constants from './Constants.jsx';
import './Timer.scss'
const timeTypes = Constants.timeTypes;
const localKeys = Constants.localKeys;

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      isRun: false,
      numUntilLongBreak: this.getInitialNumUntilLongBreak(),
      timeType: timeTypes["work"],
    }
    this.runTimer = this.runTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.setDefaultTime();
  }

  setDefaultTime() {
    const minutes = localStorage.getItem(timeTypes['work']);
    const time = minutes != null ? minutes * 1 : 20 * 60;
    this.setState({time: time});
  }

  getInitialNumUntilLongBreak() {
    const num = localStorage.getItem(localKeys["numUntilLongBreak"]);
    if(num == null) { return Constants.DEFAULT_NUM_UNTIL_LONG_BREAK; }
    return num - 1;
  }

  _getNewTimeType(num, timeType) {
    if(timeType !== timeTypes['work']) return timeTypes['work'];
    if(num === 0) return timeTypes['longBreak'];
    return timeTypes['shortBreak'];
  }

  _getNewNumUntilLongBreak(num, preTimeType) {
    if(this._getNewTimeType(num, preTimeType) !== timeTypes['work']) return num;
    //if(num === 0) return localStorage.getItem(localKeys['numUntilLongBreak']);
    if(num === 0) return this.getInitialNumUntilLongBreak();
    return num - 1;
  }


  prepareNewTimer() {
    console.log("numUntilLongBreak: " + this.state.numUntilLongBreak);

    this.setState((state, _) => ({
      isRun: true,
      time: localStorage.getItem(this._getNewTimeType(state.numUntilLongBreak, state.timeType)),
      numUntilLongBreak: this._getNewNumUntilLongBreak(state.numUntilLongBreak, state.timeType),
      timeType: this._getNewTimeType(state.numUntilLongBreak, state.timeType)
    }));
  }

  uploadSpendTime() {
    const method = "POST";
    const obj = {spend_seconds: localStorage.getItem(timeTypes['work'])};
    const body = JSON.stringify(obj);
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    fetch("http://localhost:50080/reports", {method: method, body: body, mode: 'cors'})
      .then(response => {
        if(response.ok) {
          console.log("ok")
        } else {
          console.log("no")
        }
      })
  }


  tick() {
    if(this.state.time === 0) {
      if(this.state.timeType === timeTypes['work']) this.uploadSpendTime();
      this.prepareNewTimer();
      return;
    }

    if(this.state.isRun) {
      this.setState({ time: this.state.time -1 });
    }
  }

  _restartInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(this.tick, 1000);
  }

  runTimer() {
    if(this.state.isRun) return;

    this._restartInterval();
    this.setState({ isRun: true });
  }

  stopTimer() {
    this.setState({ isRun: false });
  }

  resetTimer() {
    this.resetState({})
  }

  formatTime(seconds) {
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);
    const timeFormated = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    return timeFormated;
  }

  render() {
    return(
      <div className="main">
          <div className="container display timer">
            <span className="time">{this.formatTime(this.state.time)}</span>
          </div>
          <div className="container">
            <div className="controlsPlay">
              <button className="play btnIcon btn btn-primary" onClick={this.runTimer}>start</button>
              <button className="stop btnIcon btn btn-primary" onClick={this.stopTimer}>stop</button>
            </div>
          </div>
        </div>
    );
  }
}