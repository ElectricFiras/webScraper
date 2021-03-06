import React, { Component } from 'react';
import logo from './logo.svg';
import './Home.css';
import $ from 'jquery';
import axios from 'axios'
import Signup from './Signup'

class Home extends Component {

  constructor(props) {
    super(props);

    this.state ={
      state : 'Firasaaaaaaaaaaaasss'
    } 
    this.subject = {};
    this.subjects = []
    this.links = []
    this.click = this.click.bind(this)
    this.isLoading = false;
    this.fake = true;
    this.show = false;
  }

  click() {

  axios.get('/hello').then((res) => {
    console.log(res.data)
    this.show = true;
    this.isLoading = !this.isLoading
    for (var i = 0; i < res.data[0].length; i++){
      if (res.data[0][i].slice(0,7) === "CHAPTER"){
        if (this.subject['title']){
          this.subjects.push(this.subject)
          this.subject = {};
        }
        this.subject['title'] = res.data[0][i]
        this.subject['sub'] = [];
      }else {
        this.subject['sub'].push(res.data[0][i])
      }
    }
    for (var i = 0; i < res.data[1].length; i++){
      if (res.data[1][i].slice(10,16) === 'how_to'){
        this.links.push(res.data[1][i])
      }
    }
    console.log(this.links)
    console.log('Subjects: ', this.subjects)
    this.setState({
      state : [res.data]
    })
  }).catch((err) => {
    console.log('err', err)
  })
  this.forceUpdate()    
  }

  render() {
      return (

    <div className="App">
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
    </header>
    <h1>Hi {this.props.user}</h1>
    <h3> DON'T REFRESH</h3>
    <p className="App-intro">
    To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <button onClick = {this.click}>click</button>
    {this.show ? (<img src = "https://i.imgflip.com/1zd99e.jpg" />): (<p/>)}
    <div>{this.subjects.map((sub) => 
    <li class = 'title'>{sub.title} {sub.sub.map((tit) => 
    <li class = 'subTitle'>{tit}</li>)}</li>)}</div>
    <h2>why it's not showing ?>??!</h2>
    <h3>Please work ?! maybe it's broken</h3>
    <h4>hye!!</h4> 
    </div>
        )
  }
}

export default Home;
