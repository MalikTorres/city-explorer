import React from 'react';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Weather from './Weather';
import Movies from './Movies';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      // City Weather had to be stored in an array in state so that we can render both items
      cityWeather: [],
      error: false,
      errorMessage: '',
      cityMovies:[]

    }
  }


  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })

  }

  // ** async/await - handle our asynchronous code
  // ** try/catch - handle our errors - TRY resolve our success promises & CATCH handle rejected promises



  getCityData = async (event) => {

    event.preventDefault()


    try {

      // TODO: Use axios to get the data from LocationIQ - using city in state
      // Allows us to access the API data from axios
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url);


      // TODO: Set State with the data that comes back from axios & set error boolean to false
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false,
        mapUrl: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}`
      })
      // TODO: CALL WEATHER HANDLE
      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;
      this.handleGetTheWeather(lat,lon);
      this.handleGetCityMovies();
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }





  handleGetTheWeather = async (lat,lon) => {
    try {
      
          // TODO: Call my server and pass in the lat,lon, and city name
          // TODO: SET THAT INFORMATION TO STATE
      // let url = `http://localhost:3001/weather?city_name=${this.state.city}`;
      let url =`${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lat=${lat}&lon=${lon}`;
        console.log(url);
      let cityWeather = await axios.get(url);
       console.log('weather from axios',cityWeather.data);
      this.setState({
        cityWeather: cityWeather.data,
        error: false 
      });
     


    } catch (error) {
      console.log(error.message);
    }

    
  }
  handleGetCityMovies = async () => {

    try {

      let url = `${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`;
      let cityMovies = await axios.get(url);
      console.log(cityMovies);
      this.setState({
        cityMovies: cityMovies.data,
        error:false
      })
    } catch (error) {
      console.log(error.message);
    }
  }




  // Latitude and Long 

  render() {
    // console.log(typeof this.state.cityData);
    return (
      <>

        {/* <form onSubmit={this.getCityData}> */}
        <Form onSubmit={this.getCityData}>
          <Form.Group>
            <Form.Label>Enter City</Form.Label>
            <Form.Control onChange={this.handleCityInput} type="text"></Form.Control>

          </Form.Group>
          <Button type='submit' variant="primary">Explore!</Button>
        </Form>
        <Movies cityMovies={this.state.cityMovies}/>
        <Weather cityWeather={this.state.cityWeather} /> 
       
        {/*Ternary -WTF*/}
        {
          this.state.error

            ? <Alert variant='danger'>{this.state.errorMessage}</Alert>
            : <div>
              <Card style={{ width: '50rem' }} border="info" ></Card>
                <Card.Img style={{ width: '18rem' }} src={this.state.mapUrl} alt={this.state.display_name} />
              <Card.Body>
                <Card.Title>{this.state.cityData.display_name}</Card.Title>
                <Card.Text>{this.state.cityData.lat}</Card.Text>
                <Card.Text>{this.state.cityData.lon}</Card.Text>
              </Card.Body>
              <Card style={{ width: '18rem' }}>
              </Card>


              {/* <Weather cityData={this.state.cityData}></Weather>  */}







            </div>

        }
      </>
    )
  }
}



export default App;



// <form>
//           <button type='submit' onClick ={this.handleGetPokemonData}>Gotta Catch them all!</button>
//         </form>
//         <ul>
//           {this.state.pokemonData.map((pokemon, idx) => <li key={idx}>{pokemon.name}</li>)}
//         </ul> 


  // // *** GET POKEMON DATA

  // handleGetPokemonData = async (event) => {
  //   event.preventDefault();


  //   // TODO: USE AXIOS TO MAKE A CALL OUT TO THE POKEMON API
  //   let pokemonData = await axios.get('https://pokeapi.co/api/v2/pokemon/');


  //   // ** .data - where axios stores the info
  //   // ** .results - where the api stores the actual pokemon info

  //   // TODO: SET THAT DATA INTO STATE
  //   console.log(pokemonData.data.results);
  //   this.setState({
  //     pokemonData: pokemonData.data.results
  //   })
  // }


  // OLD FORM
  // <form onSubmit={this.getCityData}>
  // <label> Enter a City:
  //  <input type ="text" onChange={this.handleCItyInput}/>