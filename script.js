// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

//API Key connection and important search variables for user interaction
var apiKey = "43ba0298f7a8d5140e365181bc0de745";

//Query variables 
var cityInputEl = $('#enter-city');
var searchBtn = $('#search-button');
var clearBtn = $('#clear-history');
var pastSearchedCitiesEl = $('#past-searches');

var currentCity;

//onClick Eventlistners (jquery edition)

searchBtn.on("click", handleCityFormSubmittion);
clearBtn.on("click", clearSearch);
pastSearchedCitiesEl.on("click", lastSavedCity);

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
function fetchWeather(data) {

    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

           //These two lines below will display the searched credentials
            var currentConditionsEl = $('#currentConditions');
            currentConditionsEl.addClass('border border-primary');

            // Below are the credentials that I'll list that will be displayed to the viewport by direct injection into the HTML code.
            var cityNameEl = $('<h2>');
            cityNameEl.text(currentCity);
            currentConditionsEl.append(cityNameEl);

           //display the city data credentials
            var currentCityDate = data.current.dt;
            currentCityDate = moment.unix(currentCityDate).format("MM/DD/YYYY");
            var currentDateEl = $('<span>');
            currentDateEl.text(` (${currentCityDate}) `);
            cityNameEl.append(currentDateEl);

            //icon/display that is directly linked to the city name element credentials         
            var currentCityWeatherIcon = data.current.weather[0].icon; // current weather icon
            var currentWeatherIconEl = $('<img>');
            currentWeatherIconEl.attr("src", "http://openweathermap.org/img/wn/" + currentCityWeatherIcon + ".png");
            cityNameEl.append(currentWeatherIconEl);

          // current temperature data credentials will be displayed above the five day forecast like the data above
            var currentCityTemp = data.current.temp;
            var currentTempEl = $('<p>')
            currentTempEl.text(`Temp: ${currentCityTemp}°F`)
            currentConditionsEl.append(currentTempEl);

            //windspeed credentials will be displayed below
            var currentCityWind = data.current.wind_speed;
            var currentWindEl = $('<p>')
            currentWindEl.text(` Wind: ${currentCityWind} MPH `)
            currentConditionsEl.append(currentWindEl);

           //humidity will be displayed below
            var currentCityHumidity = data.current.humidity;
            var currentHumidityEl = $('<p>')
            currentHumidityEl.text(` Humidity: ${currentCityHumidity}% `)
            currentConditionsEl.append(currentHumidityEl);

            //UV data credentials listed below
            var currentCityUV = data.current.uvi;
            var currentUvEl = $('<p>');
            var currentUvSpanEl = $('<span>'); //Without this span the cards for each element credential needed will not display!!
            currentUvEl.append(currentUvSpanEl);
            
            currentUvSpanEl.text(` UV: ${currentCityUV} `)

                // Once the UV is display the data cycles through these if else statements and if the UV fits the criteria, the color it matches will highlight the UV credential
            if (currentCityUV < 3) {
                currentUvSpanEl.css({ 'background-color': 'green', 'color': 'white' });
            }  else if (currentCityUV < 6) {
                currentUvSpanEl.css({ 'background-color': 'yellow', 'color': 'black' });
            }  else if (currentCityUV < 8) {
                currentUvSpanEl.css({ 'background-color': 'orange', 'color': 'white' });
            }  else if (currentCityUV < 11) {
                currentUvSpanEl.css({ 'background-color': 'red', 'color': 'white' });
            } else {
                currentUvSpanEl.css({ 'background-color': 'violet', 'color': 'white' });
            }

            currentConditionsEl.append(currentUvEl);

           //Here the five day forecast will be displayed
            var fiveDayForecastHeaderEl = $('#fiveDayForecastHeader');
            var fiveDayHeaderEl = $('<h2>');
            fiveDayHeaderEl.text('Five Day Projected Forecast:');
            fiveDayForecastHeaderEl.append(fiveDayHeaderEl);

            var fiveDayForecastEl = $('#fiveDayForecast');

            // get key weather info from API data for five day forecast and display
            for (var i = 1; i <= 5; i++) {
                var date;
                var temp;
                var icon;
                var wind;
                var humidity;
                var uvi;

                date = data.daily[i].dt;
                date = moment.unix(date).format("MM/DD/YYYY");

                temp = data.daily[i].temp.day;
                icon = data.daily[i].weather[0].icon;
                wind = data.daily[i].wind_speed;
                humidity = data.daily[i].humidity;
                uvi = data.daily[i].uvi;

                // create a card
                var card = document.createElement('div');
                card.classList.add('card', 'col-2', 'm-1', 'bg-primary', 'text-white');

                // create card body and append
                var cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                cardBody.innerHTML = `<h6>${date}</h6>
                                      <img src= "http://openweathermap.org/img/wn/${icon}.png"> </><br>
                                       ${temp}°C<br>
                                       ${wind} KPH <br>
                                       ${humidity}%<br>
                                       ${uvi}
                                       `

                card.appendChild(cardBody);
                fiveDayForecastEl.append(card);
            }
        })
    return;
}

