var apiKey = "43ba0298f7a8d5140e365181bc0de745";

//Query variables 
var cityInputEl = $('#enter-city');
var searchBtn = $('#search-button');
var clearBtn = $('#clear-history');
var pastSearchedCitiesEl = $('#past-searches');
var currentCity = [];

//onClick Eventlistners (jquery edition)

searchBtn.on("click", cardCreations);
clearBtn.on("click", clearHistory);
pastSearchedCitiesEl.on("click", localStorageFetch);

function weatherFetch(data) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apikey}`
    //Request temp literal with api key at the end!

    fetch(queryURL).then(function (returnedData) {
        return returnedData.json();
    })  //In this function (most likely need a .then here...But the credentials that we need are going to be spelled out here)
        .then(function (data) {
            //save the data picked from the API into JSON file format

            //UV Index section starts here
            var uvIndex = data.list.uvi;
            var uvEl = $("<p>");
            uvEl.append(uvSpanEl);
            uvIndex.append()
            var uvSpanEl = $('<span>');

            //Need a conditional block for each color that displays the level of UV

            if (uvIndex < 3) {
                uvSpanEl.css({ 'background-color': 'green', 'color': 'white' });
            } else if (uvIndex < 6) {
                uvSpanEl.css({ 'background-color': 'yellow', 'color': 'black' });
            } else if (uvIndex < 8) {
                uvSpanEl.css({ 'background-color': 'orange', 'color': 'white' });
            } else if (uvIndex < 11) {
                uvSpanEl.css({ 'background-color': 'red', 'color': 'white' });
            } else {
                uvSpanEl.css({ 'background-color': 'violet', 'color': 'white' });
            }

            //UV Index Section ends here

            //Weather both and F and C(Make this another eventlistner or maybe a timer)
            var temperature = data.list.main.temp;
            temperatue.getElementById.add(temperature);
            var farenheit = celsius * 9 / 5 + 32;
            var celsius = (farenheit - 32) * 5 / 9;

            //Wind Speed
            var windMPH = data.list.wind.speed;
            windMP.getElementById.add(wind - speed);
            //Humidity

            var humidity = data.list.main.humidity;
            humidity.getElementById.add(humidity);

            //Icons to appear!!
            var weatherIcons = data.current.weather[0].icon;// site openweathermap.org/weather-conditions
            var iconEl = $('<img>');
            IconEl.attr("src", "http://openweathermap.org/img/wn/" + weatherIcons + ".png");
            cityNameEl.append(iconEl);

            // Descriptions of Icons! and Weather
            var weatherDesc = data.current.weather[0].description;
            var weatherDescEl = $('<h6>');
            weatherDescEl.attr("src", "http://openweathermap.org/img/wn/" + weatherDesc);

            //current weather classes added to the card and city information i.e. data,name!
            // current conditions needs to be added to the card
            var currentWeatherEl = $(`#currentWeather`);
            currentWeatherEl.addClass('border', 'border-white');
            var currentDate = $('span');
            currentDate.text(`${currentSearchedDate}) `);
            var cityNameEl = $('<h2>');
            cityNameEl.append(currentDate);
            cityNameEl.text(currentCity);
            currentConditionsEl.append(cityNameEl);

            //Note we need 5 days to broadcast!
            for (var i = 1; i <= 5; i++) {
                var date;
                var temp1;
                var temp2;
                var weatherIcon;
                var wind;
                var humidity;


                //Card Creation!!
                var dayCard = document.createElement("div");
                dayCard.classList.add("card", "m-1", "bg-dark", "text-white")
                var inputData = document.createElement("div");
                inputData.innerHTML =
                    `<h5>${date}</h5><br>
             <img src = http://http://openweathermap.org/img/wn/${icon}.png></img>
            ${temp1}°F<br> //Farenheit
            ${temp2}°F<br> //Celsius
            ${wind} MPH<br>
            ${humidity} %<br>
`

                //displays date. Refer to moments to understand lines 56 and 57
                date = moment.unix(date).format("MM/DD/YYYY");
                date = data.daily[i].dt;


                temp = data.daily[i].humidity;
                weatherIcon = data.daily[i].humidity;
                wind = data.daily[i].humidity;
                humidity = data.daily[i].humidity;

                dayCard.appendChild(inputData);
                fiveDayDisplayForecast.append(dayCard);

                //Have the background color display a gradient!
                // var cold =;
                // var warm =;
                // var hot =;
                // if (`${temp1}`<= 50 || `${temp2}`<= -10){

                // }

            }

            //append all of these variables to elements we need a card!
            // cityCoordinates();
        })
    return;
}

function cardCreations() {
    event.preventDefault;
    cityCoordinates();
    clearHistory();

    currentCity =cityInputEl.val().trim();

}
function cityCoordinates() {
    //taking the data
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${currentCity}&appid=${apiKey}`;


    fetch(queryURL)
        .then(function (returnedData) {
            if (returnedData.status >= 200 && returnedData.status <= 299) { //needed limit for fetching data from server
                return response.json();
            } else {
                throw Error(returnedData.statusText);
            }
        }).then(function (data) {
            // var lat = data.coord.lat;
            // var long = data.cord.long;
            // var coordinate = lat + long;
            var cityInfo = {
                city: currentCity,
                lon: data.coord.lon,
                lat: data.coord.lat
            }; return cityInfo;
        })
        .then(function (data) {
            weatherFetch(data);
        })
   
    return;
}

function localStorageFetch() {
    var storeCitiesLS = JSON.parse(localStorage.getItem("cities")) || [];
    var pastSearchesEl = document.getElementById('past-searches');
    //This function will FETCH the searched cities and display them on the history block
    pastSearchesEl.innerHTML = "";
    for (i = 0; i < storedCitiesLS.length; i++) {

        var pastCityBtn = document.createElement("button");
        pastCityBtn.classList.add("btn", "btn-outline-dark","btn-sm", "my-3", "past-city");
        pastCityBtn.textContent = `${storeCitiesLS[i].city}`;
        pastSearchesEl.appendChild(pastCityBtn);
    }
    return;

}
function clearHistory() {
    event.preventDefault();
    localStorage.removeItem("cities");
    pastSearchedCitiesEl.innerHTML = [];
    var pastSearchedCitiesEl = document.getElementById("past-searches");
    //When the user clicks the clear button the history is wiped from the viewport and localstorage!!!
    console.log("Goodbye World!");
}

// function temperatureConversion() {

//     //this function will convert the temperature from celsius to farenheit
// }

function renderHistory() {

    for (var i = 0; i < cityCoordinates.length; i++) {
        if ($('#search-button') = true) {
            var searchedCity = document.createElement("button");
            searchedCity.classList.add("btn", "btn-outline-dark", "my-2", "searchedCity");
            searchedCity.setAttribute("style", "width: 100%")
            // $('#search-button').fadeIn('slow');
            pastSearchedCitiesEl.appendChile(searchedCity).fadeIn('slow');
        }
    }
    //this function will display the weather!!
    console.log('WELCOME TO THIS WEEKS WEATHER FORCAST!');
    return;
}