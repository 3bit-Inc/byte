import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RecipeList_Test from './components/RecipeList_Test.jsx';
import Search from './components/Search.jsx';
import RecipeList from './components/RecipeList.jsx';
import _Test from './_Test.jsx'; /* Feel free to remove me! */
import {searchYummly} from './lib/searchYummly.js';
import SAMPLE_DATA from './data/SAMPLE_DATA.js';
import { Jumbotron } from 'react-bootstrap';
import NavBar from './components/NavBar.jsx';
import { Parallax } from 'react-parallax';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      query: '',
      data: SAMPLE_DATA
    }

    this.onClickHandler = this.onClickHandler.bind(this);
    this.setStore = this.setStore.bind(this);
  }

  setStore(state) {
    console.log('SET STORE');
    this.setState(state)
  }

  componentDidMount() {
    $.ajax({
      url: '/users_recipes',
      success: (data) => {
        console.log('WHAT: ', data);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  onClickHandler(e) {
    e.preventDefault();
    console.log('QUERY STATE: ', this.state.query);
    var options = {};
    options.ingredients = this.state.query.split(",")
    searchYummly(options, (matches) => {
      console.log('API Data: ', matches);
      this.setState({data: matches});
    });
  }

  bootstrapView() {
    return (
    <div>
      <NavBar />
      <Parallax className="main-card" bgImage="http://chicago-woman.com/downloads/4988/download/Pantry%20Essentails-%20High%20Res.jpeg?cb=e59f0a5326ccffaeddcad2f813efb9ad" strength={400}>
        <div>
          <h1 className="subtitle"><br/>Why run to the grocery store when you have all the ingredients you need at home? Here at Byte, we help you see the potential of your pantry.</h1>
        </div>
      </Parallax>
      <div className="container">
        <Search clickHandler={this.onClickHandler} setStore={this.setStore}/>
        <RecipeList_Test data={this.state.data} />
      </div>
    </div>);
  }

  testComponents() {
    return (<div>
      <input type="text" onChange={(event) => {this.setState({query: event.target.value})}}></input>
      <button onClick={(event) => {
        this.onClickHandler();
      }}>API Test</button>
      <RecipeList_Test data={SAMPLE_DATA}/>
      <h1>User List</h1>
      <Search clickHandler={this.onClickHandler} setStore={this.setStore}/>
      <RecipeList items={this.state.items} />
      <_Test /> {/*Feel free to remove me!*/}
    </div>);
  }

  render () {
    return <div>{this.bootstrapView()}</div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
