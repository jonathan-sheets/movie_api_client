import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';

export function RegistrationView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [BirthDate, setBirthDate] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, BirthDate);
    props.onLoggedIn(Username);
  };

  return (
    <div className="registration-view">
      <h3>Sign Up</h3>

      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername" className="registration-item">
          <Form.Label>Create Username: </Form.Label>
          <Form.Control type="text" placeholder="Username" value={Username} onChange={(e) => setUsername(e.target.value)} />
          <Form.Text className="text-muted">Must be alphanumeric and contain at least 5 characters</Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="registration-item">
          <Form.Label>Choose a Password: </Form.Label>
          <Form.Control type="text" placeholder="Password" value-={Password} onChange={(e) => setPassword(e.target.value)} />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail" className="registration-item">
          <Form.Label>Enter Email Address: </Form.Label>
          <Form.Control type="text" placeholder="example@gmail.com" value={Email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicBirthdate" className="registration-item">
          <Form.Label>Enter Date of Birth:</Form.Label>
          <Form.Control type="text" placeholder="YYYY/MM/DD" value={BirthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </Form.Group>

        <Button type="submit" variant="primary" className="button-registration" onClick={handleRegister}>Submit</Button>
      </Form>
    </div>
  )
};

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired
  })
};