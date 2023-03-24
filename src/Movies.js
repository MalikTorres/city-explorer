import React from 'react';
import Movie from './Movie';
// import ListGroup from 'react-bootstrap/ListGroup';
class Movies extends React.Component {
  render() {
    return (
      <>
     <div>{this.props.cityMovies.map((movie,idx) =><Movie movie={movie} key={idx}/>)}</div>
      </>
    )
  }

} 
export default Movies; 

/*
 <>
            <ListGroup>
            <ListGroup.Item variant="info">{day.title}</ListGroup.Item>
            <ListGroup.Item variant="success">{day.overview}</ListGroup.Item>
            </ListGroup>
            </>


*/