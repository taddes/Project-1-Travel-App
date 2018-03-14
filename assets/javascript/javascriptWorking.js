$(document).ready(function () {

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
    $('.dropdpwnCountry').on('click', function (event) {
        event.preventDefault();
        // vars for all stored data
        var storedData = {


        };
        database.ref().push(storedData);

    });


    var place;


    var tuGoApiKey = "xspyubpakcte72gaz2tw6qdd";
    var queryUrl1 = "https://api.tugo.com/v1/travelsafe/countries";
    

    var googleMapApi = "AIzaSyDqX1VGaQvp5vQLnVevNjdrNp_sgkZHIvo";
    var queryUrl2 = "https://www.google.com/maps/embed/v1/place?key=" + googleMapApi + "&q=" + place;


    var googleFlyApi = "AIzaSyABcRXvnEe7i7jhMRMDJnlADv3ARCch9do";
    var queryUrl3 = "https://www.googleapis.com/qpxExpress/v1/trips/" + place + "?key=" + googleFlyApi;

    var eventBriteApiKey = "CE4R5PQ42MM4QQYFKNWR"
    var queryUrl4 = "https://www.eventbriteapi.com/v3/events/search/?q=" + place + "&token=" + eventBriteApiKey

    var openWeatherApiKey = "facab843d1108e8cef093e69a2ef4979";
    var queryUrl5 = "http://samples.openweathermap.org/data/2.5/forecast?q=" + place + "&appid=" + openWeatherApiKey;

    //Wikipedia
    var queryUrl6 = "https://en.wikipedia.org/w/api.php?action=query&titles=" + place + "&prop=images&format=json&formatversion=2";


    //Google Map
    $.ajax({
        url: queryUrl2,
        method: "GET"
    }).then(function (googleMaps) {
        console.log(googleMaps);
    })

    //tuGo AJAX call to populate drop down country options
    $.ajax({
        url: queryUrl1,
        method: "GET",
        headers: {
            "X-Auth-API-Key": "xspyubpakcte72gaz2tw6qdd"
        }
    }).then(function (response) {
        console.log(response);

        var dropdown = document.getElementById("dropDownCountry");
        dropdown.length = 0

        let defaultOption = document.createElement("option");
        defaultOption.text = "Choose Country";

        dropdown.appendChild(defaultOption);
        dropdown.selectedIndex = 0;

        for (var i = 0; i < response.length; i++) {
            var option = document.createElement("option");
            option.setAttribute("class", "dropdown-item");
            option.text = response[i].englishName;
            option.value = response[i].id;
            dropdown.appendChild(option);
        }

 

    });

    //Grab the selected country
    $("#countrySubmit").on("click", function(event) {
        event.preventDefault();

        var submitted = $("select#dropDownCountry option:checked").val();
        console.log(submitted);

 //second AJAX call to tuGO API

 $.ajax({
    url: queryUrl1 + "/" + submitted,
    method: "GET",
    headers: {
        "X-Auth-API-Key": "xspyubpakcte72gaz2tw6qdd"
    }
    }).then(function (response) {
        console.log(response);
    });
    








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
        console.log(openWeather);
    })

    //Wikipedia
    $.ajax({
        url: queryUrl6,
        method: "GET"
    }).then(function (wikipedia) {
        console.log(wikipedia);
    })






    //https://www.eventbriteapi.com/v3/events/search/?q=newyork&token=CE4R5PQ42MM4QQYFKNWR


});