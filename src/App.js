import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import signUp from './signUp.js'
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props);

    this.state ={
      state : 'Firasaaaaaaaaaaaasss'
    } 
    this.click = this.click.bind(this)
    this.shaow = this.shaow.bind(this)
  }

  click() {
  console.log(this)
  axios.get('/hello').then((res) => {
    console.log(this)
    this.setState({
      state : res.data
    })
    this.shaow();
  }).catch((err) => {
    console.log('err', err)
  })
  }

  shaow (props) {
    console.log('HHHH')
    return <h1>Here it issssss</h1>
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
        <signUp />
        <button onClick = {this.click}>click</button>
        <shaow></shaow>
        <div>{this.state.state}</div>
        <h2>why it's not showing ?>??!</h2>
        <h3>Please work ?! maybe it's broken</h3>
        <h4>hye!!</h4>
      </div>
    );
  }
}

export default App;
