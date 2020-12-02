import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import './director-view.scss';

export class DirectorView extends React.Component {
  
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, director } = this.props;

    if (!director) return null;

    return (
      <Container className="wrapper container-fluid">
        <Row>
          <Col className="col-3" />
          <Col className="director-view container-fluid align-items-center col-6">
            {/* <img
              className="director-poster"
              src="https://via.placeholder.com/150"
            /> */}
            <div className="director-view-title">
              {/* <span className="label">Name: </span> */}
              <span className="value">{director.Director.Name}</span>
            </div>
            <div className="director-bio">
              <span className="label">Bio: </span>
              <span className="value">{director.Director.Bio}</span>
            </div>
            <div className="director-birth">
              <span className="label">Born:  </span>
              <span className="value">{director.Director.Birth}</span>
            </div>
            <div className="director-death">
              <span className="label">Died:  </span>
              <span className="value">{director.Director.Death}</span>
            </div>
            <Link to={`/`}>
            <Button 
              variant="link"
              className="back-link links"
            >
              Back to Movies
            </Button>
            </Link>
          </Col>
          <Col className="col-3" />
        </Row>
        <Container className="wrapper container-fluid">
          <h4 className="mt-4">Some {director.Director.Name} movies</h4>
          <div className="d-flex row mt-3 ml-2 director-results">
            {movies.map((movie) => {
              if (movie.Director.Name === director.Director.Name) {
                return (
                  <div key={movie._id}>
                    <Card
                      className="movie-card mt-3 border border-dark rounded"
                      style={{ width: '15rem' }}
                    >
                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Card.Body>
                        <Card.Title className="movie-title">{movie.Title}</Card.Title>
                        <Card.Text className="movie-text">
                        {movie.Description}
                      </Card.Text>
                      <Link to={`/movies/${movie._id}`}>
                        <Button
                          variant="dark"
                          size="sm"
                          block
                          className="movie-button"
                        >
                          Read more
                        </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </Container>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  Movie: PropTypes.shape({
    Director: {
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    },
  }),
};