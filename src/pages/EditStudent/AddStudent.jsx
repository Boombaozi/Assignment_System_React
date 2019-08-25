import React, { Component } from 'react';
import AddForm from './components/AddForm';

export default class EditStudent extends Component {
  render() {
    console.log("数据为");
    console.log(this.props.location.state);

    return (
      <div>
        <AddForm  value={this.props.location.state}  />
      </div>
    );
  }
}
