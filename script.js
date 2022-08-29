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
var cityFormEl = $('#cityInput');
var searchBtn = $('#searchButton');
var clearBtn = $('#clearHistory');
var searchedCitiesEl = $('#pastSearches');

var currentCity;

//onClick Eventlistners (jquery edition)

searchBtn.on("click", handleCityFormSubmittion);
clearBtn.on("click", clearSearch);
searchedCitiesEl.on("click", lastSavedCity);

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
function fetchWeather(data) {

    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // current weather
            var currentConditionsEl = $('#currentConditions');
            currentConditionsEl.addClass('border border-primary');

            // create city name element and display
            var cityNameEl = $('<h2>');
            cityNameEl.text(currentCity);
            currentConditionsEl.append(cityNameEl);

            // get date from results and display by appending to city name element
            var currentCityDate = data.current.dt;
            currentCityDate = moment.unix(currentCityDate).format("MM/DD/YYYY");
            var currentDateEl = $('<span>');
            currentDateEl.text(` (${currentCityDate}) `);
            cityNameEl.append(currentDateEl);

            // get weather icon and display by appending to city name element            
            var currentCityWeatherIcon = data.current.weather[0].icon; // current weather icon
            var currentWeatherIconEl = $('<img>');
            currentWeatherIconEl.attr("src", "http://openweathermap.org/img/wn/" + currentCityWeatherIcon + ".png");
            cityNameEl.append(currentWeatherIconEl);

            // get current temp data and display
            var currentCityTemp = data.current.temp;
            var currentTempEl = $('<p>')
            currentTempEl.text(`Temp: ${currentCityTemp}°F`)
            currentConditionsEl.append(currentTempEl);

            // get current wind speed and display
            var currentCityWind = data.current.wind_speed;
            var currentWindEl = $('<p>')
            currentWindEl.text(`Wind: ${currentCityWind} MPH`)
            currentConditionsEl.append(currentWindEl);

            // get current humidity and display
            var currentCityHumidity = data.current.humidity;
            var currentHumidityEl = $('<p>')
            currentHumidityEl.text(`Humidity: ${currentCityHumidity}%`)
            currentConditionsEl.append(currentHumidityEl);

            // get current UV index, set background color based on level and display
            var currentCityUV = data.current.uvi;
            var currentUvEl = $('<p>');
            var currentUvSpanEl = $('<span>');
            currentUvEl.append(currentUvSpanEl);

            currentUvSpanEl.text(`UV: ${currentCityUV}`)

            if (currentCityUV < 3) {
                currentUvSpanEl.css({ 'background-color': 'green', 'color': 'white' });
            } else if (currentCityUV < 6) {
                currentUvSpanEl.css({ 'background-color': 'yellow', 'color': 'black' });
            } else if (currentCityUV < 8) {
                currentUvSpanEl.css({ 'background-color': 'orange', 'color': 'white' });
            } else if (currentCityUV < 11) {
                currentUvSpanEl.css({ 'background-color': 'red', 'color': 'white' });
            } else {
                currentUvSpanEl.css({ 'background-color': 'violet', 'color': 'white' });
            }

            currentConditionsEl.append(currentUvEl);

            // 5 - Day Forecast
            // create 5 Day Forecast <h2> header
            var fiveDayForecastHeaderEl = $('#fiveDayForecastHeader');
            var fiveDayHeaderEl = $('<h2>');
            fiveDayHeaderEl.text('5-Day Forecast:');
            fiveDayForecastHeaderEl.append(fiveDayHeaderEl);

            var fiveDayForecastEl = $('#fiveDayForecast');

            // get key weather info from API data for five day forecast and display
            for (var i = 1; i <= 5; i++) {
                var date;
                var temp;
                var icon;
                var wind;
                var humidity;

                date = data.daily[i].dt;
                date = moment.unix(date).format("MM/DD/YYYY");

                temp = data.daily[i].temp.day;
                icon = data.daily[i].weather[0].icon;
                wind = data.daily[i].wind_speed;
                humidity = data.daily[i].humidity;

                // create a card
                var card = document.createElement('div');
                card.classList.add('card', 'col-2', 'm-1', 'bg-primary', 'text-white');

                // create card body and append
                var cardBody = document.createElement('div');
                cardBody.classList.add('cardBody');
                cardBody.innerHTML = `<h6>${date}</h6>
                                      <img src= "http://openweathermap.org/img/wn/${icon}.png"> </><br>
                                       ${temp}°C<br>
                                       ${wind} KPH <br>
                                       ${humidity}%`

                card.appendChild(cardBody);
                fiveDayForecastEl.append(card);
            }
        })
    return;
}



//Function for displaying the current and future weather to the users window. 
//FETCH our weather data
// We must create an AJAX call and build our URL to get the data from the API
function renderSearchedCities () {
    var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    var pastSearchesEl = document.getElementById('pastSearches');

    pastSearchesEl.innerHTML = '';

    for (i = 0; i < storedCities.length; i++) {

        var pastCityBtn = document.createElement("button");
        pastCityBtn.classList.add("btn", "btn-primary", "my-2", "pastCities");
        pastCityBtn.setAttribute("style", "width: 100%");
        pastCityBtn.textContent = `${storedCities[i].city}`;
        pastSearchesEl.appendChild(pastCityBtn);
    }
}

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

            displaySearchHistory();

            return cityInfo;
        })
        .then(function (data) {
            fetchWeather(data);
        })
    return;
}




// local storage variable and clear function(s) below
function clearSearch(event) {
    event.preventDefault();
    var pastSearchesEl = document.getElementById('pastSearches');

    localStorage.removeItem("cities");
    pastSearchesEl.innerHTML = '';

    return;
}

function clearCurrentCityWeather() {
    var currentConditionsEl = document.getElementById("currentWeather");
    currentConditionsEl.innerHTML = '';

    var fiveDayForecastHeaderEl = document.getElementById("fiveDayForecastTitle");
    fiveDayForecastHeaderEl.innerHTML = '';

    var fiveDayForecastEl = document.getElementById("fiveDayForecast");
    fiveDayForecastEl.innerHTML = '';

    return;
}
//When city name is submited this function handles this request by sending to the function that gets that cities coordinates.
function  handleCityFormSubmittion(event) {
    event.preventDefault();
    currentCity = cityFormEl.val().trim();
    clearSearch();
    coordinateFetch();

    return;
}
// This function allows the user to see an updated forcast that is retrieved and displayed only after the previously search city eventlistner has been click.
function lastSavedCity(event) {
    var element = event.target;

    if (element.matches(".pastCities")) {
        currentCity = element.textContent;

        clearSearch();

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

// clear functions end here
renderSearchedCities();