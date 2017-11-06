import React from 'react';
import $ from 'jquery';

export default class _Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'test component',
      stuff: 'test'
    }
    this.buttonAction = this.buttonAction.bind(this);
    this.getButtons = this.getButtons.bind(this);
  }

  buttonAction(url) {
    console.log('I\'m being pressed!');
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
        <div>{this.getButtons()}</div>
        <h1>{this.state.stuff}</h1>
      </div>;
  }
}
