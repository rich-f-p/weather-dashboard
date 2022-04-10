//http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
//forecast = https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const apikey = '8d31aa5ffe43cc6e2b64eb3cb37e4641';
//long&lat = http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
const todayEl = $('#today');
const futureEl = $('#future');
var inputEl = $('#userInput');
var gpsLink = '';
function search(event){
    event.preventDefault();
    locationUrl(inputEl.val());
    gpsApi(gpsLink);
}
//generate url to longitude and latitude date
function locationUrl(city){
    var longLat = 'http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid='+apikey;
    gpsLink = longLat;
}
//fetch geolocation data
var lat = '';
var lon = '';
function gpsApi(link) {
    fetch(link)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        // console.log(data);
        lat = data[0].lat;
        lon = data[0].lon;
        data[0].name
        data[0].state
        data[0].country
        console.log(data)
        weatherUrl(lon,lat);
        weatherApi(weatherLink);
        currentDisplay(data);

    })
}
//generate link for weather forcast
var weatherLink = '';
function weatherUrl(lon,lat){
    weatherLink = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&exclude=minutely,hourly&appid='+apikey;
    console.log(weatherLink);
}
//fetch weather forecast data
var iconNum = '';
var iconEl;
function weatherApi(link){
    fetch(link)
    .then(function(response){
        return response.json();
    }).then(function(weatherData){
        console.log(weatherData);
        //console.log(data.current.temp)
        //data.current.weather[0].icon
        //check notes for data 
        //iconNum = weatherData.current.weather[0].icon
        //iconEl = $('<img src="http://openweathermap.org/img/wn/' + iconNum + '@2x.png" width="50px" height="50px" alt="">')
    })
}
// display name and current date
var cityEl = $('#city');
function currentDisplay(data,){
    var currentEl = $('<div id="today" class="container card">')
    var nameEl = $('<h2>')
    var date = moment().format('L');
    nameEl.text(data[0].name + ' ' + date + ' ');
    nameEl.appendTo(currentEl);

    currentEl.appendTo(cityEl);
}
console.log(moment().format('L'))
$('#search').on('submit',search);
