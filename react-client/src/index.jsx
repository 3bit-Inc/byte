// Standard libraries
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

// API
import { searchSpoonacular } from './lib/searchSpoonacular.js';
import { searchYummly } from './lib/searchYummly.js';
import { spoonacularTrivia } from './lib/spoonacularTrivia.js';

// Data
import DEFAULT_TAGS from './data/DEFAULT_TAGS.js';
import SAMPLE_DATA from './data/SAMPLE_DATA.js';

// Components
import Footer from './components/Footer.jsx';
import LoadingText from './components/LoadingText.jsx';
import LoginSubmissionForm from './components/LoginSubmissionForm.jsx';
import NavBar from './components/NavBar.jsx';
import RecipeList from './components/RecipeList.jsx';
import Search from './components/Search.jsx';
import SignupSubmissionForm from './components/SignupSubmissionForm.jsx';

// Library components
import { Button, Jumbotron } from 'react-bootstrap';
import { Parallax } from 'react-parallax';
import Modal from 'react-modal';

const SERVER_URL = "http://127.0.0.1:3000";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overflow              : 'none'
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      failLogin: '',
      failSignup: '',
      items: [],
      loadingText: false,
      loggedIn: false,
      modalLogin: false,
      modalSignup: false,
      query: '',
      searchMode: "Loose",
      randomTrivia: "Did you know...",
      tags: DEFAULT_TAGS,
      userFavorites: [],
      userid: null,
      username: null,
      view: 'home',

    }

    // Method bindings
    this.handleTagAdd = this.handleTagAdd.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.modalSignup = this.modalSignup.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.onFavoriteHandler = this.onFavoriteHandler.bind(this);
    this.onLoginHandler = this.onLoginHandler.bind(this);
    this.onSignupHandler = this.onSignupHandler.bind(this);
    this.randomTrivia = this.randomTrivia.bind(this);
    this.setStore = this.setStore.bind(this);

    this.randomTrivia();
  }

  // Sets random trivia on footer.
  randomTrivia() {
    spoonacularTrivia((data) => {
      this.setState({randomTrivia: "Did you know... " + data.text});
    });
  }


  setStore(state) {
    this.setState(state)
  }

  onFavoriteHandler(event, data) {
    event.preventDefault();
    var favorites = this.state.userFavorites.slice();
    favorites.push(data);
    var favoriteRecipe = data;
    this.setState({
      userFavorites: favorites
    });
    //UsersRecipes.addFavorites
    alert('Added to favorites!');
    console.log('Username is ', this.state.username);
    var favorite = {
      recipe: data, 
      user_id: this.state.userid
    };

    
    $.post('/favorites', favorite, (result) => {
    console.log('POST REQUEST DETECTED');
    });
   
  }

  onLoginHandler(event) {
    event.preventDefault();
    var userInput = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    if( userInput.username === '') {
      this.setState({failLogin:'Username field cannot be empty'})
      return;
    }
    $.post('/login', userInput, (data) => {
      if(data.length !== 0) {
        if(data[0].password === userInput.password) {
          $.post('/useringredients', {userid:data[0].id}, (data) => {
            var tags = this.state.tags.slice()
            var id = tags.length+1
            data.forEach( (ingredient) => {
              console.log();
              tags.push({id:tags.length++,text:ingredient.ingredient, ingredient_id:ingredient.id})
              // this.handleTagAdd(ingredient.ingredient)
            })
            this.setState({tags:tags})
          })
          this.setState({
            username: userInput.username,
            userid: data[0].id,
            loggedIn: true,
            modalLogin: false
          })
        } else{
          this.setState({failLogin:'Incorrect password'})
        }
      } else {
        this.setState({failLogin:'Username does not exist'})
      }
    })
  }

  onSignupHandler(event) {
    event.preventDefault();
    var userInput = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    if( userInput.username === '') {
      this.setState({failSignup:'Username field cannot be empty'})
      return;
    } else if (userInput.password === '') {
      this.setState({failSignup:'Password must be at least one character'})
      return;
    }
    var found = false;
    $.get('/users', (data) => {
      data.forEach( (user) => {
        if(user.name === userInput.username) {
          found = true;
        }
      })
      if(!found) {
        $.post('/signup', userInput, (data) => {})
        // this.closeSignup();
        this.setState({failLogin: 'Created, please Login', modalLogin: true, modalSignup: false})
      } else {
        this.setState({failSignup: 'Username already exists'})
      }
    })

  }

  onSearchHandler(e) {
    e.preventDefault();
    var options = {};
    // options.ingredients = this.state.query.split(", ");
    var tags = this.state.tags.slice()
    tags = tags.map( (tag) => {
      return tag.text
    })
    options.ingredients = tags;
    var queryArray = options.ingredients;
    this.setState({loadingText: true});
    searchSpoonacular(options, (matches) => {
      var data = [];
      if (this.state.searchMode === "Strict") {
        for (var n = 0; n < matches.length; n++) {
          if (matches[n].missedIngredientCount === 0) {
            data.push(matches[n]);
          }
        }
      } else if (this.state.searchMode === "Loose") {
        data = matches;
      }
      this.setState({data: data, loadingText: false});
    });
  }

  favoritesView() {
    return (
      <div className="container">
        <div style={{"padding": "5em"}}/>
        <NavBar setStore={this.setStore} modalSignup={this.modalSignup} modalLogin={this.modalLogin} username={this.state.username} loggedIn={this.state.loggedIn} />
        <RecipeList data={this.state.userFavorites} onFavoriteHandler={this.onFavoriteHandler}/>
      </div>
    );
  }

  // modalLogin() {
  //   this.setState({
  //     modalSignup: false,
  //     modalLogin: true
  //   })
  // }

  modalSignup() {
    if(this.state.loggedIn) {
      this.setState({
        loggedIn: false,
        username: null,
        tags: DEFAULT_TAGS
      })
    } else {
      this.setState({
        modalLogin: false,
        modalSignup: true
      })
    }
  }

  handleTagAdd(tag) {
    tag = tag + '  '
    var tags = this.state.tags.slice()
    var tagId = tags.length+1
    tags.push({id:tagId, text:tag})
    var ingredients = {}
    ingredients.userid = this.state.userid;
    ingredients.ingredient = tag;
    if(this.state.userid) {
      $.post('/ingredients', ingredients, (data) => {} );
    }
    this.setState({tags:tags})
  }

  handleTagDelete(tag) {
    var tags = this.state.tags.slice()
    tags.splice(tag,1);
    var removeIngredient = tags.splice(tag,1)
    var removeUserIngredient = { userId:this.state.userid, ingredientId:removeIngredient[0].ingredient_id,}
    if(this.state.userid) {
      $.post('/removeIngredient', removeUserIngredient, (data) => {})
    }
    this.setState({tags:tags})
  }

  homeView() {
    if (this.state.loggedIn) {
      var username = this.state.username;
      var userDisplay = <div style={{'paddingTop':'25vh'}}/>;
    } else {
      var username = "Not Logged In";
      var userDisplay = (
          <Parallax className="main-card" bgImage="https://i.imgur.com/hpz3tXZ.jpg" strength={400}>
            <div style={{'display':'flex', 'alignItems':'center', 'flexDirection':'column', 'height':'100vh'}}>
              <div style={{'flex':'1'}}/>
              <div style={{'flex': '1'}}><h1 className="subtitle"><div>Why run to the grocery store when you have all the ingredients you need at home? Here at Byte, we help you see the potential of your pantry.</div></h1></div>
              <div style={{'flex':'1'}}/>
            </div>
          </Parallax>
        );
    }

    return (
    <div>
      <NavBar setStore={this.setStore} modalSignup={this.modalSignup} username={this.state.username} loggedIn={this.state.loggedIn} />
      {userDisplay}
      <div className="container">
        <Modal
          isOpen={this.state.modalLogin}
          style={customStyles}
          contentLabel="login"
        >
          <LoginSubmissionForm setStore={this.setStore} onLoginHandler={this.onLoginHandler}/>
          <div id='login-fail'>{this.state.failLogin}</div>
        </Modal>

        <Modal
          isOpen={this.state.modalSignup}
          contentLabel="signup"
          style={customStyles}
        >

          <SignupSubmissionForm setStore={this.setStore} onSignupHandler={this.onSignupHandler}/>
          <div id='signup-fail'>{this.state.failSignup}</div>
        </Modal>
        <Search clickHandler={this.onSearchHandler} handleTagDelete={this.handleTagDelete} handleTagAdd={this.handleTagAdd} tags={this.state.tags} setStore={this.setStore} appState={this.state}/>
        {(this.state.loadingText) ? (<LoadingText />) : null}
        <RecipeList data={this.state.data} onFavoriteHandler={this.onFavoriteHandler}/>
      </div>
    </div>);
  }

  render () {
    if (this.state.view === 'home') {
      var view = this.homeView();
    } else if (this.state.view === 'favorites') {
      var view = this.favoritesView();
    }

    return (
      <div>
        {view}
        <Footer trivia={this.state.randomTrivia}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
