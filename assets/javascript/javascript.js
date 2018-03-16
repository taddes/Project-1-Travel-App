$(document).ready(function() {
  $("#info").hide();
  $("#eventCity").hide();
  $("#events").hide();

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


  var tuGoApiKey = "xspyubpakcte72gaz2tw6qdd";
  var queryUrl1 = "https://api.tugo.com/v1/travelsafe/countries";

  var googleMapApi = "AIzaSyDqX1VGaQvp5vQLnVevNjdrNp_sgkZHIvo";
  var queryUrl2 =
    "https://www.google.com/maps/embed/v1/place?key=" +
    googleMapApi +
    "&q=" +
    place;


  //tuGo AJAX call to populate drop down country options
  $.ajax({
    url: queryUrl1,
    method: "GET",
    headers: {
      "X-Auth-API-Key": "xspyubpakcte72gaz2tw6qdd"
    }
  }).then(function(response) {
    console.log(response);

    var dropdown = document.getElementById("dropDownCountry");
    dropdown.length = 0;

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

  //Firebase population of country list
  travelDatabase
    .ref("countries")
    .once("value")
    .then(function(snapshot) {
      console.log(snapshot.val());
      var array = snapshot.val();
      var dropdown = document.getElementById("dropDownCountry");
      for (var i = 0; i < array.length; i++) {
        console.log(array[i].englishName);
        var option = document.createElement("option");
        option.setAttribute("class", "dropdown-item");
        option.text = array[i].englishName;
        option.value = array[i].id;
        dropdown.appendChild(option);
      }
    });

  //Grab the selected country
  $("#countrySubmit").on("click", function(event) {
    event.preventDefault();
    $("#info").show();
    $("#dropDownCountry").tooltip();

    var submitted = $("select#dropDownCountry option:checked").val();
    console.log(submitted);

    //second AJAX call to tuGO API to get country information
    //original api key OG: cc6xkamkpx9jq843fpzt244m Erik's: q6d4g47pkz632ukda7e29spg 
    $.ajax({
      url: queryUrl1 + "/" + submitted,
      method: "GET",
      headers: {
        "X-Auth-API-Key": "q6d4g47pkz632ukda7e29spg "
      }
    }).then(function(response) {
      console.log(response);

      var advisories = response.advisories;
      $(".country").html(
        "<div><h3>Country: " +
          response.name +
          "</h3><img src='http://www.countryflags.io/" +
          response.code +
          "/flat/64.png'></div>"
      );
      console.log(response.lawAndCulture.lawAndCultureInfo);

      $(".law").html("<div><h5>Law and Culture:</h5>");

      var textLawArray = [];

      for (i = 0; i < response.lawAndCulture.lawAndCultureInfo.length; i++) {
        textLawArray +=
          "<p>" +
          response.lawAndCulture.lawAndCultureInfo[i].category +
          ": " +
          response.lawAndCulture.lawAndCultureInfo[i].description +
          "</p>";
      }
      $(".lawData").html(textLawArray);
      $(".allLaw").accordion({
        collapsible: true,
        active: false
      });

      $(".travelAD").html(
        "</div><h5>Travel Advisories:</h5><p> " +
          response.advisories.description +
          "</p>"
      );
      $(".travelAD").accordion({
        collapsible: true,
        active: false
      });

      if (response.climate.description != null) {
        $(".climate").html(
          "<h5>Climate Conditions:</h5><p> " +
            response.climate.description +
            "</p>"
        );
      } else {
        $(".climate").html("<h5>Climate Conditions:</h5><p> None </p>");
      }
      $(".climate").accordion({
        collapsible: true,
        active: false
      });

      if (response.safety.description != null) {
        $(".safety").html(
          "<h5>Safety Considerations:</h5><p> " +
            response.climate.description +
            "</p>"
        );
      } else {
        $(".safety").html("<h5>Safety Considerations:</h5><p> None </p>");
      }
      $(".safety").accordion({
        collapsible: true,
        active: false
      });

      $(".entry").html("<h5>Entry and Exit:</h5><div>");

      var textSafetyArray = [];

      for (i = 0; i < response.safety.safetyInfo.length; i++) {
        textSafetyArray +=
          "<p>" + response.safety.safetyInfo[i].description + "</p>";
      }

      $(".entryData").html(textSafetyArray);
      $(".allEntry").accordion({
        collapsible: true,
        active: false
      });

      var latitude = parseInt(response.offices[0].latitude);
      console.log(latitude);

      var longitude = parseInt(response.offices[0].longitude);
      console.log(longitude);

      var uluru = { lat: latitude, lng: longitude };
      var map = new google.maps.Map(document.getElementById("mapContent"), {
        zoom: 5,
        center: uluru
      });
    });
  });
  //To capitalize City name
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  var recentCities = [];
  function renderButtons() {
    // Deleting the cities prior to adding new cities to prevent repeat buttons
    $("#buttons-view").empty();

    // Looping through the array of cities
    for (var i = 0; i < recentCities.length; i++) {
      // Dynamicaly generating buttons for each city in the array
      var a = $("<button>");
      // Adding a class of city-btn
      a.addClass("city-btn");
      // Adding a data-attribute so we can easily search for the desired city later
      if (recentCities[i] !== "") {
        a.attr("data-name", recentCities[i]);
        // Putting the city name on each of our buttons
        a.text(recentCities[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").prepend(a);
      }
    }
  }

  $("#citySubmit").on("click", function(event) {
    event.preventDefault();
    $("#eventCity").text("City Events: ");
    $("#eventCity").show();
    $("#events").show();

    //Prevents numbers from being input into city search
    var testString = document.getElementById("inputCity").value;
    var numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 0; i < testString.length; i++) {
      var testSubstring = testString.substring(i, i + 1);
      if (numberArray.indexOf(parseInt(testSubstring)) > -1) {
        $("#demo").text("Input Invalid, Please Enter a City");
        $("#inputCity").val("");
        return;
      } else {
        $("#demo").text("Valid Input");
      }
    }

    var city = $("#inputCity")
      .val()
      .trim();
    recentCities.push(city);
    renderButtons();

    $("#inputCity").val("");

    var openWeatherApiKey = "facab843d1108e8cef093e69a2ef4979";
    var queryUrl5 =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      openWeatherApiKey;

    //AJAX call to Open Weather API
    $.ajax({
      url: queryUrl5,
      method: "GET"
    }).then(function(openWeather) {
      $("#weatherHead").text(openWeather.name + " Weather Details");
      $(".temp").text("Current Temperature: " + openWeather.main.temp + "°F");
      $(".high").text("High: " + openWeather.main.temp_max + "°F");
      $(".low").text("Low: " + openWeather.main.temp_min + "°F");
      $(".weather").text("Weather Conditions: " + openWeather.weather[0].main);
      $(".desc").text("Weather Details: " + openWeather.weather[0].description);
      $(".humidity").text("Humidity: " + openWeather.main.humidity + "%");
      $(".wind").text("Wind Speed: " + openWeather.wind.speed + " m/s");

      var latitude = parseInt(openWeather.coord.lat);

      var longitude = parseInt(openWeather.coord.lon);

      var uluru = { lat: latitude, lng: longitude };
      var map = new google.maps.Map(document.getElementById("mapContent"), {
        zoom: 5,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });

      //EventBrite API call
      var eventBriteApiKey = "CE4R5PQ42MM4QQYFKNWR";
      var queryUrl4 =
        "https://www.eventbriteapi.com/v3/events/search/?q=" +
        city +
        "&token=" +
        eventBriteApiKey;
      $.ajax({
        url: queryUrl4,
        method: "GET"
      }).then(function(eventBrite) {
        var eventsB = eventBrite.events;
        var text = [];

        for (i = 0; i < 5; i++) {
          text +=
            "<div class='eventDisplay'><p>" +
            eventsB[i].name.text +
            "</p>" +
            "<p><a href=" +
            eventsB[i].url +
            " target='_blank'>" +
            eventsB[i].url +
            "</a></p></div>";
        }

        $("#events").prepend(text);
        $("#events").prepend(
          "<br><h3>" +
            city.capitalize() +
            ", " +
            openWeather.sys.country +
            "</h3></div>"
        );
        $(".eventDisplay").accordion({
          collapsible: true,
          active: false,
          heightStyle: "content"
        });
      });
    });
  });

  //Function for dynamically created city buttons
  $(document).on("click", ".city-btn", function() {
    var city = $(this).attr("data-name");

    var openWeatherApiKey = "facab843d1108e8cef093e69a2ef4979";
    var queryUrl5 =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      openWeatherApiKey;
    $.ajax({
      url: queryUrl5,
      method: "GET"
    }).then(function(openWeather) {
      $("#weatherHead").text(openWeather.name + " Weather Details");
      $(".temp").text("Current Temperature: " + openWeather.main.temp + "°F");
      $(".high").text("High: " + openWeather.main.temp_max + "°F");
      $(".low").text("Low: " + openWeather.main.temp_min + "°F");
      $(".weather").text("Weather Conditions: " + openWeather.weather[0].main);
      $(".desc").text("Weather Details: " + openWeather.weather[0].description);
      $(".humidity").text("Humidity: " + openWeather.main.humidity + "%");
      $(".wind").text("Wind Speed: " + openWeather.wind.speed + " m/s");

      var latitude = parseInt(openWeather.coord.lat);

      var longitude = parseInt(openWeather.coord.lon);

      var uluru = { lat: latitude, lng: longitude };
      var map = new google.maps.Map(document.getElementById("mapContent"), {
        zoom: 5,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    });
  });
});

function initMap() {
  var uluru = { lat: 0, lng: 0 };
  var map = new google.maps.Map(document.getElementById("mapContent"), {
    zoom: 1,
    center: uluru
  });
}


 //For Future Use: To implement other APIs
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
  //   var yelpApi = "https://api.yelp.com/v3/businesses/search?";
//   var yelpApiKey =
//     "ynSE3wseuGaVMJm3f99h--_l7F0DVqMHYKISzf_MVYUOPHZysqJWIAUHibKOaj9ZLk0bjM62VET-YvxRjLGgUMv6yjIIXGWudGNrp2m2AxL5vSOIqSM72B7jh0CpWnYx";

//   var hotwireApiKey = "?apikey=gt5guzfht53r3jyfzrf6najp";
//   var queryUrlHotwireHistAir = "http://api.hotwire.com/v1/tripstarter/air";

//   var googleFlyApi = "AIzaSyABcRXvnEe7i7jhMRMDJnlADv3ARCch9do";
//   var queryUrl3 =
//     "https://www.googleapis.com/qpxExpress/v1/trips/" +
//     place +
//     "?key=" +
//     googleFlyApi;
