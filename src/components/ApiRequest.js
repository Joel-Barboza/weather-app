

// Gets data from the API
const getWeatherData = () => {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;
        console.log(latitude, longitude);

        fetch(`https://api.openweathermap.org/data/2.5/weather?
			lat=${latitude}&
			lon=${longitude}&
			exclude=minutely&
			units=metric&
			lang=es&
			appid=${import.meta.env.VITE_API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            currentData(data);
            let preloader = document.getElementById("preloader")
            preloader.style.display = "none"
        })

        /*---------------
        TODO:fix forecast, now it's 5 days/3 hours
        ----------------*/
        // fetch(`https://api.openweathermap.org/data/2.5/forecast?
        // 	lat=${latitude}&
        // 	lon=${longitude}&
        // 	exclude=minutely&
        // 	units=metric&
        // 	lang=es&
        // 	appid=${import.meta.env.VITE_API_KEY}`).then(res => res.json()).then(data => {
        //     console.log(data)
        //     hourlyData(data)
        //     dailyData(data)
        // })
        fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&lang=es&appid=${import.meta.env.VITE_API_KEY}`)
            .then(res => res.json()).then(location => {
                locationName(location);
            })
    }, (error) => {
        switch (error.code) {
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
    preloader.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <path fill="#FFFE" d="M114,15.25H14A9.761,9.761,0,0,0,4.25,25v77A10.762,10.762,0,0,0,15,112.75h98A10.762,10.762,0,0,0,123.75,102V25A9.761,9.761,0,0,0,114,15.25ZM120.25,25V36.683H52.888L61.37,18.75H114A6.257,6.257,0,0,1,120.25,25ZM14,18.75H57.5L49.016,36.683H7.75V25A6.257,6.257,0,0,1,14,18.75Zm99,90.5H15A7.258,7.258,0,0,1,7.75,102V40.183h112.5V102A7.258,7.258,0,0,1,113,109.25Z"/>
  <path fill="#FFFE" d="M21.57,33.466a5.75,5.75,0,1,0-5.75-5.75A5.756,5.756,0,0,0,21.57,33.466Zm0-8a2.25,2.25,0,1,1-2.25,2.25A2.253,2.253,0,0,1,21.57,25.466Z"/>
  <path fill="#FFFE" d="M37.626,33.466a5.75,5.75,0,1,0-5.75-5.75A5.756,5.756,0,0,0,37.626,33.466Zm0-8a2.25,2.25,0,1,1-2.25,2.25A2.253,2.253,0,0,1,37.626,25.466Z"/>
  <path fill="#FFFE" d="M67.522,29.466h44.745a1.75,1.75,0,0,0,0-3.5H67.522a1.75,1.75,0,0,0,0,3.5Z"/>
  <path fill="#FFFE" d="M87.3,80.521A1.751,1.751,0,0,0,85.1,81.64a22.185,22.185,0,0,1-40.463,3.881l6.238,2.652a1.749,1.749,0,1,0,1.369-3.22l-10.3-4.379c-.029-.012-.059-.015-.088-.026a1.806,1.806,0,0,0-.217-.065c-.049-.01-.1-.02-.146-.026a1.7,1.7,0,0,0-.225-.014,1.365,1.365,0,0,0-.143,0,1.865,1.865,0,0,0-.232.037c-.046.01-.092.017-.137.03-.014,0-.028,0-.042.009a1.869,1.869,0,0,0-.209.093c-.027.014-.057.02-.084.034l-.012.009a1.763,1.763,0,0,0-.307.216c-.014.012-.025.028-.039.041a1.807,1.807,0,0,0-.207.23c-.024.033-.044.07-.066.1a1.826,1.826,0,0,0-.118.211c-.019.042-.035.086-.05.129a1.772,1.772,0,0,0-.066.226c-.006.025-.017.048-.022.074L37.746,92.315a1.751,1.751,0,0,0,1.429,2.021,1.78,1.78,0,0,0,.3.025A1.751,1.751,0,0,0,41.2,92.906l.836-4.88a25.692,25.692,0,0,0,46.39-5.3A1.751,1.751,0,0,0,87.3,80.521Z"/>
  <path fill="#FFFE" d="M89.207,54.819A1.752,1.752,0,0,0,87.152,56.2l-1.063,5.4a25.688,25.688,0,0,0-46.495,5.114A1.75,1.75,0,0,0,42.92,67.8a22.186,22.186,0,0,1,40.363-4.061l-6.151-2.817A1.75,1.75,0,1,0,75.675,64.1L86.03,68.847c.042.019.087.027.13.043s.081.029.123.041a1.755,1.755,0,0,0,.465.073l.01,0,.01,0a1.743,1.743,0,0,0,.479-.077.5.5,0,0,0,.056-.009,1.542,1.542,0,0,0,.161-.071c.03-.013.063-.019.093-.034.011-.006.019-.014.03-.02a1.685,1.685,0,0,0,.241-.161c.022-.016.046-.029.067-.047a1.726,1.726,0,0,0,.253-.267c.018-.024.031-.051.048-.076a1.821,1.821,0,0,0,.14-.237c.019-.04.033-.083.049-.124a1.827,1.827,0,0,0,.072-.228c.005-.02.015-.039.019-.06l2.11-10.719A1.75,1.75,0,0,0,89.207,54.819Z"/>
</svg>
    <p>Toque para recargar</p>`
    preloader.addEventListener("click", (e) => {
        window.location.reload()
    })
}

// Gets location name
const locationName = (location) => {
    console.log(location[0])
    let { name } = location[0];
    let place = document.getElementById('place');
    place.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${name}`;
}

// Displays hourly data
const hourlyData = (data) => {
    // used to show the corret hour depending on what date.getHours() value is and show the next 24 hours
    let hoursArray =
        ["12:00 am", "1:00 am", "2:00 am", "3:00 am", "4:00 am", "5:00 am",
            "6:00 am", "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am",
            "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm",
            "6:00 pm", "7:00 pm", "8:00 pm", "9:00 pm", "10:00 pm", "11:00 pm", "12:00 am"]
    const date = new Date();
    let hour = date.getHours()//gets current hour
    let hourForecast;
    let hourForecastNum = 0; // index of the array of API data used
    let groupNum = 1; // gives a number to each data items group for a scroll efect
    let contHourlyData = document.getElementById('container_hourly-data')
    contHourlyData.innerHTML = "" // prevents duplicated appends 

    for (let i = 0; i < 4;) {
        let dataGroup = document.createElement("div") // create the item groups
        dataGroup.setAttribute("id", `dataGroup${groupNum}`)
        dataGroup.classList.add("dataGroup")
        contHourlyData.appendChild(dataGroup)

        for (let i = 0; i < 6;) {
            hourForecast = hoursArray[hour]; //uses a element of the array to display an hour
            let { temp } = data.hourly[hourForecastNum]; // gets temperature from API data
            let { icon } = data.hourly[hourForecastNum].weather[0]; // gets a icon depending on the ->
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
    // let preloader = document.getElementById("preloader")
    // preloader.style.display = "none"
}

const dailyData = (data) => {
    let daysArray = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    const date = new Date();
    let days = date.getDay()
    let dayNum = 0;
    let dailyDataCont = document.getElementById("container_daily-data")
    dailyDataCont.innerHTML = ""

    for (let i = 0; i <= 6; i++) {
        let nextDays = days;
        let { max, min } = data.daily[dayNum].temp;
        let { humidity, sunrise, sunset, wind_speed } = data.daily[dayNum]
        let sr = new Date(sunrise * 1000).toLocaleTimeString("en-US", { timeStyle: "short" })
        let ss = new Date(sunset * 1000).toLocaleTimeString("en-US", { timeStyle: "short" })
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
        btnHideSecunData.addEventListener("click", function (e) {
            secunData(this.id)
        });

        if (nextDays === 6) {
            days = 0;
        } else if (nextDays !== 6) {
            days++;
        };
        dayNum++;
    };
}

const currentData = (data) => {
    let {/*humidity, pressure, sunrise, sunset, windspeed,*/ temp, feels_like } = data.main;
    let { description } = data.weather[0];
    // let { day, night } = data.daily[0].feels_like;

    let temperature = document.getElementById('temperature');
    let currentWeather = document.getElementById('current-weather');
    let dayNigthTemperature = document.getElementById('day/nigth-temperature');

    temperature.innerText = `${Math.round(temp)}°C`;
    currentWeather.innerText = `${description}`;
    dayNigthTemperature.innerText = `${Math.round(feels_like)}°C`;

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
