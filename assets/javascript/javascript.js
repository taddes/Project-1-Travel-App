

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


var tuGoApiKey = ;
var queryUrl = "https://api.tugo.com/v1/travelsafe/countries/:country;

$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function (response) {
    console.log(response);
})

