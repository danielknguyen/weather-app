import React from 'react';
import '../css/DisplayWeather.css';

const DisplayWeather = ({weatherData}) => {
    // console.log('weather data in display weather: ',weatherData);
    return (
        <div className="displayWeatherContainer">
            <div className="displayWeatherOuterWrapper">
                <div className="displayWeatherInner"> 
                    <div className="icon">
                        <img src={"http://openweathermap.org/img/wn/" + weatherData.icon + ".png"} alt={weatherData.weather}/>
                    </div>
                    <div className="description weatherData">
                        <span><b>Weather:</b> {weatherData.weather}</span>
                    </div>
                    <div className="temperature weatherData">
                        <span><b>Temp:</b> {weatherData.temperature +" °F"}</span>
                    </div>
                    <div className="humidity weatherData">
                        <span><b>Humidity:</b> {weatherData.humidity + "%"}</span>
                    </div>
                    <div className="wind weatherData">
                        <span><b>Wind:</b> {(weatherData.wind ? weatherData.wind + " mph" : "")}</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DisplayWeather;
