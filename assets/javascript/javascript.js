

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


var tuGoApiKey = "";
var queryUrl = "https://api.tugo.com/v1/travelsafe/countries/:country"

$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function (response) {
    console.log(response);
})


//https://www.eventbriteapi.com/v3/events/search/?q=newyork&token=CE4R5PQ42MM4QQYFKNWR

var eventBriteApiKey ="CE4R5PQ42MM4QQYFKNWR"
var queryUrl1 = "www.eventbriteapi.com/v3/events/search/?q=" + location + "&token=" + eventBriteApiKey
