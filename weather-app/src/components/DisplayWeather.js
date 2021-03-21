import React from 'react';
import '../css/DisplayWeather.css';

const DisplayWeather = ({weatherData}) => {

    console.log('weather data in display weather: ',weatherData);

    return (
        <div className="displayWeatherContainer">
            <div className="displayWeatherOuterWrapper">
                <div className="displayWeatherInner"> 
                    <div className="weatherIconOuter">
                        <span>Weather: {weatherData.weather}</span>
                    </div>
                    <div className="temperature">
                        <span>Temp: {weatherData.temperature}</span>
                    </div>
                    <div className="humidity">
                        <span>Humidity: {weatherData.humidity}</span>
                    </div>
                    <div className="wind">
                        <span>Wind:{(weatherData.wind ? weatherData.wind + " mph" : "")}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DisplayWeather;
