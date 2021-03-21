import React, { Component } from 'react'
import '../css/App.css';
import './DisplayWeather';
import DisplayWeather from './DisplayWeather';
const axios = require('axios').default;

export default class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      weather: {}
    };
    
    this.handleCityStateFormSubmission = this.handleCityStateFormSubmission.bind(this);
  };

  async handleCityStateFormSubmission(e) {
    e.preventDefault();
    
    let form = document.getElementById("cityStateForm");
    let cityName = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + state + "," + "US" + "&appid=524a91657eafa89021d9d867b06ed414&units=imperial";
    
    let weatherObj;

    await axios.get(url)
      .then(function (response) {
        // handle success
        console.log(response.data);
        weatherObj = {
          "weather": response.data.weather[0].description,
          "temperature": response.data.main.temp,
          "humidity": response.data.main.humidity,
          "wind": response.data.wind.speed
        };
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        form.reset();
      });

    this.setState((state) => ({ 
          weather: weatherObj
        }));
  };

  render() {
    return (
      <>
        <form id="cityStateForm" onSubmit={this.handleCityStateFormSubmission}>
          <input type="text" id="city" name="city" placeholder="city"/>
          <input type="text" id="state" name="state" placeholder="state"/>
          <input type="submit" value="submit"/>
        </form>
        <div id="weatherContainer">
          <DisplayWeather weatherData={this.state.weather} />
        </div>
      </>
    )
  }
}