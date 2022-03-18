import React from 'react'


export default function CurrentWeather() {

	return(
        <div className="container_current-data">
            <div className="current-data">
                <h1 id="temperature">28°C</h1>
                <h4 id="current-weather">Clima</h4>
                <h4 id="day/nigth-temperature">28°C / 17°C</h4>
            </div>
        </div>
		)
}