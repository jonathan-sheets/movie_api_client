import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    // call the superclass constructor so react can initialize it
    super();
    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movies: null,
      selectedMovie: null
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

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
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
    const { movies, selectedMovie } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
        {this.state.selectedMovie
        ? <MovieView movie={this.state.selectedMovie} onClick={() => this.setInitial()}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
        ))
        }
      </div>
    );
  }
}