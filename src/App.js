import React, { Component } from 'react';
import Axios from 'axios';
import './App.css';
import Places from './Places';

class App extends Component {

  constructor(props){
    super(props);
    this.handleLocation = this.handleLocation.bind(this);
    this.printChange = this.printChange.bind(this);
    this.locateRestaurant = this.locateRestaurant.bind(this);
   
    this.state={
     restaurant:'',
     location:'',
     options:[]
   }
    
  }

 

  handleLocation(e){
    this.setState({location:e.target.value});
  }


   printChange(e){
    console.log(this.state.restaurant);
  }

  
//here i will create my axios call using .get request involving this.state.restaurant and using the url and api key i have
  locateRestaurant(){
    Axios
    .get(`https://www.mapquestapi.com/geocoding/v1/address?key=cbeZ1Cg3c58tcyv7QtElA05uCOHcGyxH&inFormat=kvp&outFormat=json&location=${this.state.location}&thumbMaps=false`)
    .then(response=>{
      var lat = response.data.results[0].locations[0].latLng.lat;
      var long = response.data.results[0].locations[0].latLng.lng;
     console.log(lat);
     console.log(long);

     Axios
     .get(`https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${long}&sort=rating`,{headers: {'user-key': '874d1a815ae66516987a27b96d6104b7'}})
      .then(res =>{
        var getData = res.data.restaurants;
        console.log(res.data);
        console.log(getData);

        return getData;
    
      }).then(options => {
        this.setState({ options });
      })
      
    })
    
   }
  

//https://developers.zomato.com/api/v2.1/search?lat=37.527918&lon=-120.794017

render() {
    return (
      <div className="App">
      <div className='container'>
    
      <h1>Find the best rated restaurants near you!</h1>
      

          
          <textarea placeholder='Type in your city, ex. `Turlock, CA`' onChange ={this.handleLocation}></textarea>
           
            <button onClick={this.locateRestaurant}>Search Restaurants!</button>
            <div className="jumbotron jumbotron-fluid padding0top-4">
          {
            this.state.options.map(places=>(
              <Places 
                name={places.restaurant.name}
                url={places.restaurant.url}
                key={places.restaurant.id}
                image={places.restaurant.featured_image}
                latty={places.restaurant.location.latitude}
                longy={places.restaurant.location.longitude}
                />
            ))

          }
          </div>
          
      
        
      </div>
      </div>


    );
  }
}

export default App;
