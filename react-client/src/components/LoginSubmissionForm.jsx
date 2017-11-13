import React from 'react';
import {InputGroup, FormControl, Button} from 'react-bootstrap';

const LoginSubmissionForm = (props) => {
  return (
    <div className="submission-form">
      <form name="login" onSubmit={props.onLoginHandler}>
        <FormControl className="input-field" name="username" id="username" type="text" placeholder="Username"/>
        <FormControl className="input-field" name="password" id="password" type="password" placeholder="Password"/>
        <Button type="submit">Log In</Button>
      </form>
    </div>
  );
}

export default LoginSubmissionForm;
