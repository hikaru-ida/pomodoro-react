import React from 'react';
import {render} from 'react-dom';
import Select from './Select';
import * as Constants from './Constants.jsx';
import { timingSafeEqual } from 'crypto';
const timeTypes = Constants.timeTypes;
const localKeys = Constants.localKeys;

export default class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: 0,
      shortBreak: 0,
      longBreak: 0,
      numUntilLongBreak: 0
    }
    this.setConfigToLocalStorage = this.setConfigToLocalStorage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // getLocalStorage
  }

  getLocalStorage() {
  }

  setConfigToLocalStorage(item, event) {
    const value = event.target.value
    localStorage.setItem('config-'+ item, value);
  }

  updateConfig(key, event) {
    const value = event.target.value;
    this.setState({[key]: value});
    console.log(this.state.work)
  }

  handleSubmit(event) {
    event.preventDefault()
    localStorage.setItem([timeTypes['work']], this.state.work);
    localStorage.setItem([timeTypes['shortBreak']], this.state.shortBreak);
    localStorage.setItem([timeTypes['longBreak']], this.state.longBreak);
    localStorage.setItem([localKeys['numUntilLongBreak']], this.state.numUntilLongBreak);
    console.log(this.state.work)
  }

  render() {
    return(
      <div className="config col-4">
        <form onSubmit={this.handleSubmit} >
          <Select maxMinutes={Constants.MAX_WORK_MINUTES} timeType={timeTypes['work']} updateConfig={this.updateConfig.bind(this, 'work')}/>
          <Select maxMinutes={Constants.MAX_SHORT_BREAK_MINUTES} timeType={timeTypes['shortBreak']} updateConfig={this.updateConfig.bind(this, 'shortBreak')} />
          <Select maxMinutes={Constants.MAX_LONG_BREAK_MINUTES} timeType={timeTypes['longBreak']} updateConfig={this.updateConfig.bind(this, 'longBreak')} />
          <Select maxMinutes={8} timeType={localKeys["numUntilLongBreak"]} updateConfig={this.updateConfig.bind(this, 'numUntilLongBreak')} />
        <input type="submit" value="更新" className="btn btn-primary" />
        </form>
      </div>
    )
  }
}