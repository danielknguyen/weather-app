import React, { Component } from 'react'
import '../css/App.css';
import './DisplayWeather';
import DisplayWeather from './DisplayWeather';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
const axios = require('axios').default;

export default class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      "weather": {},
      "location": ""
    };
    
    this.handleCityStateFormSubmission = this.handleCityStateFormSubmission.bind(this);
  };

  async handleCityStateFormSubmission(e) {
    e.preventDefault();
    
    let form = document.getElementById("cityStateForm");
    let cityName = document.getElementById("city").value;
    let stateName = document.getElementById("state").value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + stateName + "," + "US" + "&appid=" + process.env.REACT_APP_OPEN_WEATHER_API + "&units=imperial";
    let weatherObj;

    await axios.get(url)  
      .then(function (response) {
        // handle success
        console.log(response.data);
        weatherObj = {
          "weather": response.data.weather[0].description,
          "icon": response.data.weather[0].icon,
          "temperature": Math.ceil(response.data.main.temp),
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
   
    cityName = cityName.split(" ").map((word) => {
      return word[0].toUpperCase().concat(word.slice(1));
    }).join(" ");

    stateName = stateName.toUpperCase();

    this.setState((state) => ({ 
          "weather": weatherObj,
          "location": cityName + ", " + stateName + " US" 
        }));
  };

  async componentWillMount() {
    let cityName = "san leandro"
    let stateName = "ca"
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + stateName + "," + "US" + "&appid=" + process.env.REACT_APP_OPEN_WEATHER_API + "&units=imperial";
    let weatherObj;

    await axios.get(url)  
      .then(function (response) {
        // handle success
        console.log(response.data);
        weatherObj = {
          "weather": response.data.weather[0].description,
          "icon": response.data.weather[0].icon,
          "temperature": Math.ceil(response.data.main.temp),
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
      });
    
    cityName = cityName.split(" ").map((word) => {
      return word[0].toUpperCase().concat(word.slice(1));
    }).join(" ");

    stateName = stateName.toUpperCase();

    this.setState((state) => ({ 
          "weather": weatherObj,
          "location": cityName + ", " + stateName + " US" 
        }));
  };

  render() {
    return (
      <>
        <Form id="cityStateForm" onSubmit={this.handleCityStateFormSubmission} autoComplete="off">
          <Form.Row>
            <Col>
              <Form.Control type="text" id="city" name="city" placeholder="City" autoComplete="off" required/>
            </Col>
            <Col>
              <Form.Control type="text" id="state" name="state" placeholder="State" autoComplete="off" required/>
            </Col>
              <Button id="weatherSubmitBtn" variant="outline-secondary" type="submit">Submit</Button>
          </Form.Row>
        </Form>
        <span id="weatherLocation">{this.state.location}</span>
        <div id="weatherContainer">
          <DisplayWeather weatherData={this.state.weather} />
        </div>
      </>
    )
  };
};