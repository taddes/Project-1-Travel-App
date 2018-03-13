

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAx4ahxYbpCVsvkg0DJepiILkxWVepORBM",
  authDomain: "my-travels-project.firebaseapp.com",
  databaseURL: "https://my-travels-project.firebaseio.com",
  projectId: "my-travels-project",
  storageBucket: "",
  messagingSenderId: "203317717944"
};
firebase.initializeApp(config);


var place;

var tuGoApiKey = "";
var queryUrl1 = "https://api.tugo.com/v1/travelsafe/countries/:country"

var googleMapApi = "AIzaSyDqX1VGaQvp5vQLnVevNjdrNp_sgkZHIvo";
var queryUrl2 = "https://www.google.com/maps/embed/v1/place?key=" + googleMapApi + "&q=" + place;

var googleFlyApi = "AIzaSyABcRXvnEe7i7jhMRMDJnlADv3ARCch9do";
var queryUrl3 = "https://www.googleapis.com/qpxExpress/v1/trips/" + place + "?key=" + googleFlyApi;

var eventBriteApiKey ="CE4R5PQ42MM4QQYFKNWR"
var queryUrl4 = "https://www.eventbriteapi.com/v3/events/search/?q=" + place + "&token=" + eventBriteApiKey

var openWeatherApiKey = "facab843d1108e8cef093e69a2ef4979";
var queryUrl5 = "http://api.openweathermap.org/data/2.5/weather?q=" + place + "&units=imperia&appid=" + openWeatherApiKey;

//Wikipedia
var queryUrl6 = "https://en.wikipedia.org/w/api.php?action=query&titles=" + place + "&prop=images&format=json&formatversion=2";

//tuGo
$.ajax({
    url: queryUrl1,
    method: "GET"
}).then(function (tuGo) {
    console.log(tuGo);
})

//Google Map
$.ajax({
    url: queryUrl2,
    method: "GET"
}).then(function (googleMaps) {
    console.log(googleMaps);
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
    var temp = openWeather.main.temp;
    var weather = openWeather.weather.main;
    var high = openWeather.main.temp_max;
    var low = openWeather.main.temp_min;
    var wind = openWeather.main.wind.speed;
    var humidity = openWeather.main.humidity;
    console.log(temp,weather,high,low,wind,humidity);
})

//Wikipedia
$.ajax({
    url: queryUrl6,
    method: "GET"
}).then(function (wikipedia) {
    console.log(wikipedia);
})


//https://www.eventbriteapi.com/v3/events/search/?q=newyork&token=CE4R5PQ42MM4QQYFKNWR

