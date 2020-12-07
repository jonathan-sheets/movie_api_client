import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import axios from "axios";

import './update-view.scss';


export function UpdateView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});

  const handleUpdate = (e) => {
    e.preventDefault();

    const isValid = formValidation();

    const url =
      "https://flixnet-2020.herokuapp.com/users/" +
      localStorage.getItem("user");

    if (isValid) {
    axios
      .put(
        url,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        const data = response.data;
        // console.log(data);
        localStorage.setItem("user", data.Username);
        // props.setUsername(data.Username);
        alert("Your profile was updated successfully");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

const formValidation = () => {
  const usernameErr = {};
  const passwordErr = {};
  const emailErr = {};
  let isValid = true;

  if (username.trim().length < 5) {
    usernameErr.usernameShort = 'Username must be at least 5 characters';
    isValid = false;
  }

  if (password.trim().length < 1) {
    passwordErr.passwordMissing = 'You must enter a password';
    isValid = false;
  }

  if (!email.includes('.') && !email.includes('@')) {
    emailErr.emailNotEmail = 'A valid email address is required';
    isValid = false;
  }

  setUsernameErr(usernameErr);
  setPasswordErr(passwordErr);
  setEmailErr(emailErr);
  return isValid;
}

  return (
    <Container>
      <div className="update-heading">
      <h2>Update your account</h2>
      </div>
      <br />
      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            className="form-field"
            type="text"
            value={username}
            placeholder="Enter username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text 
            className="text-muted"
            >Must be alphanumeric and contain at least 5 characters
          </Form.Text>
          {Object.keys(usernameErr).map((key) => {
            return <div key={key} style={{ color: 'red' }}>{usernameErr[key]}</div>
          })}
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            className="form-field"
            type="password"
            value={password}
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text 
            className="text-muted"
          >Password is required.
          </Form.Text>
          {Object.keys(passwordErr).map((key) => {
            return <div key={key} style={{ color: 'red' }}>{passwordErr[key]}</div>
          })}
        </Form.Group>
        
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address:</Form.Label>
          <Form.Control
            className="form-field"
            type="email"
            value={email}
            placeholder="name@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text 
            className="text-muted"
          >Must be a valid email address.
          </Form.Text>
          {Object.keys(emailErr).map((key) => {
            return <div key={key} style={{ color: 'red' }}>{emailErr[key]}</div>
          })}
        </Form.Group>

        <Form.Group>
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            className="form-field"
            type="date"
            value={birthday}
            placeholder="Select Birthday"
            required
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Link to={`/users/`}>
          <Button
            className="update-button"
            variant="dark"
            block
            type="submit"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Link>
      </Form>
    </Container>
  );
}
