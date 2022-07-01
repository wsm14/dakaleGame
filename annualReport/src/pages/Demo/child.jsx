import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      data: 0,
    };
    this.inputRef = React.createRef();
  }

  buttonClick = () => {
    console.log(this.state.data);
    this.props.getValue(this.state.data);
  };

  changeValue = (e) => {
    this.setState({
      data: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={(e) => {
            this.changeValue(e);
          }}
          value={this.state.data}
          ref={this.inputRef}
        />
        <button onClick={this.buttonClick}>点击按钮</button>
      </div>
    );
  }
}
