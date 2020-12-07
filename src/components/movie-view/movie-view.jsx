import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Card } from 'react-bootstrap';
import './movie-view.scss';
import { propTypes } from 'react-bootstrap/esm/Image';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let url =
      "https://flixnet-2020.herokuapp.com/users/" +
      localStorage.getItem("user") +
      "/favorites/" +
      movie._id;

    console.log(token);

    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        window.open("/", "_self");
        alert('Added to favorites!');
      });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Container className="wrapper container-fluid">
        <Row>
          <Col className="col-3" />
          <div className="movie-description">
            <img className="movie-poster" src={movie.ImagePath} />
            <div className="movie-view-title">
              <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-genre">
              <span className="genre-label">Genre: </span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button 
                  variant="link"
                  className="genre-link links"
                >
                  {movie.Genre.Name}
                </Button>
              </Link>
            </div>
            <div className="movie-director">
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button 
                  variant="link"
                  className="director-link links"
                >
                  {movie.Director.Name}
                </Button>
              </Link>
            </div>
            <div>
              <Button
                variant="dark"
                className="movie-button favorites-button"
                size="sm"
                onClick={() => this.addFavorite(movie)}
              >
              Add to Favorites
              </Button>
            </div>

            <Link to={`/`}>
              <Button 
                variant="link"
                className="back-link links"
              >
                Back to Movies
              </Button>
            </Link>
          </div>
          <Col className="col-3" />
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      // Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      // Bio: PropTypes.string.isRequired,
      // Birth: PropTypes.string.isRequired,
      // Death: PropTypes.string
    }),
  // }).isRequired,
  // onClick: propTypes.func.isRequired,
})};