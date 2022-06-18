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
var apiKey ="43ba0298f7a8d5140e365181bc0de745";

//Search Bar
var searchInput =$(".searchInput");

//Search and Clear buttons stated in jquery
var searchBtn=$("#searchBtn");
var clearBtn=$("#clearHistory");

//location data
var temperature = $("#temperature");
var humidity = $("#humidity");
var windSpeed = $("#windSpeed");
var UVindex = $("#uvindex");
var searchedCity=[];

//Below is the declared 'city' variable where the searched city data will be stored.
var city= "";

//button click jquery handlers
$("SearchBtn").on("click",DisplayForecast);
$(document).on("click", renderSearchHistory);
$(window).on("load",renderCities);
$("#clearSearch").on("click",clearSearch);

// if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
//     console.log("searchHistory not found");
// }else{
//     console.log("searchHistory loaded into searchHistoryArr");
//     renderSearchHistory();
// }

//Function for displaying the current and future weather to the users window. 
function renderCities(event){
    
   }




//this function will pull city entry from local storage to display
function renderCities(cityName){
 renderCities.empty();
 var CitiesEl.empty = ;
}

function renderWeatherDetails(){

}
function currentweather(city){
 var queryURL= "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + city + + apiKey;
//exchange data with a server
 $.ajax({
     url:queryURL,
     method:"GET"
 }).then(function(response){


 });

}
//this function will save the city to the local storage
function savecity (){

}

//this function will display five day forcast and current forecast
function FiveDayForecast(){
 var endofday= false;
 var queryforcaseURL="http://api.openweathermap.org/data/2.5/forecast?id=524901&appid="+"&appid="+apiKey;
 $.ajax({
     url:queryforcaseURL,
     method: "GET"
 }).then(function(response){
     
    for (i=0; i<5 ; i++){
        var currentdate= new Date(response.list[((i+1)*8)-1])
    }
 }
 
 )}
function DisplayForecast(){

}
//fetch function returns a promise
fetch (`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}`)
.then(function (response) {
    console.log(response);
    return response.json();
  });
  .then(function (data) {
      console.log(data);
      console.log(data.city.name);
    });


//when the user wants to clear their search history from local storage.
function clearSearch(event){
    event.preventDefault();
    searchCity=[];
    localStorage.removeItem("City Name");
    document.location.reload();
}
//look this up^
//api key insertion
//console log everythinnnng
