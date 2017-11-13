import React from 'react';
import RecipeEntry from './RecipeEntry.jsx';

export default class RecipeList extends React.Component {
  constructor(props) {
    super(props);
    this.createRecipeTable = this.createRecipeTable.bind(this);
  }

  createRecipeTable() {
    if (this.props.data.length === 0) {
      return;
    }
    var table = [];
    for (var n = 0; n < 9; n++) {
      if (this.props.data[n] !== undefined) {
        table.push(<RecipeEntry key={"recipe-entry-" + n} value={n} data={this.props.data[n]} onFavoriteHandler={this.props.onFavoriteHandler} />);
      }
    }
    return table;
  }

  render() {
    return <div className="recipe-list" style={{"paddingBottom": "4em"}}>{this.createRecipeTable()}</div>
  }
}
