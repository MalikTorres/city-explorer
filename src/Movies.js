import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class Movies extends React.Component {
  render() {
    return (
      <>
        {this.props.cityMovies.map((day, idx) => {
          return (
            <>
            <ListGroup>
            <ListGroup.Item variant="info">{day.title}</ListGroup.Item>
            <ListGroup.Item variant="success">{day.overview}</ListGroup.Item>
            </ListGroup>
            </>
          )
        })}
    </>
    )
  }

} 
export default Movies; 
