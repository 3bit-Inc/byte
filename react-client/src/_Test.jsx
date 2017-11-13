import React from 'react';
import $ from 'jquery';
const SERVER_URL = "http://127.0.0.1:3000";

export default class _Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'test component',
      stuff: 'test'
    }
    this.buttonAction = this.buttonAction.bind(this);
    this.getButtons = this.getButtons.bind(this);
    this.getUserFormSignIn = this.getUserFormSignIn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUserFormSignIn() {
    return (<form name="login" onSubmit={this.handleSubmit}>
      <input name="username" id="username" type="text" placeholder="Username"></input>
      <input name="password" id="password" type="password" placeholder="Password"></input>
      <button type="submit">Login</button>
    </form>);
  }

  handleSubmit(event) {
    event.preventDefault();
    var userInput = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    $.ajax({
      url: SERVER_URL + '/login',
      type: 'POST',
      data: userInput,
      success: (username) => {
        this.setState({username: username});
      },
      error: (err) => {
        console.error('Error: Cannot submit login credentials to server.', err);
      }
    });
  }

  buttonAction(url) {
    $.ajax({
      url: url,
      success: (data) => {
        this.setState({
          stuff: JSON.stringify(data)
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  getButtons() {
    var buttons = <div><button onClick={(event) => {
      this.buttonAction('/');
    }}>Home</button>
    <button onClick={(event) => {
      this.buttonAction('/users');
    }}>Users</button>
    <button onClick={(event) => {
      console.log(this);
      this.buttonAction('/recipes');
    }}>Recipes</button>
    <button onClick={(event) => {
      this.buttonAction('/users_recipes');
    }}>Users/Recipes</button></div>
    return buttons;
  }


  render() {
      return <div style={{border: 'solid red 2px'}}>
        <h2>FOR TESTING PURPOSES.</h2>
        <p>Please feel free to remove _Test component from index.jsx when you are ready.</p>
        {this.state.username && <div>Username is {this.state.username}</div>}
        <div>{this.getUserFormSignIn()}</div>
        <div>{this.getButtons()}</div>
        <h1>{this.state.stuff}</h1>
      </div>;
  }
}
