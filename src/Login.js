import React, { Component } from 'react';
import './Login.css'
import axios from 'axios'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
        wrong : false
    }
    this.handle = this.handle.bind(this)

  }
  toSignUp = () => {
    this.props.toLogin();
  }
  handle(e){
      this.username = e.target.value
  }
  passHandle = (e) => {
    this.password = e.target.value
  }

  clickme = () => {
      console.log(this)
      var change = this.props.toHome
      var changee = () => {
          this.setState({
              wrong : true
          })
      }
      var name = this.username
      
      axios.get('/login', {
        params: {
          username: this.username,
          password: this.password
        }
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
  }

  render() {
    return (
      <div>
       <h1>Login</h1>
       <p>User name</p>
       <input type="text" value = {this.username} onChange={this.handle}/>
       <p>Password</p>
       <input type="password" value = {this.password} onChange={this.passHandle}/>
        <br/>
       <button onClick={this.clickme}>LogIn</button>

       {this.state.wrong ? (<p>Wrong !!<br/> GREAT, now you have to refresh <br/> You only had on job man!! <br/><br/>
       <h6>Hint: you can press on sign up down there and then log in again</h6></p>): (<p></p>)}
       <br/>
       <p>or go to <button onClick = {this.toSignUp}>SignUp</button></p>

      </div>
    );
  }
}

export default Login;
