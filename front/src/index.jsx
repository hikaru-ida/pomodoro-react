import React from 'react';
import {render} from 'react-dom';

import Pomodoro from './Pomodoro.jsx';



class App extends React.Component {
      render () {
              return (
              <div>
                <Pomodoro />
              </div>
              );
            }
}

render(<App/>,  document.getElementById('app'));
