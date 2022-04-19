import React from 'react'
import CurrentWeather from './mainComponents/CurrentWeather.js'
import HourlyForecast from './mainComponents/HourlyForecast.js'
import DailyForecast from './mainComponents/DailyForecast.js'



const Main = () => {
    
    return (
        <main className="container_main">
            <CurrentWeather />

            <HourlyForecast />

            <DailyForecast />
            
        </main>
        )
}

export default Main;