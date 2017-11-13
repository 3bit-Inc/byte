import React from 'react';
import {Jumbotron, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

const NavBar = (props) => {
  return (<div><Navbar fixedTop inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#" className="title" onClick={() => {props.setStore({view: 'home'})}}>Byte!</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        {((props.loggedIn) ? <NavItem eventKey={1} href="#" onClick={() => { props.setStore({view: 'favorites'})}}>Favorites</NavItem> : null)}
        <NavItem eventKey={2} href="#" onClick={() => {props.setStore({ modalSignup: false, modalLogin: true})}}> {(props.loggedIn) ? props.username : "Log In"}</NavItem>
        <NavItem eventKey={3} href="#" onClick={props.modalSignup}>{(props.loggedIn) ? "Log Out" : "Sign Up"}</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar></div>);
};

export default NavBar;
