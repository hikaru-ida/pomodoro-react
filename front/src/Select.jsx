import React from 'react';
import * as Constants from './Constants.jsx';

export default class Select extends React.Component {
  constructor(props) {
    super(props);
  }

  getConfigFromLocalStorage(item) {
    return localStorage.getItem(item)
  }


  render() {
    const options = Array(this.props.maxMinutes)
                      .fill(null)
                      .map((_, i) =>
                        <option value={i+1}>
                          {i+1}
                        </option>
                        )

                        
    return(
      <div className="form-group">
        <label className="control-label">{this.props.timeType}</label>
        <select  
          defaultValue={this.getConfigFromLocalStorage(this.props.timeType)}
          onChange={this.props.updateConfig}
          className="form-control"
        >
          {options}
        </select>
      </div>
    )
  }
}