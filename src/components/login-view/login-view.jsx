import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RegistrationView } from '../registration-view/registration-view';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  return (
    <div className="login-view">
      <h2>Welcome to FlixNET</h2>

      <Form className="login-form">
        <Form.Group controlId="formBasicUsername" className="login-item m-auto">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="login-item m-auto">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
        </Form.Group>
      </Form>

      <div className="login-buttons">
        <Button onClick={handleSubmit} variant="dark" type="submit">Login</Button>
        <Button variant="secondary">Register</Button>
      </div>
    </div>
    // <form>
    //   <label>
    //     Username:
    //     <input type="text" 
    //            value={username} 
    //            onChange={e => setUsername(e.target.value)} />
    //   </label>
    //   <label>
    //     Password:
    //     <input type="password" 
    //            value={password} 
    //            onChange={e => setPassword(e.target.value)} />
    //   </label>
    //   <button type="button" onClick={handleSubmit}>Submit</button>
    // </form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
