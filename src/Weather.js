import React from 'react';

// import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
  render() {
    console.log(this.props.cityData[0].date);
    return (

     <>
     <h3>Weather Data</h3>
{/* 
    <p>{this.props.cityData[0].description}</p>  */}
     </>

    )
  }




}


export default Weather;