

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAx4ahxYbpCVsvkg0DJepiILkxWVepORBM",
  authDomain: "my-travels-project.firebaseapp.com",
  databaseURL: "https://my-travels-project.firebaseio.com",
  projectId: "my-travels-project",
  storageBucket: "my-travels-project.appspot.com",
  messagingSenderId: "203317717944"
};
firebase.initializeApp(config);

var travelDatabase = firebase.database();

$('.dropdpwnCountry').on('click', function(event) {
    event.preventDefault();
    // vars for all stored data
    var mapData;
    var weatherData;
    var infoData;  // pulled from wikiAPI

    // object to hold all data pulled from APIs
    var storedData = {
       Map: mapData,
       Weather: weatherData, 
       Info: infoData
    };
    database.ref().push(storedData);

});

// creates event for childed added in firebase database
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
   
    // vars to hold stored data that will be output to our page
    var mapData = childSnapshot.val().Map;
    var weatherData = childSnapshot.val().Weather;
    var infoData = childSnapshot.val().Info;
});


var place;


var tuGoApiKey = "xspyubpakcte72gaz2tw6qdd";
var queryUrl1 = "https://api.tugo.com/v1/travelsafe/countries";

var googleMapApi = "AIzaSyDqX1VGaQvp5vQLnVevNjdrNp_sgkZHIvo";
var queryUrl2 = "https://www.google.com/maps/embed/v1/place?key=" + googleMapApi + "&q=" + place;


var googleFlyApi = "AIzaSyABcRXvnEe7i7jhMRMDJnlADv3ARCch9do";
var queryUrl3 = "https://www.googleapis.com/qpxExpress/v1/trips/" + place + "?key=" + googleFlyApi;

var eventBriteApiKey ="CE4R5PQ42MM4QQYFKNWR";
var queryUrl4 = "https://www.eventbriteapi.com/v3/events/search/?q=" + place + "&token=" + eventBriteApiKey;

var openWeatherApiKey = "facab843d1108e8cef093e69a2ef4979";
// place needs to be a city
var queryUrl5 = "http://api.openweathermap.org/data/2.5/weather?q=" + place + "&units=imperia&appid=" + openWeatherApiKey;

//Wikipedia
var queryUrl6 = "https://en.wikipedia.org/w/api.php?action=query&titles=" + place + "&prop=images&format=json&formatversion=2";


//Google Map
$.ajax({
    url: queryUrl2,
    method: "GET"
}).then(function (googleMaps) {
    console.log(googleMaps);
})

//tuGo AJAX call
$.ajax({
    url: queryUrl1,
    method: "GET",
    headers: {
        "X-Auth-API-Key": "xspyubpakcte72gaz2tw6qdd" 
     } 
}).then(function (response) {
    console.log(response);
})

//Google Fly
$.ajax({
    url: queryUrl3,
    method: "GET"
}).then(function (googleFly) {
    console.log(googleFly);
})

//Event Brite
$.ajax({
    url: queryUrl4,
    method: "GET"
}).then(function (eventBrite) {
    console.log(eventBrite);
})

//Open Weather
$.ajax({
    url: queryUrl5,
    method: "GET"
}).then(function (openWeather) {
    $(".city").html("<h1>" + openWeather.name + " Weather Details</h1>");
    $(".temp").text("Current Temperature (°F): " + openWeather.main.temp);
    $(".high").text("High (°F): " + openWeather.main.temp_max);
    $(".low").text("Low (F): " + openWeather.main.temp_min);
    $(".weather").text("Weather Conditions: " + openWeather.weather.main);
    $(".humidity").text("Humidity: " + openWeather.main.humidity);
    $(".wind").text("Wind Speed (m/s): " + openWeather.main.wind.speed);

    var newWeather = {
        country: openWeather.name,
        temperature: openWeather.main.temp,
        high: openWeather.main.temp_max,
        low: openWeather.main.temp_min,
        conditions: openWeather.weather.main,
        humidity: openWeather.main.humidity,
        wind: openWeather.main.wind.speed
      };
})

//Wikipedia
$.ajax({
    url: queryUrl6,
    method: "GET"
}).then(function (wikipedia) {
    console.log(wikipedia);
})

// <select name="countryChosen"> 
//   <option value="id">"englishName"</option>
// </select>
//

//https://www.eventbriteapi.com/v3/events/search/?q=newyork&token=CE4R5PQ42MM4QQYFKNWR


