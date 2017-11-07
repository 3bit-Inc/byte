import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardGroup,
CardSubtitle, CardBody } from 'reactstrap';
import { Parallax } from 'react-parallax';
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline';


const RecipeEntry_Test = (props) => {
  // Create new image link with higher resolution
  var imgLink = props.data.imageUrlsBySize["90"];
  var imgSizePropertyIndex = imgLink.indexOf("=s90-c");
  imgLink = imgLink.slice(0, imgSizePropertyIndex) + "=s1080-c";

  // Limit title to 25 characters
  if (props.data.recipeName.length > 19) {
    var title = props.data.recipeName.slice(0, 19) + "...";
  } else {
    title = props.data.recipeName;
  }

  var ingredientsArray = [];
  for (var n = 0; n < props.data.ingredients.length; n++) {
      if (props.data.ingredients[n].length > 32) {
        ingredientsArray.push(<li>{props.data.ingredients[n].slice(0, 32) + "..."}</li>);
      } else {
        ingredientsArray.push(<li>{props.data.ingredients[n]}</li>);
      }
    }

  return (
    <div className="recipe-entry" id={props.id}>
      <CardGroup>
        <Card>
          <Parallax className="recipe-image img-hover" bgImage={imgLink} strength={100}></Parallax>
          <CardBody>
            <CardTitle className="recipe-title">{title}</CardTitle>
            <CardText className="recipe-ingredients">{ingredientsArray.map((element, index) => {
              return element;
            })}</CardText>
            <div className="center">
              <a href="google.com">
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

export default RecipeEntry_Test;
