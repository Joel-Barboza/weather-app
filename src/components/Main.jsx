import React from 'react'
import CurrentWeather from './mainComponents/CurrentWeather.jsx'
import HourlyForecast from './mainComponents/HourlyForecast.jsx'
import DailyForecast from './mainComponents/DailyForecast.jsx'



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