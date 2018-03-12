


var tuGoApiKey = ;
var queryUrl = "https://api.tugo.com/v1/travelsafe/countries/:country;

$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function (response) {
    console.log(response);
})