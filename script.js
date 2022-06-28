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

//Query variables tied to HTML forms and ID's
var city = document.querySelector("#city");
var cityFormEL = document.querySelector("#cityForm");
var cityInput = document.querySelector("#city");
var weatherForm = document.querySelector("#currentWeatherForm");
var searchedCity = document.querySelector("#searchedCity");
var currentForcast = document.querySelector("#currentForecast");
var forecastForm =  document.querySelector("#fiveDayForecastForm")
var searchButton = document.querySelector("#searchButton");
//Search and Clear buttons stated in jquery
var searchBtn = document.querySelector("#searchBtn");

//location data
var searchedCity = [];
var lat = 0.0;
var long =0.0;

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
//Search function
var findForecast = function (event) {
   event.preventDefault();
}

//Function for displaying the current and future weather to the users window. 
function renderCities(event) {
   
}

// We must create an AJAX call and build our URL to get the data from the API
function currentWeather(city) { //maybe use jquery for links *suggestion*
    
}


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// this function will display five day forcast and current forecast
function FiveDayForecast(city) { //add city data a var
   
}
// UV index data pulled from the API
function UVIndex(long,lat){

}
//Searched city data stored in local storage and rendered
    

function searchedCityList(){
  
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