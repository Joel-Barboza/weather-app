import React from 'react';
/*import  getWeatherData from '../ApiRequest.js';*/


const CurrentWeather = () => {

	return(
        <div className="container_current-data">
            <div className="current-data">
                <h1 id="temperature">°C</h1>
                <h4 id="current-weather">Clima</h4>
                <h4 id="day/nigth-temperature">°C / °C</h4>
            </div>
        </div>
		)
}

export default CurrentWeather;