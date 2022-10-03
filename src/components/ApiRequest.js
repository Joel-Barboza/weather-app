

// Gets data from the API
const getWeatherData = () => {
	navigator.geolocation.getCurrentPosition((success) => {
		let {latitude, longitude} = success.coords;

		fetch(`https://api.openweathermap.org/data/2.5/onecall?
			lat=${latitude}&
			lon=${longitude}&
			exclude=minutely&
			units=metric&
			lang=es&
			appid=${import.meta.env.VITE_API_KEY}`).then(res => res.json()).then(data => {
			currentData(data);
			hourlyData(data)
            dailyData(data)
			console.log(data)
		})
		fetch(`https://api.openweathermap.org/geo/1.0/reverse?
			lat=${latitude}&lon=${longitude}&lang=es&
			appid=${import.meta.env.VITE_API_KEY}`).then(res => res.json()).then(location => {
			locationName(location);
		})
	}, (error) => {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert(`Tenemos un problema al cargar la página.\n
Algunas posibles causas son:
        -Permiso de geolocation denegado por el usuario.
        -Ubicación desactivada.\n
Por favor, habilite el permiso o active la ubicacion
Luego recargue la página.`)
                reload()
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Información de localización no disponible.")
                reload()
                break;
            case error.TIMEOUT:
                alert("Tiempo agotado para solicitud de localización de usuario.")
                reload()
                break;
            case error.UNKNOWN_ERROR:
                alert("Ocurrió un error desconocido.")
                reload()
                break;
        }
    })
}

const reload = () => {
    preloader.style.backgroundImage = "none"; // Removes preloader animation
    preloader.classList.toggle("change-pointer")
    preloader.innerHTML = `<img class="reload" src="./src/reload.svg" />
    <p>Toque para recargar</p>`
    preloader.addEventListener("click", (e) => {
        location.reload()
    })
}

// Gets location name
const locationName = (location) => {
	let {name} = location[0];
	let place = document.getElementById('place');
	place.innerHTML =  `<i class="fa-solid fa-location-dot"></i> ${name}`;
}

// Displays hourly data
const hourlyData = (data) => {
    // used to show the corret hour depending on what date.getHours() value is and show the next 24 hours
    let hoursArray = 
    ["12:00 am", "1:00 am", "2:00 am", "3:00 am", "4:00 am" , "5:00 am" ,
     "6:00 am" , "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am",
     "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm" , "5:00 pm" , 
     "6:00 pm" , "7:00 pm", "8:00 pm", "9:00 pm", "10:00 pm", "11:00 pm", "12:00 am"]
	const date = new Date();
	let hour = date.getHours()//gets current hour
    let hourForecast;
	let hourForecastNum = 0; // index of the array of API data used
    let groupNum = 1; // gives a number to each data items group for a scroll efect
    let contHourlyData = document.getElementById('container_hourly-data')
    contHourlyData.innerHTML = "" // prevents duplicated appends 

    for (let i = 0; i < 4;){
        let dataGroup = document.createElement("div") // create the item groups
        dataGroup.setAttribute("id", `dataGroup${groupNum}`)
        dataGroup.classList.add("dataGroup")
        contHourlyData.appendChild(dataGroup)

        for (let i = 0; i < 6;){
            hourForecast = hoursArray[hour]; //uses a element of the array to display an hour
            let {temp} = data.hourly[hourForecastNum]; // gets temperature from API data
            let {icon} = data.hourly[hourForecastNum].weather[0]; // gets a icon depending on the ->
            // -> weather condition gotten from API data
            let selectGroup = document.getElementById(`dataGroup${groupNum}`) // Selects the group to ->
            // -> append the data item
            let dataSpan = document.createElement("span")
            dataSpan.classList.add("hourlyItem")
            dataSpan.innerHTML = 
            `<p class="p_hour-forecast">${hourForecast}</p>
            <div class="container_hourly-img">
                <img class="img" src="http://openweathermap.org/img/w/${icon}.png" alt="${icon}.png"/>
            </div>
            <p>${Math.round(temp)}°C</p>`
            selectGroup.appendChild(dataSpan)
            
            if (hour === 24) {
                hour = 0;           
            }

            hour++;  
            hourForecastNum++;
            i++;  
        }
        groupNum++;
        i++; 
    }

    // Removes the preloader before hourly data was loaded
    let preloader = document.getElementById("preloader")
    preloader.style.display = "none"
}

const dailyData = (data) => {
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
        let sr = new Date(sunrise * 1000).toLocaleTimeString("en-US", {timeStyle: "short"})
        let ss = new Date(sunset * 1000).toLocaleTimeString("en-US", {timeStyle: "short"})
        let dailyDataItem = document.createElement("div")
        dailyDataItem.classList.add("daily-data_item")
        dailyDataItem.innerHTML = 
        `<div class="daily-main-data">
            <p class="day_name">${daysArray[days]}:</p>
            <p class="day_minmax-weather">${Math.round(max)}°C / ${Math.round(min)}°C</p>
            <button class="arrow-btn btn-hide" id="Btn${dayNum}">
                <i id="rotateArrowBtn${dayNum}" class="fa-solid fa-chevron-down"></i>
            </button>
        </div>
        <div id="secunDataBtn${dayNum}" class="daily-secun-data">      
            <p class="day_humidity">Humedad: ${humidity}%</p>
            <p class="day_humidity">Salida del sol: ${sr}</p>
            <p class="day_humidity">Puesta del sol: ${ss}</p>
            <p class="day_humidity">Velocidad del viento: ${wind_speed}m/s</p>
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

const currentData = (data) => {
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

const secunData = (dayNum) => { 
    const hiddenData = document.getElementById(`secunData${dayNum}`);
    const btnShowData = document.getElementById(`rotateArrow${dayNum}`);
    hiddenData.classList.toggle("change-height")
    btnShowData.classList.toggle("rotate-arrow")  
}



// Call a function to requests the data from the API
getWeatherData()

export default getWeatherData;
