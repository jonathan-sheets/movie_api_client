import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './login-view.scss';

function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ usernameErr, setUsernameErr ] = useState({});
  const [ passwordErr, setPasswordErr ] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
    // Send a request to the server for authentication
    axios.post('https://flixnet-2020.herokuapp.com/login', {
      Username: username,
      Password: password,
    })
    .then((response) => {
      const data = response.data;
      props.onLoggedIn(data);

      props.setUser(username); 
    })
    .catch((e) => {
      console.log('no such user')
      alert('Invalid username or password');
    });
  };
}


  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    let isValid = true;

    if (username.trim().length < 1) {
      usernameErr.usernameMissing = 'Username is required to login.';
      isValid = false;
    }
    if (username.trim().length < 5 && username.trim().length >= 1) {
      usernameErr.usernameShort = 'Username must be at least 5 characters.';
      isValid = false;
    }
    if (password.trim().length < 1) {
      passwordErr.passwordMissing = 'Password is required.';
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    return isValid;
  }

  return (
    <Container>
      <div className="login-heading">
      <h2>Welcome to FlixNET</h2>
      </div>
      <br />
      
      <Form className="login-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control 
            className="form-field"
            type="text" 
            placeholder="Enter username"
            required
            value={username} onChange={e => setUsername(e.target.value)}  
          />
          {Object.keys(usernameErr).map((key) => {
            return <div key={key} style={{ color: 'red' }}>{usernameErr[key]}</div>
          })}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control 
            className="form-field"
            type="password" 
            required
            placeholder="Enter password"
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          {Object.keys(passwordErr).map((key) => {
            return <div key={key} style={{ color: 'red' }}>{passwordErr[key]}</div>
          })}
        </Form.Group>
        <Button
          className="sign-in-button"
          variant="dark"
          type="submit"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Link to={`/register`}>
          <Button
            className="sign-up-button new-user"
            variant="dark"
          >
          New User Sign Up
          </Button>
        </Link>
      </Form>
    </Container>
  )
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

export default connect(null, { setUser })(LoginView);