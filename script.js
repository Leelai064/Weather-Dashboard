//API Key connection and important search variables for user interaction
var apiKey ="43ba0298f7a8d5140e365181bc0de745";
var searchBtn=$(".searchBtn");
var searchInput =$(".searchInput");
//location data
var temperature = $(".temp");
var humidity = $(".humidity");
var windspeed = $(".windspeed");
var UVindex = $("uvindex");
var searchcity=[];
var city= "";
//left column display variables
// var CityName: $(".cityname");


if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
    console.log("searchHistory not found");
}else{
    console.log("searchHistory loaded into searchHistoryArr");
    renderSearchHistory();
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


 }

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
  })
  .then(function (data) {
      console.log(data);
      console.log(data.city.name);
    })
}

//when the user wants to clear their search history from local storage.
function clearsearch(event){
    event.preventDefault();
    searchcity=[];
    localStorage.removeItem("City Name");
    document.location.reload();
}
//look this up^
//api key insertion
//console log everythinnnng
