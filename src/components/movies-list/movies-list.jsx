import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let fliteredMovies = movies;

  if (visibilityFilter !== '') {
    fliteredMovies = movies.filter(m => m.Title.toLocaleLowerCase().includes(visibilityFilter.toLocaleLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <Container className="wrapper container-fluid">
      <Row className="justify-content-center">
        {fliteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
      </Row>
    </Container>
  </div>;
}

export default connect(mapStateToProps)(MoviesList);