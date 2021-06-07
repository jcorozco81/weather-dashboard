// https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=9a238e861db9760ef96c88c9e9a32044
// https://api.openweathermap.org/data/2.5/weather?q=columbus&appid=524901&appid=9a238e861db9760ef96c88c9e9a32044

// 7d3989331b228c9223971532186a46b2
// 9a238e861db9760ef96c88c9e9a32044 - jcorozco81

// OneCall API address: 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly,alerts&appid=9a238e861db9760ef96c88c9e9a32044'
// Current by City ID: 'https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=9a238e861db9760ef96c88c9e9a32044'
// Geocoding: 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=9a238e861db9760ef96c88c9e9a32044' - City Name and Lat and Long


// Check and render Saved Locations
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
        alert("No City entered");
    }
    else{

        console.log(locationText);
        tosave.splice(4, 1);
        tosave.splice(0, 0, locationText);
        localStorage.setItem("saved-locations", JSON.stringify(tosave));
        renderLocations();
        $('.input').val("");
    }
})





  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=9a238e861db9760ef96c88c9e9a32044'; //Get Lat and Log
  var requestUrl2;
  var requestUrl3;
  var latReq;
  var lonReq;

  // function getApi() {

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        latReq = data[0].lat.toString();
        lonReq = data[0].lon.toString();
      console.log(latReq);
      console.log(lonReq);
      getWeather(latReq, lonReq);
      getCityID(latReq, lonReq);


      //Loop over the data to generate a table, each table row will have a link to the repo url
    //   for (var i = 0; i < data.length; i++) {
    //     // Creating elements, tablerow, tabledata, and anchor
    //     var createTableRow = document.createElement('tr');
    //     var tableData = document.createElement('td');
    //     var link = document.createElement('a');

    //     // Setting the text of link and the href of the link
    //     link.textContent = data[i].html_url;
    //     link.href = data[i].html_url;

    //     // Appending the link to the tabledata and then appending the tabledata to the tablerow
    //     // The tablerow then gets appended to the tablebody
    //     tableData.appendChild(link);
    //     createTableRow.appendChild(tableData);
    //     tableBody.appendChild(createTableRow);
    //   }
    });
// }

// fetchButton.addEventListener('click', getApi);




function getWeather(latRec, lonRec){
console.log(latRec);
console.log(lonRec);
requestUrl2 = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latReq+'&lon='+lonReq+'&units=imperial&exclude=minutely,hourly,alerts&appid=9a238e861db9760ef96c88c9e9a32044'; //use Lat and Long
console.log(requestUrl2);
fetch(requestUrl2)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    //   console.log(data);
      console.log("Current Date:" + data.current.dt);
      $("#current-date").text(data.current.dt);
      console.log("Current Temp:" + data.current.temp+" °F");
      $("#current-temp").text(data.current.temp+" °F");
      console.log("Current Humidity:" + data.current.humidity+" %");
      $("#current-humidity").text(data.current.humidity+" %");
      console.log("Current Wind Speed:" + data.current.wind_speed+" mph");
      $("#current-windspeed").text(data.current.wind_speed+" mph");
      console.log("Current UV Index:" + data.current.uvi);
      $("#current-uvi").text(data.current.uvi)
for (var i=0; i<5; i++){
    console.log(data.daily[i].dt);
    $("#date-"+i).text(data.current.dt);
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