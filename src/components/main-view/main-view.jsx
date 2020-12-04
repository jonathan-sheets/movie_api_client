import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { setMovies, setUser } from '../../actions/actions';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import MoviesList from '../movies-list/movies-list';
import { Link } from 'react-router-dom';
import LoginView from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { UpdateView } from '../update-view/update-view';
import { GenreView } from '../genre-view/genre-view';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './main-view.scss';


export class MainView extends React.Component {
  constructor() {
    super();
  }
  
  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }
  
  onLoggedIn(authData) {
    console.log(authData);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://flixnet-2020.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('logout successful');
    alert('You have been successfully logged out');
    window.open('/', '_self');
  }

  render() {

    let { movies, visibilityFilter, user } = this.props;

    return (
      <Router>
        <div className="main-view">
        <Navbar
          expand="lg"
          sticky="top"
          variant="dark"
          className="navbar shadow-sm mb-5 py-0"
        >
          <Navbar.Brand
            href="https://flixnet2020.netlify.app"
            className="navbar-brand"
          >
          FlixNET
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            {!user ? (
              <ul>
                <Link to={`/`}>
                  <Button 
                    variant="link"
                    className="navbar-link"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to={`/register`}>
                  <Button 
                    variant="link"
                    className="navbar-link"
                  >
                    Register
                  </Button>
                </Link>
              </ul>
            ) : (
              <ul>
                <Link to={`/`}>
                  <Button 
                    variant="link" 
                    className="navbar-link"
                    onClick={() => this.logOut()}
                  >
                    Sign Out
                  </Button>
                </Link>
                <Link to={`/users/${user}`}>
                  <Button 
                    variant="link"
                    className="navbar-link"
                  >
                    My Account
                  </Button>
                </Link>
                <Link to={`/`}>
                  <Button 
                    variant="link"
                    className="navbar-link"
                  >
                    Movies
                  </Button>
                </Link>
              </ul>
            )}
          </Navbar.Collapse>
        </Navbar>

        <Route 
          exact path="/" 
          render={() => {
            if (!user) 
              return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return <MoviesList movies={movies}/>;
          }} />
            
        <Route 
          path="/register" 
          render={() => <RegistrationView />} 
        />

        <Route
          exact
          path="/users/"
          render={() => window.open("/", "_self")}
        />
          
          <Route
            exact
            path="/users/:userId"
            render={() => <ProfileView movies={movies} />}
          />

          <Route
            path="/update/:userId"
            render={() => {
              return <UpdateView />;
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
              />
            )}
          />

        <Route
          path="/genres/:name"
          render={({ match }) => (
            <GenreView
              genre={movies.find(
                (m) => m.Genre.Name === match.params.name
              )}
              movies={movies}
            />
          )}
        />

        <Route
          path="/directors/:name"
          render={({ match }) => (
            <DirectorView
              director={movies.find(
                (m) => m.Director.Name === match.params.name
              )}
              movies={movies}
            />
          )}
        />
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user };
};

// #4
export default connect(mapStateToProps, { setMovies, setUser } )(MainView);