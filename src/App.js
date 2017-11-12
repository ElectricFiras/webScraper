import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {

  click() {
    $.ajax({
      url: '/hello',
      data: {
         format: 'json'
      },
      error: function() {
         console.log('error')
      },
      dataType: 'jsonp',
      success: function(data) {
        console.log("success")
      },
      type: 'GET'
   });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick = {this.click}>click</button>
        <h1>Why ??!!!asdasd</h1>
        <h2>why it's not showing ?>??!</h2>
        <h3>Please work ?! maybe it's broken</h3>
        <h4>it's the cash problem !!</h4>
        <h5>no seruisly</h5>
      </div>
    );
  }
}

export default App;
