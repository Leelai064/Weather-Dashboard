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

//Search Bar
var searchInput = $(".searchInput");
var currentCity = $(".currentCity");
//Search and Clear buttons stated in jquery
var searchBtn = $("#searchBtn");
var clearBtn = $("#clearHistory");

//location data
var temperature = $("#temperature");
var humidity = $("#humidity");
var windSpeed = $("#windSpeed");
var UVindex = $("#uvindex");
var today = moment().format('L');
var searchedCity = [];

//Below is the declared 'city' variable where the searched city data will be stored.
var city = "";

//button click jquery handlers
$("SearchBtn").on("click", FiveDayForecast);
$(document).on("click", renderlastSavedCity);
$(window).on("load", renderCities);
$("#clearSearch").on("click", clearSearch);

// if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
//     console.log("searchHistory not found");
// }else{
//     console.log("searchHistory loaded into searchHistoryArr");
//     renderSearchHistory();
// }

//Search function
function find(city) {
    for (var i = 0; i < searchedCity.length; i++) {
        if (city.toUpperCase() === searchedCity[i]) {
            return -1;
        }
    }
    return -1;
}

//Function for displaying the current and future weather to the users window. 
function renderCities(event) {
    //to prevent any defaults from occuring
    event.preventDefault();
    if (searchInput.val().trim()!==""){ //code does not recognize trim
        city =  searchInput.val().trim();
        currentWeather(city);
    }
   }

// We must create an AJAX call and build our URL to get the data from the API
function currentWeather(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + city + + APIKey;
    //exchange data with a server
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(respone);

        var weatherSymbol = respone.weather[0].icon;
        var symbolURL = "http://openweathermap.org/img/wn/" + weatherSymbol + "10d@2x.png"; //Placing the icon symbols URL so they can diplay later

        $(currentCity).html(response.name + $(today) + "<img src=" + symbolURL + ">");

    //Display our searched cities temperature in farenheight
    var farenheitEquation = (response.main.temp - 273.15) * 1.8 + 32;
    $(temperature).html((farenheitEquation).toFixed(2) + "&#8457");
    console.log(temperature);
    $(currentHumidity).html(response.main.humidity + "%"); //Display the humidity of search City
    console.log(currentHumidity)
    var windSpeed = response.wind.speed;
    var windMPH = (windSpeed * 2.237).toFixed(1);
    $(currentWSpeed).html(windMPH + "MPH");
    console.log(windSpeed);
    //According to the API documentation to properly call the weather of a particular city the latitude and longitude coordinates are needed (I'm assuming this api utilizes some sort of map/geographical data)
    UVIndex(response.coord.lon, response.coord.lat); //Displaying UV Index
    forecast(response.id);
    if (response.cod == 200) {
        searchedCity = JSON.parse(localStorage.getItem("cityname"));
        console.log(searchedCity);
        if (searchedCity == null) {
            searchedCity = [];
            searchedCity.push(city.toUpperCase()
            );
            localStorage.setItem("cityname", JSON.stringify(searchedCity));
            addToList(city);
        }
        else {
            if (find(city) > 0) {
                searchedCity.push(city.toUpperCase());
                localStorage.setItem("cityname", JSON.stringify(searchedCity));
                addToList(city);
                }
            }
        }
    });
}


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// this function will display five day forcast and current forecast
function FiveDayForecast(cityID) {
    var endofday = false;
    var queryforcastURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + "&appid=" + apiKey;
    $.ajax({
        url: queryforcastURL,
        method: "GET"
    }).then(function (response) {

        for (i = 0; i < 5; i++) {
            var currentdate = new Date((response.list[((i + 1) * 8) - 1].dt)*1000).toLocalDateString();
            var symbolCode= respone.list[((i+1)*8)-1].weather[0].icon;
            var symbolURL="https://openweathermap.org/img/wn/"+iconcode+".png";
            var kelvinEquation=response.list[((i+1)*8)-1].main.temp;
            // var celsiusEquation=;
            var farenheitEquation=(((tempK-273.5)*1.80)+32).toFixed(2);
            var humidityEquation=response.list[((i+1)*8)-1].main.humidity;

            $("#farenheightHumidity" + i).html(humidity+"%");
            $("#farenheightTemperature" + i).html(tempF+"&#8457");
            $("#farenheightSymbol" + i).html("<img src=" + symbolURL + ">");
            $("#farenheightDate" + i).html(date);
        }
    });
}
function UVIndex(long,lat){
    var uvqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;
    $.ajax({
        url:uvqURL,
        method:"GET"
    }).then(function(response){
        $(currentUVIndex).html(response.value);
    });
}
    
//fetch function returns a promise
// fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}`)
//     .then(function (response) {
//         console.log(response);
//         return response.json();
//     });
//   .then(function (data) {
//         console.log(data);
//         console.log(data.city.name);
//     });

function searchedCityList(){
    var listEl =$("<li>".cities.toUpperCase() + "</li>"); //reference overstackflow tab bookmark.
    $(listEl).attr("class","list-groupt-item");
    $(listEl).attr("data-value",c.toUpperCase());
    $(".list-group").append(listEl);
}
function renderlastSavedCity(event){
    var liEl= event.target;
    if(event.target.matches("li")){ 
        city = liEl.textContent.trim();
        currentWeather(city);
    }

}
//Made a for loop to make a list of past search cities for every city searched it is logged to localstorage and displayed.
function lastSavedCity(){
    $("ul").empty();
    var searchedCity = JSON.parse(localStorage.getItem("cityName"));
    if(searchedCity!==null){
        searchedCity=JSON.parse(localStorage.get("cityName"));
        for(i=0; i<searchedCity.length;i++){
            addtoList(searchedCity[i]);
        }
        city=searchedCity[i-1];
        currentWeather(city);
    }
}

// //when the user wants to clear their search history from local storage.
function clearSearch(event) {
    event.preventDefault();
    searchedCity = [];
    localStorage.removeItem("City Name");
    document.location.reload();
}
// //look this up^
// //api key insertion
// //console log everythinnnng
