import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import TiTimes from 'react-icons/lib/ti/times';


const SignupSubmissionForm = (props) => {
  return (
    <div className="submission-form">
      <a className="close-button" onClick={() => {props.setStore({modalSignup: false, failSignup: ''})}}><TiTimes /></a>
      <form name="signup" onSubmit={props.onSignupHandler}>
        <FormControl className="input-field" name="username" id="username" type="text" placeholder="Username" />
        <FormControl className="input-field" name="password" id="password" type="password" placeholder="Password" />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignupSubmissionForm;
