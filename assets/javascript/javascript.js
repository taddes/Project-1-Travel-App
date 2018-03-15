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

    

    var place;

    var yelpApi = "https://api.yelp.com/v3/businesses/search?"
    var yelpApiKey = "ynSE3wseuGaVMJm3f99h--_l7F0DVqMHYKISzf_MVYUOPHZysqJWIAUHibKOaj9ZLk0bjM62VET-YvxRjLGgUMv6yjIIXGWudGNrp2m2AxL5vSOIqSM72B7jh0CpWnYx"

    var hotwireApiKey = "?apikey=gt5guzfht53r3jyfzrf6najp";
    var queryUrlHotwireHistAir = "http://api.hotwire.com/v1/tripstarter/air"

    var tuGoApiKey = "xspyubpakcte72gaz2tw6qdd";
    var queryUrl1 = "https://api.tugo.com/v1/travelsafe/countries";


    var googleMapApi = "AIzaSyDqX1VGaQvp5vQLnVevNjdrNp_sgkZHIvo";
    var queryUrl2 = "https://www.google.com/maps/embed/v1/place?key=" + googleMapApi + "&q=" + place;


    var googleFlyApi = "AIzaSyABcRXvnEe7i7jhMRMDJnlADv3ARCch9do";
    var queryUrl3 = "https://www.googleapis.com/qpxExpress/v1/trips/" + place + "?key=" + googleFlyApi;

    /* var eventBriteApiKey = "CE4R5PQ42MM4QQYFKNWR"
    var queryUrl4 = "https://www.eventbriteapi.com/v3/events/search/?q=" + place + "&token=" + eventBriteApiKey */

    var openWeatherApiKey = "facab843d1108e8cef093e69a2ef4979";
    var queryUrl5 = "http://samples.openweathermap.org/data/2.5/forecast?q=" + place + "&appid=" + openWeatherApiKey;

    //Wikipedia
    var queryUrl6 = "https://en.wikipedia.org/w/api.php?action=query&titles=" + place + "&prop=images&format=json&formatversion=2";




    //https://api.yelp.com/v3/autocomplete?
    // $.ajax({
    //     url: yelpApi + "&location=New York",
    //     method: "GET",
    //     headers: {
    //         Authorization: "Bearer " + yelpApiKey
    //     }

    // }).then(function(response) {
    //     console.log(response);
    // })

    // $.ajax({
    //     url: "http://api.hotwire.com/v1/tripstarter/air" + hotwireApiKey + "&origin=JFK&dest=SFO",
    //     // "&startdate=03/20/2018&enddate=03/30/2018&origin=SFO&dest=LGA&distance=300", 
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    // })

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

    travelDatabase.ref('countries').once('value').then(function(snapshot) {
        console.log(snapshot.val());
        var array = snapshot.val()
        var dropdown = document.getElementById("dropDownCountry")
        for (var i = 0; i < array.length; i++) {
            console.log(array[i].englishName)
            var option = document.createElement("option");
            option.setAttribute("class", "dropdown-item");
             option.text = array[i].englishName;
             option.value = array[i].id;
             dropdown.appendChild(option);
        }
    }); 



    //Grab the selected country
    $("#countrySubmit").on("click", function (event) {
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

            var advisories = response.advisories;
            $(".country").html("<div><h3>Country: " + response.name + "</h3></div>");
            console.log(response.lawAndCulture.lawAndCultureInfo);

            // for (i = 0; i < response.lawAndCulture.lawAndCultureInfo.length; i++) {
            //     $(".law").html("<h5>Law and Culture:</h5><p> " + response.lawAndCulture.lawAndCultureInfo[i].description + "</p>");
            // }

           
            $(".law").html("<div><h5>Law and Culture:</h5></div>");

            var textLawArray = [];

            for (i = 0; i < response.lawAndCulture.lawAndCultureInfo.length; i++) {
                textLawArray += "<div><p>" + response.lawAndCulture.lawAndCultureInfo[i].category + ": " + response.lawAndCulture.lawAndCultureInfo[i].description + "</p></div>";
            }
            $(".lawData").html("<div>" + textLawArray + "</div>");

           
            $(".travelAD").html("<h5>Travel Advisories:</h5><p> " + response.advisories.description + "</p>");


            if (response.climate.description != null) {
                $(".climate").html("<h5>Climate Conditions:</h5><p> " + response.climate.description + "</p>");
            } else {
                $(".climate").html("<h5>Climate Conditions:</h5><p> None </p>");
            }
            
            if (response.safety.description != null) {
                $(".safety").html("<h5>Safety Considerations:</h5><p> " + response.climate.description + "</p>");
            } else {
                $(".safety").html("<h5>Safety Considerations:</h5><p> None </p>");
            }


            $(".entry").html("<h5>Entry and Exit:</h5>")
            var textSafetyArray = [];

            for (i = 0; i < response.safety.safetyInfo.length; i++) {
                textSafetyArray +=  "<p>" + response.safety.safetyInfo[i].description + "</p>";
            }

            $(".entryData").html(textSafetyArray);


            var latitude = parseInt(response.offices[0].latitude);
            console.log(latitude);

            var longitude = parseInt(response.offices[0].longitude);
            console.log(longitude);


            var uluru = { lat: latitude, lng: longitude };
            var map = new google.maps.Map(document.getElementById('mapContent'), {
                zoom: 5,
                center: uluru
            });
            /* var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });*/



            /* var openWeatherApiKey = "facab843d1108e8cef093e69a2ef4979";
            var queryUrl5 = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + openWeatherApiKey;
            $.ajax({
                url: queryUrl5,
                method: "GET"
            }).then(function (openWeather) {
                $(".temp").text("Current Temperature: " + openWeather.main.temp + "°F");
                $(".high").text("High: " + openWeather.main.temp_max + "°F");
                $(".low").text("Low: " + openWeather.main.temp_min + "°F");
                $(".weather").text("Weather Conditions: " + openWeather.weather[0].main);
                $(".desc").text("Weather Details: " + openWeather.weather[0].description);
                $(".humidity").text("Humidity: " + openWeather.main.humidity + "%");
                $(".wind").text("Wind Speed: " + openWeather.wind.speed + " m/s"); */
        })

    });



    $("#citySubmit").on("click", function (event) {
        event.preventDefault();

        var city = $("#inputCity").val().trim();

        var openWeatherApiKey = "facab843d1108e8cef093e69a2ef4979";
        var queryUrl5 = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + openWeatherApiKey;
        $.ajax({
            url: queryUrl5,
            method: "GET"
        }).then(function (openWeather) {
            $("#weatherHead").text(openWeather.name + " Weather Details");
            $(".temp").text("Current Temperature: " + openWeather.main.temp + "°F");
            $(".high").text("High: " + openWeather.main.temp_max + "°F");
            $(".low").text("Low: " + openWeather.main.temp_min + "°F");
            $(".weather").text("Weather Conditions: " + openWeather.weather[0].main);
            $(".desc").text("Weather Details: " + openWeather.weather[0].description);
            $(".humidity").text("Humidity: " + openWeather.main.humidity + "%");
            $(".wind").text("Wind Speed: " + openWeather.wind.speed + " m/s");

            var latitude = parseInt(openWeather.coord.lat);
            console.log(latitude);

            var longitude = parseInt(openWeather.coord.lon);
            console.log(longitude);


            var uluru = { lat: latitude, lng: longitude };
            var map = new google.maps.Map(document.getElementById('mapContent'), {
                zoom: 5,
                center: uluru
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
            //EventBrite
            var eventBriteApiKey = "CE4R5PQ42MM4QQYFKNWR"
            var queryUrl4 = "https://www.eventbriteapi.com/v3/events/search/?q=" + city + "&token=" + eventBriteApiKey
            $.ajax({
                url: queryUrl4,
                method: "GET"
            }).then(function (eventBrite) {
                var eventsB = eventBrite.events;
                var text = [];
                for(i=0; i<5; i++){
                    text += "<h2>Events: </h2><a href="+eventsB[i].url+">"+eventsB[i].url+"</a><br>"
                }
                $("#events").append(text);
                console.log(eventBrite);
            })
        })
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
    /* $.ajax({
        url: queryUrl5,
        method: "GET"
    }).then(function (openWeather) {
        console.log(openWeather);
    }) */

    //Wikipedia
    $.ajax({
        url: queryUrl6,
        method: "GET"
    }).then(function (wikipedia) {
        console.log(wikipedia);
    })


    //https://www.eventbriteapi.com/v3/events/search/?q=newyork&token=CE4R5PQ42MM4QQYFKNWR


});
function initMap() {
    var uluru = { lat: 0, lng: 0 };
    var map = new google.maps.Map(document.getElementById('mapContent'), {
        zoom: 1,
        center: uluru

    });
    /* var marker = new google.maps.Marker({
         position: uluru,
         map: map
     });*/
}

