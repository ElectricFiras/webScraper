import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import axios from 'axios';
import Signup from './Signup';
import Home from './Home';
import Login from './Login'

class App extends Component {

  constructor(props) {
    super(props);
    this.isLoggedIn = false;
    this.logInPage = false;
  }

  toLogin = () => {
    console.log('hero')
    console.log(this.logInPage)
    this.logInPage = !this.logInPage
    this.forceUpdate()
  }

  toHome = (user) =>{
    this.user = user
    this.isLoggedIn = true;
    this.forceUpdate()    
  }
  

  render() {
    return (
     <div>
      {!this.isLoggedIn ? (
        !this.logInPage ? (
        <Signup toLogin = {this.toLogin}
                toHome = {this.toHome}/>
        ) : (<Login toLogin = {this.toLogin} 
                    toHome = {this.toHome}/>)
      ) : (
        <Home user = {this.user}/>
      )}
    </div>
    );
  }
}

export default App;
