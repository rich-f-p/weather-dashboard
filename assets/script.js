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
        insertIcon(weatherData);
        currentWeather(weatherData);
        fiveDayForecast(weatherData);
        //console.log(data.current.temp)
        //data.current.weather[0].icon
        //check notes for data 
        //iconNum = weatherData.current.weather[0].icon
        //iconEl = $('<img src="http://openweathermap.org/img/wn/' + iconNum + '@2x.png" width="50px" height="50px" alt="">')
    })
}
// display name and current date
var cityEl = $('#city');
var currentEl = $('<div id="today" class="container card">')
var nameEl = $('<h2>');
function currentDisplay(data,){
    currentEl = $('<div id="today" class="container card">')
    nameEl = $('<h2>')
    var today = moment().format('L');
    nameEl.text(data[0].name + ' ' + today + ' ');
    nameEl.appendTo(currentEl);

    currentEl.appendTo(cityEl);
}
// insert icon to current day car 
function insertIcon(weatherData){
    iconNum = weatherData.current.weather[0].icon
    iconEl = $('<img src="http://openweathermap.org/img/wn/' + iconNum + '@2x.png" width="50px" height="50px" alt="">')
    iconEl.appendTo(nameEl);
}
// display cards for five day forcast
function fiveDayForecast(weatherData){
    var fiveHeaderText = $('<h3>');
    fiveHeaderText.text('Five Day Forecast:');
    fiveHeaderText.appendTo(cityEl);
    var futureDisplay =$('<div id="future" class="container row">');
        futureDisplay.appendTo(cityEl);
    for(i=0;i<5;i++){
        var cardEl = $('<div id="day" class="d-flex container card col-2">');
        var date = $('<p>');
        const newDate = moment().add(i+1,'day').format('L');
        date.text(newDate);
        date.appendTo(cardEl);

        var icon = weatherData.daily[i].weather[0].icon;
        var dailyIcon = $('<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" width="50px" height="50px" alt="">');
        dailyIcon.appendTo(cardEl);

        var dailyWeather = $('<p>');
        var dailyTemp = 'temp: ' + weatherData.daily[i].temp.day;
        dailyWeather.text(dailyTemp);
        dailyWeather.appendTo(cardEl);

        var dailyHumidity = $('<p>');
        var humidity = 'humidity: ' + weatherData.daily[i].humidity + '%';
        dailyHumidity.text(humidity);
        dailyHumidity.appendTo(cardEl);


        cardEl.appendTo(futureDisplay);
        }
    }
// display the weather conditions of today
function currentWeather(weatherData){
    var temp = 'Temperature: ' + weatherData.current.temp + '℉';
    currTemp = $('<p>')
    currTemp.text(temp)
    currTemp.appendTo(currentEl);

    var hum = 'Humidity' + weatherData.current.humidity + '%';
    currHum = $('<p>')
    currHum.text(hum)
    currHum.appendTo(currentEl);
    
    var wind = 'Wind Speed: ' + weatherData.current.wind_speed + ' MPH';
    currWind = $('<p>')
    currWind.text(wind)
    currWind.appendTo(currentEl);
    
    var uvi = weatherData.current.uvi;
    var title = $('<p>')
    currUvi = $('<i>').text(uvi);
    if (uvi<2){
        currUvi.addClass('low');
    }else if (uvi>=2 && uvi<6){
        currUvi.addClass('moderate');
    }else if (uvi>=6 && uvi<8){
        currUvi.addClass('high');
    }else if (uvi>=8 && uvi<11){
        currUvi.addClass('veryHigh');
    }else {
        currUvi.addClass('extreme');
    }
    title.text('UV Index: ').append(currUvi)
    title.appendTo(currentEl);
}
$('#search').on('submit',search);
