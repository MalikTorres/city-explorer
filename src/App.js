import React from 'react';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // pokemonData: []
      city: '',
      cityData: {},
      error:false,
      errorMessage: ''
      
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
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  } 

  /*
  handleSubmit = async (e) => {
    e.preventDefault();
    TODO: USE AXIOS TO HIT THE API(BACKEND)
    TODO: SET THAT INFORMATION TO STATE
    try {
        let url = `${process.env.REACT_APP_SERVER}/weather?city={this.state.cityData}`

        let petData = await axios.get(url);

        console.log(citytData.data);
    } catch (error {
      console.log(error.message);
    }
  }



  */

  // Latitude and Long 

  render() {
    return (
      <>
        
        {/* <form onSubmit={this.getCityData}> */}
        <Form onSubmit={this.getCityData}>
          <Form.Group>
          <Form.Label>Enter City</Form.Label>
          <Form.Control onChange={this.handleCityInput}type="text"></Form.Control>
       
        </Form.Group>
        <Button type='submit' variant="primary">Explore!</Button>
        </Form>

        {/*Ternary -WTF*/}
          {
            this.state.error

            ?<Alert variant ='danger'>{this.state.errorMessage}</Alert>
            : <div>
                <Card style={{ width: '50rem' }}  border="info" ></Card>
              <Card.Body>
              <Card.Title>{this.state.cityData.display_name}</Card.Title>
              <Card.Img style={{ width: '18rem' }} src={this.state.mapUrl} alt={this.state.display_name}/>
              <Card.Text>{this.state.cityData.lat}</Card.Text>
              <Card.Text>{this.state.cityData.lon}</Card.Text>
              </Card.Body>
              <Card style={{ width: '18rem' }}>
              </Card>
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