import React from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import TiTimes from 'react-icons/lib/ti/times';


const LoginSubmissionForm = (props) => {
  return (
    <div className="submission-form">
      <a className="close-button" onClick={() => {props.setStore({modalLogin: false, failLogin: ''})}}><TiTimes /></a>
      <form name="login" onSubmit={props.onLoginHandler}>
        <FormControl className="input-field" name="username" id="username" type="text" placeholder="Username" />
        <FormControl className="input-field" name="password" id="password" type="password" placeholder="Password" />
        <Button type="submit">Log In</Button>
      </form>
    </div>
  );
}

export default LoginSubmissionForm;
