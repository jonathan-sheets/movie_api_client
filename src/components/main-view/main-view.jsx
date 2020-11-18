import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';


export class MainView extends React.Component {
  constructor() {
    // call the superclass constructor so react can initialize it
    super();
    // Initial state is set to null
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null
    };
  }
  
  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://flixnet-2020.herokuapp.com/movies')
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  /* When a movie is clicked this function is invoked and updates the state of the `selectedMovie` *property to that movie */
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user */
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  setInitial() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initally loaded
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered.  If there is a user logged in, the user details are *passed as a prop to the LoginView */

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
        <Container>
          <Row>
            {this.state.selectedMovie
            ? <MovieView movie={this.state.selectedMovie} onClick={() => this.setInitial()}/>
            : movies.map(movie => (
              <Col key={movie._id} className="d-flex justify-content-around">
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
              </Col>
            ))
            }
          </Row>
        </Container>
      </div>
    );
  }
}