// https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=9a238e861db9760ef96c88c9e9a32044
// https://api.openweathermap.org/data/2.5/weather?q=columbus&appid=524901&appid=9a238e861db9760ef96c88c9e9a32044

// 7d3989331b228c9223971532186a46b2
// 9a238e861db9760ef96c88c9e9a32044 - jcorozco81

// OneCall API address: 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly,alerts&appid=9a238e861db9760ef96c88c9e9a32044'
// Current by City ID: 'https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=9a238e861db9760ef96c88c9e9a32044'
// Geocoding: 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=9a238e861db9760ef96c88c9e9a32044' - City Name and Lat and Long


// Check and render Saved Locations
var targerID = 99;
var cityData;
var tosave=[];
renderLocations();

function renderLocations(){
var savedLocations = JSON.parse(localStorage.getItem("saved-locations"));
    if (savedLocations !== null)
    {
        tosave = savedLocations;
        for(i=0; i < 5; i++){
            $("#saved-"+i).text(tosave[i]);
        }
        // console.log(tosave);
    }
}

//Search Button Fuction
var searchButton=$("#search-location");   
var locationText;    
searchButton.on('click', function (event) {
    event.preventDefault();
    locationText=$('.input').val(); 
    console.log("location" + locationText);
    if(locationText ===" " || locationText ==="" || locationText ===null){   //add conditions
        $("#alert-empty").text("No City entered");
    }
    else{

        console.log(locationText);
        tosave.splice(4, 1);
        tosave.splice(0, 0, locationText);
        localStorage.setItem("saved-locations", JSON.stringify(tosave));
        renderLocations();
        $('.input').val("");
        $("#alert-empty").text("");
      processLocation(locationText);

        
    }
})





  // var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=9a238e861db9760ef96c88c9e9a32044'; //Get Lat and Log
  var requestUrl2;
  var requestUrl3;

  function processLocation(cityText){
requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+cityText+'&limit=5&appid=9a238e861db9760ef96c88c9e9a32044';
console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        cityData=data;
      if(data.length>0){
            console.log("Multiple Locations" + data.length);
            $('.modal').addClass('is-active');
            selectionList(data);
      }
      });
      }



function getWeather(latRec, lonRec){
console.log(latRec);
console.log(lonRec);
requestUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latRec+'&lon='+lonRec+'&units=imperial&exclude=minutely,hourly,alerts&appid=9a238e861db9760ef96c88c9e9a32044'; //use Lat and Long
console.log(requestUrl2);
fetch(requestUrl2)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //   console.log(data);
      console.log("Current Date:" + data.current.dt);
      var currentDate=dateConvert(data.current.dt);
      $("#current-date").text(currentDate);
      console.log("Current Temp:" + data.current.temp+" °F");
      $("#current-temp").text(data.current.temp+" °F");
      console.log("Current Humidity:" + data.current.humidity+" %");
      $("#current-humidity").text(data.current.humidity+" %");
      console.log("Current Wind Speed:" + data.current.wind_speed+" mph");
      $("#current-windspeed").text(data.current.wind_speed+" mph");
      console.log("Current UV Index:" + data.current.uvi);
 
      $('#current-uvi').removeClass();
      // var uvIndextxt;
      if(data.current.uvi<3){
        $('#current-uvi').addClass('tag is-success');
      }
      else if(data.current.uvi<8 && data.current.uvi>=3){
        $('#current-uvi').addClass('tag is-warning');
      }
      else if(data.current.uvi>=8){
        $('#current-uvi').addClass('tag is-danger');
      }
      $("#current-uvi").text(data.current.uvi)

for (var i=1; i<6; i++){
    var futureDate=dateConvert(data.daily[i].dt);
    console.log(data.daily[i].dt);
    $("#date-"+i).text(futureDate);
    console.log(data.daily[i].temp.day);
    $("#date-"+i+"-temp").text(data.daily[i].temp.day+" °F");
    console.log(data.daily[i].wind_speed);
    $("#date-"+i+"-humidity").text(data.daily[i].humidity+" %");
    console.log(data.daily[i].humidity);
    $("#date-"+i+"-windspeed").text(data.daily[i].wind_speed+"  mph");
}
});
}



function getCityID(){
requestUrl3 = 'https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=9a238e861db9760ef96c88c9e9a32044';
fetch(requestUrl3)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
      console.log(data);

});

}

//From: https://www.geeksforgeeks.org/how-to-convert-date-to-another-timezone-in-javascript/
function dateConvert(dateRaw){
    var newdate = new Date(dateRaw*1000).toDateString();
    var usTime = newdate.toLocaleString("en-US", {timeZone: "America/New_York"});
    return usTime;
}






function selectionList(data){
  for(var i=0; i<data.length; i++){
    //  $("#city"+[i]).text(data[i].name+", "+data[i].country+", ");
     if (typeof data[i].state == 'string')
     {
      $("#city-"+[i]).text(data[i].name+" - "+data[i].state+", "+data[i].country);
      // $("#state"+[i]).text(data[i].state);
     }
    else{
      $("#city-"+[i]).text(data[i].name+" - "+data[i].country);
        }
   }


  



}

// Modal Button

var modalDelete=$(".delete");   
modalDelete.on('click', function (event) {
  event.preventDefault();
  removeModal();
})

function removeModal(){
  cleanModal();
  $('.modal').removeClass('is-active');

}

function cleanModal(){
  for(var i=0; i<5; i++){
      $("#city-"+[i]).text("");
}}



// var modalCancel=$("#cancel-button");   
// modalCancel.on('click', function (event) {
//   event.preventDefault();
//   $('.modal').removeClass('is-active');

// })



function sendCoordinates(){
    var latReq;
    var lonReq;
    console.log(targerID);
    console.log("current data:"+cityData);
    latReq = cityData[targerID].lat.toString();
    lonReq = cityData[targerID].lon.toString();
    console.log(latReq);
    console.log(lonReq);
    getWeather(latReq, lonReq);
    getCityID(latReq, lonReq);
}
    var selectedCity;
    var modalTarget=$(".selection");   
    modalTarget.on('click', function (event) {
      event.preventDefault();
      var targetClicked = event.target;
      targerID=targetClicked.id;
      selectedCity = event.target.innerText;
      console.log("Target Clicked: " + selectedCity);
      $('#current-city').text(selectedCity);
      targerID=targerID.charAt(5);
      targerID=parseInt(targerID);
      console.log(targerID);
      removeModal();
      sendCoordinates();
      cleanModal();
     })


