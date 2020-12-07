import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';

import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // Which, in this case, is `MainView`, as `MainView` is what's connected
    // to your database via the movies endpoint of your API
    const { movie } = this.props;

    return (
      <Card className="movie-card mt-3 border border-dark rounded">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="movie-title">{movie.Title}</Card.Title>
          <Card.Text className="movie-text">{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
          <Button 
            variant="dark"
            size="sm"
            // block
            className="movie-button"
          >
            Details
          </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    })
  })
};