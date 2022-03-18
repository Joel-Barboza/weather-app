import React from 'react'


export default function HourlyForecast() {
    function scrollRight () {
        let scrolling = document.getElementById('container_hourly-data')
        scrolling.scrollLeft += window.innerWidth;
        }
    function scrollLeft () {
        let scrolling = document.getElementById('container_hourly-data')
        scrolling.scrollLeft -=window.innerWidth;
    }
	return(
        <div className="container_hourly-forecast">
                <button className="arrow-btn scroll-arrow scroll-btn_left" onClick={scrollLeft}><i className="fas fa-chevron-left"></i></button>
                <div id="container_hourly-data" className="container_hourly-data">
                    
                </div>
                <button className="arrow-btn scroll-arrow scroll-btn_right" onClick={scrollRight}><i className="fas fa-chevron-right"></i></button>
        </div>
		)
}