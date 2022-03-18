/*alert('Por favor active la ubicación.')*/ 

// Call a function to requests the data from the API
getWeatherData()

function getWeatherData() {
	navigator.geolocation.getCurrentPosition((success) => {
		let {latitude, longitude} = success.coords;

		fetch(`https://api.openweathermap.org/data/2.5/onecall?
			lat=${latitude}&
			lon=${longitude}&
			exclude=minutely&
			units=metric&
			lang=es&
			appid=${process.env.REACT_APP_API_KEY}`).then(res => res.json()).then(data => {
			currentData(data);
			hourlyData(data)
            dailyData(data)
			console.log(data)
		})
		fetch(`https://api.openweathermap.org/geo/1.0/reverse?
			lat=${latitude}&lon=${longitude}&lang=es&
			appid=${process.env.REACT_APP_API_KEY}`).then(res => res.json()).then(location => {
			locationName(location);
		})
	})
}

function locationName(location) {
	let {name} = location[0];
	let place = document.getElementById('place');
	place.innerText =  `${name}`;
}

function hourlyData(data) {
    let hoursArray = 
    ["12:00 am", "1:00 am", "2:00 am", "3:00 am", "4:00 am" , "5:00 am" ,
     "6:00 am" , "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am",
     "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm" , "5:00 pm" , 
     "6:00 pm" , "7:00 pm", "8:00 pm", "9:00 pm", "10:00 pm", "11:00 pm", "12:00 am"]
	const date = new Date();
	let hour = date.getHours()
    let hourForecast;
	let hourForecastTemp = 0;
    let groupNum = 1;
    let contHourlyData = document.getElementById('container_hourly-data')
    contHourlyData.innerHTML = ""

    for (let i = 0; i < 4;){
        let dataGroup = document.createElement("div")
        dataGroup.setAttribute("id", `dataGroup${groupNum}`)
        dataGroup.classList.add("dataGroup")
        contHourlyData.appendChild(dataGroup)

        for (let i = 0; i < 6;){
            hourForecast = hoursArray[hour];
            let {temp} = data.hourly[hourForecastTemp];
            let {icon} = data.hourly[hourForecastTemp].weather[0];
            let selectGroup = document.getElementById(`dataGroup${groupNum}`)
            let dataSpan = document.createElement("span")
            dataSpan.classList.add("hourlyItem")
            dataSpan.innerHTML = 
            `<p class="p_hour-forecast">${hourForecast}</p>
            <span class="container_hourly-img">
                <img class="img" src="http://openweathermap.org/img/w/${icon}.png" />
            </span>
            <p>${Math.round(temp)}°C</p>`
            selectGroup.appendChild(dataSpan)
            
            if (hour === 24) {
                hour = 0;           
            }

            hour++;  
            hourForecastTemp++;
            i++;  
        }
        groupNum++;
        i++; 
    }
}

function dailyData(data) {
    let daysArray= ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const date = new Date();
    let days = date.getDay()
    let dayNum = 0;
    let dailyDataCont = document.getElementById("container_daily-data")
    dailyDataCont.innerHTML = ""
    
    for (let i = 0; i <= 6; i++) {
        let nextDays = days;
        let {max, min} = data.daily[dayNum].temp;
        let {humidity, sunrise, sunset, wind_speed} = data.daily[dayNum]
        let dailyDataItem = document.createElement("div")
        dailyDataItem.classList.add("daily-data_item")
        dailyDataItem.innerHTML = 
        `<div class="daily-main-data">
            <p class="day_name">${daysArray[days]}:</p>
            <p class="day_day-nigth-weather">${Math.round(max)}°C / ${Math.round(min)}°C</p>
            <button class="arrow-btn btn-hide" id="Btn${dayNum}"><i id="rotateArrowBtn${dayNum}" class="fas fa-chevron-down"></i></button>
        </div>
        <div id="secunDataBtn${dayNum}" class="daily-secun-data">      
            <p class="day_humidity">Humedad: ${humidity}</p>
            <p class="day_humidity">Salida del sol: ${sunrise}</p>
            <p class="day_humidity">Puesta del sol: ${sunset}</p>
            <p class="day_humidity">Velocidad del viento: ${wind_speed}</p>
        </div>`
        dailyDataCont.appendChild(dailyDataItem)

        let btnHideSecunData = document.getElementById(`Btn${dayNum}`)
        btnHideSecunData.addEventListener("click", function(e) {
            secunData(this.id)
        });

        if (nextDays === 6) {
            days = 0;
        }else if(nextDays !== 6) {
            days++;    
        };
        dayNum++;
    };    
}

function currentData(data) {
	let {/*humidity, pressure, sunrise, sunset, windspeed,*/ temp} = data.current;
	let {description} = data.current.weather[0];
	let {day, night} = data.daily[0].feels_like;
		
	let temperature = document.getElementById('temperature');
	let currentWeather = document.getElementById('current-weather');
	let dayNigthTemperature = document.getElementById('day/nigth-temperature');

	temperature.innerText = `${Math.round(temp)}°C`;
	currentWeather.innerText =  `${description}`;
	dayNigthTemperature.innerText =  `${Math.round(day)}°C / ${Math.round(night)}°C`;

}

function secunData(dayNum) { 
    const hiddenData = document.getElementById(`secunData${dayNum}`);
    const btnShowData = document.getElementById(`rotateArrow${dayNum}`);
    hiddenData.classList.toggle("change-height")
    btnShowData.classList.toggle("rotate-arrow")   
}


