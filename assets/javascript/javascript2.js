

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



var tuGoApiKey = "xspyubpakcte72gaz2tw6qdd";
var queryUrl1 = "https://api.tugo.com/v1/travelsafe/countries/:country";
var googleMapApi = "AIzaSyDqX1VGaQvp5vQLnVevNjdrNp_sgkZHIvo";
// var location = ;
var queryUrl2 = "https://www.google.com/maps/embed/v1/place?key=" + googleMapApi + "&q=" + location;
var googleFlyApi = "AIzaSyABcRXvnEe7i7jhMRMDJnlADv3ARCch9do";
var queryUrl3 = "https://www.googleapis.com/qpxExpress/v1/trips/" + location + "?key=" + googleFlyApi;


   //tuGo AJAX call
   $.ajax({
    url: queryUrl1,
    method: "GET",
    headers: {
        "X-Auth-API-Key": "xspyubpakcte72gaz2tw6qdd"
    }
}).then(function (response) {
    console.log(response);

    var dropdown = document.getElementById("dropdownCountry");
    dropdown.length = 0

    let defaultOption = document.createElement("option");
    defaultOption.text = "Choose Country";

    dropdown.appendChild(defaultOption);
    dropdown.selectedIndex = 0;

    for (var i = 0; i < response.length; i++) {
        var option = document.createElement("a");
        option.setAttribute("class", "dropdown-item");
        option.text = response[i].englishName;
        option.value = response[i].id;
        dropdown.appendChild(option);
    }



});


// <select id="locality-dropdown" name="locality"> 
//   <option value="id">"englishName"</option>
// </select>
//

// <select name="countryChosen"> 
//   <option value="id">"englishName"</option>
// </select>
//

//https://www.eventbriteapi.com/v3/events/search/?q=newyork&token=CE4R5PQ42MM4QQYFKNWR

var eventBriteApiKey ="CE4R5PQ42MM4QQYFKNWR";
var queryUrl2 = "www.eventbriteapi.com/v3/events/search/?q=" + location + "&token=" + eventBriteApiKey;
