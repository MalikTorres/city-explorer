import React from 'react'

class Weathers extends React.Component {
  render() {
    return (
      <>
      <p>{this.props.weathers.date}</p>
      <p>{this.props.weathers.description}</p>
      </>
    )
  }
} 

export default Weathers; 