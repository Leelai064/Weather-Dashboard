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
var cityFormEl = $('#enter-city');
var searchBtn = $('#searchButton');
var clearBtn = $('#clearHistory');
var searchedCitiesEl = $('#pastSearches');

var currentCity;

//onClick Eventlistners (jquery edition)

searchBtn.on("click", handleCityFormSubmittion);
clearBtn.on("click", handleClearHistory);
searchedCitiesEl.on("click",retrievePastCity);

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
var storedCities = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
}

//Search function
var findForecast = function (event) {
   event.preventDefault();
   var city= cityInput.value.trim();
   if(city){

   }
   storedCities(city);
   localStorageSearches();

}

//Function for displaying the current and future weather to the users window. 
//FETCH our weather data
// We must create an AJAX call and build our URL to get the data from the API
var renderCities = function(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiUrl).then(function(response){
        response.json().then(function(weatherdata){
            currentWeather(weatherdata,city);
            //longitude and latitude coordinates used in API to identify the city that we're asking of it.
            long = data.coord.long;
            lat = data.coord.lat;
            FiveDayForecast(city);
        });
    });
}

//We need the windspeed,humidity,temperature,weatherimgs, and weather data display variables.
//moment.js for date
//image/icons url build found in documentation
//add temp, windspeed, and humidity data to our span id in the bootstrap column container
function currentWeather(city) { //maybe use jquery for links *suggestion*
    
}


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// this function will display five day forcast and current forecast
var FiveDayForecast = function(city) { //add city data a var
    var apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&cnt=5&units=imperial&appid=${apiKey}`

    fetch(apiUrl)
    .then(function(respone){
        response.json().then(function(weatherdata){
            displayForcast(weatherdata);
        });
    });
};

var displayForcast = function(weather){
    fore
}
// UV index data pulled from the API
function UVIndex(long,lat){

}
//Searched city data stored in local storage and rendered
    

function searchedCityList(search){
  
}

function renderlastSavedCity(event){
  

}
//Made a for loop to make a list of past search cities for every city searched it is logged to localstorage and displayed.
function lastSavedCity(){

}

// local storage variable and function(s) below
function clearSearch(event) {
    event.preventDefault();
    searchedCity = [];
    localStorage.removeItem("City Name");
    document.location.reload();
}
// //look this up^
// //api key insertion
// //console log everythinnnng
//button click jquery handlers
lastSavedCity();
SearchBtn.addEventLister("submit", FiveDayForecast());
document.on("click", renderlastSavedCity);
// $clearSearch.on("click", clearSearch);