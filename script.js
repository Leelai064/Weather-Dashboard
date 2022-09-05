var apiKey = "43ba0298f7a8d5140e365181bc0de745";

//Query variables 
var cityInputEl = $('#enter-city');
var searchBtn = $('#search-button');
var clearBtn = $('#clear-history');
var pastSearchedCitiesEl = $('#past-searches');
var currentCity = [];

//onClick Eventlistners (jquery edition)

searchBtn.on("click", handleCityFormSubmittion);
clearBtn.on("click", clearSearch);
pastSearchedCitiesEl.on("click", lastSavedCity);

function weatherFetch(data){

    //Request temp literal with api key at the end!
  
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + city + + apiKey;
    fetch(queryURL).then(function(returnedData){
        return returnedData.json();
    });
        //save the data picked from the API into JSON file format
        
        //In this function (most likely need a .then here...But the credentials that we need are going to be spelled out here)
        

        //UV Index
        //Need a conditional block for each color that displays the level of UV

        //Weather both and F and C(Make this another eventlistner or maybe a timer)

        //Wind Speed

        //Humidity

        //Icons to appear!!

        //Note we need 5 days to broadcast!
    }
function cityCoordinates(){
    //taking the data

}
function localStorageFetch(){

    //This function will FETCH the searched cities and display them on the history block

}
function clearHistory(){

    //When the user clicks the clear button the history is wiped from the viewport and localstorage!!!

}

function temperatureConversion(){

    //this function will convert the temperature from celsius to farenheit
}

function renderHistory(){

    //this function will display the weather!!
}