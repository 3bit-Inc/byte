import React from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <DropdownButton title={this.props.title} id={"search-dropdown-button"}>
        <MenuItem onClick={() => {
          this.props.setStore({searchMode: 'Strict'})}} eventKey="1">Strict
        </MenuItem>
        <MenuItem onClick={() => {
          this.props.setStore({searchMode: 'Loose'})}} eventKey="1">Loose
        </MenuItem>
      </DropdownButton>
    );
  }
}
