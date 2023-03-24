import React from 'react';
import Weathers from './Weathers'

// import Card from 'react-bootstrap/Card';


class Weather extends React.Component {
  render() {
    return (
      <>
      <div>{this.props.cityWeather.map((weathers,idx) => <Weathers weathers ={weathers} key={idx}/>)}</div>
      </>
    )
  }
}

export default Weather;

    

    // console.log(this.props.cityData[0].date); 




// class Weather extends React.Component {
//   render() {
//     return(
//       <>
//       {this.props.cityWeather.map(day,idx)=> {
//           return (
//             <>

//             </>
//           )
//       }}
//       </>
//     )
//   }
   