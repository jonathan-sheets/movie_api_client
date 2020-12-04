import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./profile-view.scss";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Link } from "react-router-dom";

import axios from "axios";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      dob: "",
      favoriteMovies: [],
      movies: "",
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  formatDate(date) {
    if (date) date = date.substring(0, 10);
    return date;
  }

  getUser(token) {
    //console.log(localStorage.getItem("user"));
    let url =
      "https://flixnet-2020.herokuapp.com/users/" +
      localStorage.getItem("user");
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //console.log(response);
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          dob: this.formatDate(response.data.Birthday),
          favoriteMovies: response.data.FavoriteMovies,
        });
      });
  }

  removeFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://flixnet-2020.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/favorites/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      });
  }

  handleDelete() {
    if (!confirm("Are you sure you want to delete your account?")) return;
    let token = localStorage.getItem("token");
    let url =
      "https://flixnet-2020.herokuapp.com/users/" + this.state.username;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => console.log(response));

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.open("/", "_self");
    alert('Your account has been deleted.');
  }

  render() {
    const { movies } = this.props;

    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });

    if (!movies) alert("Please sign in");
    return (
      <div className="userProfile">
        <Container className="wrapper container-fluid">
          <Row className="justify-content-center">
            <Col className="col-6">
              <Form  className="user-profile"> 
                <h1>Profile Details</h1>
                <br />
                <Form.Group controlId="formBasicUsername">
                  <h3>Username: </h3>
                  <Form.Label>{this.state.username}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <h3>Email:</h3>
                  <Form.Label>{this.state.email}</Form.Label>
                </Form.Group>
                <Form.Group controlId="formBasicDate">
                  <h3>Date of Birth:</h3>
                  <Form.Label>{this.state.dob}</Form.Label>
                
                </Form.Group>
                  <div className="buttons">
                    <Link to={`/update/${this.state.username}`}>
                      <Button variant="outline-dark" 
                              className="edit-button"
                              size="sm" 
                      >
                        Edit Profile
                      </Button>
                    </Link>
                    <Link to={`/`}>
                      <Button 
                        variant="outline-dark" 
                        className="back-button"
                        size="sm"
                      >
                        Back to Main
                      </Button>
                    </Link>
                    <Button 
                    variant="outline-danger" 
                    size="sm"
                    className="delete-button"
                    onClick={() => this.handleDelete()}
                    >
                    Delete Account
                    </Button>
                  </div>
              </Form>
              <br />

              <h1>Favorite Movies</h1>
                <div className="d-flex row mt-3 favorite-movies">
                  <Row className="justify-content-center">
                    
                    {favoriteMovieList.map((movie) => {
                    return (
                      <div key={movie._id}>
                        <Card style={{ width: '10rem' }} 
                              className="favorite-card">
                          <Link to={`/movies/${movie._id}`}>
                            <Card.Img 
                              className="movie-card-link"
                              variant="top" 
                              src={movie.ImagePath} />
                          </Link>
                      
                          <Button 
                            className="remove-favorite"
                            variant="danger"
                            size="sm"
                            onClick={() => this.removeFavorite(movie)}>
                              Remove
                          </Button>
                        </Card>
                      </div>
                      );
                    })}
                    
                  </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
};
