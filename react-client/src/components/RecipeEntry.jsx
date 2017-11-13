import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardGroup,
CardSubtitle, CardBody } from 'reactstrap';
import { Parallax } from 'react-parallax';
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline';


const RecipeEntry = (props) => {
  var imgLink = props.data.image;

  var title = props.data.title;

  var ingredientsArray = [];
  // https://spoonacular.com/recipes/hearty-chicken-chorizo-kale-bean-and-farro-soup-474468
  if (props.data.hasOwnProperty("usedIngredients")) {
    for (var n = 0; n < props.data.usedIngredients.length; n++) {
      ingredientsArray.push(<li key={'li-' + n} value={n}>{props.data.usedIngredients[n].name}</li>);
    }
  }

  if (props.data.hasOwnProperty("missedIngredients")) {
    for (var n = 0; n < props.data.missedIngredients.length; n++) {
      ingredientsArray.push(<li className="missing-ingredient">{props.data.missedIngredients[n].name}</li>);
    }
  }

  var recipeUrl = props.data.image.slice(0, -4);
  var r = recipeUrl.indexOf('recipeImages/');
  recipeUrl = recipeUrl.slice(0, r) + recipeUrl.slice(r + 13);
  console.log("Url string: ", recipeUrl);

  return (
    <div className="recipe-entry">
      <CardGroup>
        <Card style={{"border":"1px solid #cccccc", "padding": "1em", "margin":"2em 0em 2em 0em", "margin-top": "2em"}}>
          <a href={recipeUrl}><Parallax className="recipe-image img-hover" bgImage={imgLink} strength={100}></Parallax></a>
          <CardBody>
            <div style={{"display":"flex", "flex-direction":"column", "height": "10em"}}>
              <div style={{"flex": "grow"}}>
                <a href={recipeUrl}>
                  <CardTitle className="recipe-title">{title}</CardTitle>
                </a>
              </div>
              <div style={{"flex": "1", "overflow-y":"auto"}}>
              <CardText className="recipe-ingredients" style={{"font-size": "1em"}}>{ingredientsArray.map((element, index) => {
                return element;
              })}</CardText>
              </div>
            </div>
            <div className="center">
              <a onClick={(event) => {props.onFavoriteHandler(event, props.data)}}>
                <span className="recipe-favorite">
                  <TiHeartFullOutline />
                </span>
              </a>
            </div>
          </CardBody>
        </Card>
      </CardGroup>
    </div>);
}

export default RecipeEntry;
