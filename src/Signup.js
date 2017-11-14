import React, { Component } from 'react';
import App from './App'
import axios from 'axios'
import './Signup.css'

class Signup extends Component {

  constructor(props) {
    super(props);
    this.clickme = this.clickme.bind(this)
    this.state = {
      wrong : false
  }

  }

  toLogin = () => {
    console.log('hi')
    console.log(this.props)
    this.props.toLogin();
  }
  userHandle = (e) => {
      this.username = e.target.value
  }
  passHandle = (e) => {
    this.password = e.target.value
  }

  clickme(){
    console.log(this.password)
      console.log(this.username)
      var change = this.props.toHome
      var changee = () => {
          this.setState({
              wrong : true
          })
      }
      var name = this.username
      axios.post('/login', {
        username: this.username,
        password: this.password
      })
      .then(function (response) {
        if (response.data === 'Hi'){
          console.log('here')
          console.log(this)
          change(name)
          return;
      } else {
          console.log('noooooo')
          changee()
      };
      })
      .catch(function (error) {
        console.log(error);
      });
      this.username = '';
      console.log(this.username)
  }

  render() {
    return (
      <div>
       <h1>SignUp</h1>
       <p>User name</p>
       <input type="text" value = {this.username} onChange={this.userHandle}/>
       <p>Password</p>
       <input type="password" value = {this.password} onChange={this.passHandle}/>
        <br/>
        <br/>
       <button onClick={this.clickme}>SingUp</button>
       {this.state.wrong ? (<p>Wrong !! username is taken<br/> You thought I wouldn't check for that didn't you ?! -_- <br/> You only had on job man!! now you have to refresh <br/><br/>
       <h6>Hint: you can press on login down there and then signup again</h6></p>): (<p></p>)}

       <p>or go to <button onClick = {this.toLogin}>LogIn</button></p>
      </div>
    );
  }
}

export default Signup;
