import React from 'react';
import RecipeEntry from './RecipeEntry.jsx';

export default class RecipeRows_Test extends React.Component {
  constructor(props) {
    super(props);
    this.createRecipeRow = this.createRecipeRow.bind(this);
  }

  createRecipeRow() {
    var arr = [];
    for (var n = this.props.row * 3; n < this.props.row * 3 + 3; n++) {
      if (this.props.data[n] !== undefined) {
        arr.push(<RecipeEntry key={n} data={this.props.data[n]} />);
      }
    }
    return <span>{arr}</span>;
  }

  render() {
    return <tr>{this.createRecipeRow()}</tr>
  }
}