// Display search history as buttons
function renderSearchedCities() {
    var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    var pastSearchesEl = document.getElementById('past-searches');

    pastSearchesEl.innerHTML = '';

    for (i = 0; i < storedCities.length; i++) {

        var pastCityBtn = document.createElement("button");
        pastCityBtn.classList.add("btn", "btn-primary", "my-2", "past-city");
        pastCityBtn.setAttribute("style", "width: 100%");
        pastCityBtn.textContent = `${storedCities[i].city}`;
        pastSearchesEl.appendChild(pastCityBtn);
    }
    return;
}

// use Open Weather 'Current weather data (API)' to get city coordinates to then send to 'One Call API' to get weather
function coordinateFetch() {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}`;
    var storedCities = JSON.parse(localStorage.getItem("cities")) || [];

    fetch(requestUrl)
        .then(function (response) {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function (data) {

            var cityInfo = {
                city: currentCity,
                lon: data.coord.lon,
                lat: data.coord.lat
            }

            storedCities.push(cityInfo);
            localStorage.setItem("cities", JSON.stringify(storedCities));

            renderSearchedCities();

            return cityInfo;
        })
        .then(function (data) {
            fetchWeather(data);
        })
    return;
}

// handle requst to clear past search history
function clearSearch(event) {
    event.preventDefault();
    var pastSearchesEl = document.getElementById('past-searches');

    localStorage.removeItem("cities");
    pastSearchesEl.innerHTML = '';

    return;
}

function clearCurrentCityWeather() {
    var currentConditionsEl = document.getElementById("currentConditions");
    currentConditionsEl.innerHTML = '';

    var fiveDayForecastHeaderEl = document.getElementById("fiveDayForecastHeader");
    fiveDayForecastHeaderEl.innerHTML = '';

    var fiveDayForecastEl = document.getElementById("fiveDayForecast");
    fiveDayForecastEl.innerHTML = '';

    return;
}

// handle submit of city name by trimming and sending to getCoordinates function, clear HTML display of past weather data, cards, titles
function handleCityFormSubmittion(event) {
    event.preventDefault();
    currentCity = cityInputEl.val().trim();

    clearCurrentCityWeather();
    coordinateFetch();

    return;
}

// When user clicks on city previously searched, an updated forecast will be retrieved and displayed
function lastSavedCity(event) {
    var element = event.target;

    if (element.matches(".past-city")) {
        currentCity = element.textContent;

        clearCurrentCityWeather();

        var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}`;

        fetch(requestUrl)
            .then(function (response) {
                if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            })
            .then(function (data) {
                var cityInfo = {
                    city: currentCity,
                    lon: data.coord.lon,
                    lat: data.coord.lat
                }
                return cityInfo;
            })
            .then(function (data) {
                fetchWeather(data);
            })
    }
    return;
}

renderSearchedCities();

