

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


var location;

var tuGoApiKey = "";
var queryUrl1 = "https://api.tugo.com/v1/travelsafe/countries/:country"

var googleMapApi = "AIzaSyDqX1VGaQvp5vQLnVevNjdrNp_sgkZHIvo";
var queryUrl2 = "https://www.google.com/maps/embed/v1/place?key=" + googleMapApi + "&q=" + location;

var googleFlyApi = "AIzaSyABcRXvnEe7i7jhMRMDJnlADv3ARCch9do";
var queryUrl3 = "https://www.googleapis.com/qpxExpress/v1/trips/" + location + "?key=" + googleFlyApi;

var eventBriteApiKey ="CE4R5PQ42MM4QQYFKNWR"
var queryUrl4 = "www.eventbriteapi.com/v3/events/search/?q=" + location + "&token=" + eventBriteApiKey

var openWeatherApiKey = "facab843d1108e8cef093e69a2ef4979";
var queryUrl5 = "http://samples.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + openWeatherApiKey;

//Wikipedia
queryUrl6 = "https://en.wikipedia.org/w/api.php?action=query&titles=Frog&prop=" + location + "&format=json&formatversion=2";

$.ajax({
    url: queryUrl1,
    method: "GET"
}).then(function (response1) {
    console.log(response1);
})

$.ajax({
    url: queryUrl2,
    method: "GET"
}).then(function (response2) {
    console.log(response2);
})

$.ajax({
    url: queryUrl3,
    method: "GET"
}).then(function (response3) {
    console.log(response3);
})

$.ajax({
    url: queryUrl4,
    method: "GET"
}).then(function (response4) {
    console.log(response4);
})

$.ajax({
    url: queryUrl5,
    method: "GET"
}).then(function (response5) {
    console.log(response5);
})

$.ajax({
    url: queryUrl6,
    method: "GET"
}).then(function (response6) {
    console.log(response6);
})


//https://www.eventbriteapi.com/v3/events/search/?q=newyork&token=CE4R5PQ42MM4QQYFKNWR

