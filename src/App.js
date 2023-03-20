import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // pokemonData: []
      city: '',
      cityData: {},
      errorMessage: ''
    }
  }


handleCItyInput = (event) => {
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
    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}format=json`
  
  
    let cityDataFromAxios = await axios.get(url);
    console.log(cityDataFromAxios.data[0]);
    // TODO: Set State with the data that comes back from axios & set error boolean to false
    this.setState({
      cityData: cityDataFromAxios.data[0],
      error:false
    })
  } catch (error) {
    this.setState({
      error:true,
      errorMessage: error.errorMessage
    })
  }
}



  render() {
    return (
      <>
        <h1>API CALLS</h1>
        <form onSubmit={this.getCityData}>
          <label> Enter a City:
           <input type ="text" onChange={this.handleCItyInput}/>
           </label><button type ="submit">Explore</button>
      
        </form>
        {/*Ternary -WTF*/}
     
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