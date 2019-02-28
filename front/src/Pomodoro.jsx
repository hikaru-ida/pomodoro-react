import React from 'react';
import {render} from 'react-dom';
import Select from './Select';
import Config from './Config'; 
import Timer from './Timer';

export default class Pomodoro extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }


  componentDidMount() {
  }

  togglePlay() {
    if(this.state.play)
      return this.reset();

    return this.play();
  }

  render() {

    return (
      <div className="pomodoro">

        {/* Main section
        ------------------------------- */}
        <Timer />
        {/* main */}

        {/* Bottom section
        ------------------------------- */}
        <div className="bottomBar">

          <div className="controls">
            <div className="container">


            </div> {/* container */}
          </div> {/* controls */}

          <Config
          />

        </div> {/* bottomBar */}

      </div> /* bottomBar */
    );
  }
};