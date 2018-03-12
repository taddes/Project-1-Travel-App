

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



var tuGoApiKey 
var queryUrl1 = "https://api.tugo.com/v1/travelsafe/countries/:country"
var googleMapApi = "AIzaSyDqX1VGaQvp5vQLnVevNjdrNp_sgkZHIvo";
var location;
var queryUrl2 = "https://www.google.com/maps/embed/v1/place?key=" + googleMapApi + "&q=" + location;
var googleFlyApi = "AIzaSyABcRXvnEe7i7jhMRMDJnlADv3ARCch9do";
var queryUrl3 = "https://www.googleapis.com/qpxExpress/v1/trips/" + location + "?key=" + googleFlyApi;


$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function (response) {
    console.log(response);
})


//https://www.eventbriteapi.com/v3/events/search/?q=newyork&token=CE4R5PQ42MM4QQYFKNWR

var eventBriteApiKey ="CE4R5PQ42MM4QQYFKNWR"
var queryUrl2 = "www.eventbriteapi.com/v3/events/search/?q=" + location + "&token=" + eventBriteApiKey
