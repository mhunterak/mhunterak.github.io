function CelsiusToFahrenheit(temp) {
	temp = parseInt(temp)
	temp *= 1.8
	temp += 32 
	return Math.round(temp).toString();
} 

var bg_switch = {
	"c": "lightblue",
	"sn": "#aad4e5",
	"sl": "#aad4e5",
	"h": "#aad4e5",
	"t": "darkgrey",
	"hr": "grey",
	"lr": "lightgrey",
	"s": "blue",
	"hc": "grey",
	"lc": "lightgrey",
}

function roundToTwoDecimalPlaces(number) {
	return Math.floor(number*100)/100;
}


function getLocation() {
	if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

var xhr0 = new XMLHttpRequest();
var xhr1 = new XMLHttpRequest();

xhr0.onload = function() {
	resp = JSON.parse(xhr0.response);
	let fullWeatherStateName= resp["consolidated_weather"][1]["weather_state_name"];
	document.getElementById("currentWeather").textContent = fullWeatherStateName;


	let date = new Date(resp["consolidated_weather"][1]["applicable_date"])
	let dateArray = date.toDateString().split(" ");
	let dateStr = dateArray[0]+" "+dateArray[1]+" "+dateArray[2];
	document.getElementById("today").textContent = dateStr;

	let weatherStateAbbr = resp["consolidated_weather"][1]["weather_state_abbr"];
	document.getElementsByTagName("body")[0].style.backgroundColor = bg_switch[weatherStateAbbr];
	document.getElementById("body").style.backgroundImage = "url(http://www.metaweather.com/static/img/weather/"+weatherStateAbbr+".svg)";
	document.getElementById("body").style.backgroundColor = bg_switch[weatherStateAbbr];




	document.getElementById("highTemp").textContent = CelsiusToFahrenheit(resp["consolidated_weather"][0]["max_temp"]);
	document.getElementById("lowTemp").textContent = CelsiusToFahrenheit(resp["consolidated_weather"][0]["min_temp"]);
	for (let i=1;i<resp["consolidated_weather"].length;i++) {
		let date = new Date(resp["consolidated_weather"][i]["applicable_date"])
		let dateArray = date.toDateString().split(" ");
		let dateStr = dateArray[1]+" "+dateArray[2];
		document.getElementById("date"+i).textContent = dateStr;
		document.getElementById("condition"+i).textContent = resp["consolidated_weather"][i]["weather_state_name"];
		weatherStateName = resp["consolidated_weather"][i]["weather_state_abbr"];
		document.getElementById("img"+i).src = "http://www.metaweather.com/static/img/weather/"+weatherStateName+".svg";
		document.getElementById("img"+i).style.borderColor = bg_switch[weatherStateName];
		document.getElementById("img"+i).style.width = "80%";
		document.getElementById("high"+i).textContent = CelsiusToFahrenheit(resp["consolidated_weather"][i]["max_temp"]);
		document.getElementById("low"+i).textContent = CelsiusToFahrenheit(resp["consolidated_weather"][i]["min_temp"]);
}
};

xhr1.onload = function() {
	resp = JSON.parse(xhr1.response);
	try {
		xhr0.open('GET', "https://cors.io/?https://www.metaweather.com/api/location/"+resp[0]["woeid"]+"/");
		xhr0.send();
		document.getElementById("locationTitle").textContent = resp[0]["title"];
		document.getElementById("locationTitle").style.backgroundColor = 'white';
		document.getElementById("locationTitle").style.color = 'red';
	} catch(err) {
		alert("No search result found, try a new city");
	}

}

function showPosition(position) {
	navigator.permissions.query({
		     name: 'geolocation'
		 }).then(function(result) {
		     if (result.state == 'granted') {
				xhr1.open('GET', "https://cors.io/?https://www.metaweather.com/api/location/search/?lattlong=" + roundToTwoDecimalPlaces(position.coords.latitude) + "," + roundToTwoDecimalPlaces(position.coords.longitude));
				xhr1.send();

		     } else if (result.state == 'prompt') {
				xhr1.open('GET', "https://cors.io/?https://www.metaweather.com/api/location/search/?lattlong=" + roundToTwoDecimalPlaces(position.coords.latitude) + "," + roundToTwoDecimalPlaces(position.coords.longitude));
				xhr1.send();

		     } else if (result.state == 'denied') {
		        alert("location permissions are disabled on insecure platforms, please enter a location by name at the bottom of this page.");
				xhr1.open('GET', "https://cors.io/?https://www.metaweather.com/api/location/search/?query=" + 'Portland');
				xhr1.send();

		     }
		     result.onchange = function() {
		         alert(result.state);
		     }
		 });
}

document.getElementById("newCityForm").addEventListener("submit", function(e) {
    e.preventDefault();
	query = document.getElementById("newCity").value;
	xhr1.open('GET', "https://cors.io/?https://www.metaweather.com/api/location/search/?query=" + query);
	xhr1.send();

});
/*

{
  "consolidated_weather": [
    {
      "id": 5803825961107456,
      "weather_state_name": "Showers",
      "weather_state_abbr": "s",
      "wind_direction_compass": "W",
      "created": "2018-08-27T00:26:44.220430Z",
      "applicable_date": "2018-08-26",
      "min_temp": 14.033333333333333,
      "max_temp": 19.756666666666664,
      "the_temp": 19.740000000000002,
      "wind_speed": 2.7357002584108803,
      "wind_direction": 271.76370945877824,
      "air_pressure": 1007.415,
      "humidity": 70,
      "visibility": 12.425870416766086,
      "predictability": 73
    },
    {
      "id": 5055453008494592,
      "weather_state_name": "Heavy Cloud",
      "weather_state_abbr": "hc",
      "wind_direction_compass": "N",
      "created": "2018-08-27T00:26:48.116820Z",
      "applicable_date": "2018-08-27",
      "min_temp": 13.090000000000002,
      "max_temp": 24.313333333333333,
      "the_temp": 22.755000000000003,
      "wind_speed": 2.8303807983058937,
      "wind_direction": 351.85044418952253,
      "air_pressure": 1008.145,
      "humidity": 66,
      "visibility": 16.13297094965402,
      "predictability": 71
    },
    {
      "id": 6143775952863232,
      "weather_state_name": "Light Cloud",
      "weather_state_abbr": "lc",
      "wind_direction_compass": "NNE",
      "created": "2018-08-27T00:26:50.113590Z",
      "applicable_date": "2018-08-28",
      "min_temp": 12.193333333333333,
      "max_temp": 29.19333333333333,
      "the_temp": 28.09,
      "wind_speed": 3.4863004520029697,
      "wind_direction": 27.928850698557625,
      "air_pressure": 1004.99,
      "humidity": 41,
      "visibility": 16.843508907977412,
      "predictability": 70
    },
    {
      "id": 5345301963472896,
      "weather_state_name": "Heavy Cloud",
      "weather_state_abbr": "hc",
      "wind_direction_compass": "WNW",
      "created": "2018-08-27T00:26:53.302420Z",
      "applicable_date": "2018-08-29",
      "min_temp": 12.973333333333334,
      "max_temp": 23.816666666666666,
      "the_temp": 23.105,
      "wind_speed": 2.5910482597046585,
      "wind_direction": 289.38436960074995,
      "air_pressure": 1001.94,
      "humidity": 47,
      "visibility": 16.50392955141971,
      "predictability": 71
    },
    {
      "id": 6058613596487680,
      "weather_state_name": "Showers",
      "weather_state_abbr": "s",
      "wind_direction_compass": "W",
      "created": "2018-08-27T00:26:55.719500Z",
      "applicable_date": "2018-08-30",
      "min_temp": 12.530000000000001,
      "max_temp": 20.69333333333333,
      "the_temp": 18.83,
      "wind_speed": 1.9240790426681516,
      "wind_direction": 276.5026508258453,
      "air_pressure": 1005.7049999999999,
      "humidity": 59,
      "visibility": 14.787080947267954,
      "predictability": 73
    },
    {
      "id": 6270844842016768,
      "weather_state_name": "Showers",
      "weather_state_abbr": "s",
      "wind_direction_compass": "N",
      "created": "2018-08-27T00:26:59.242170Z",
      "applicable_date": "2018-08-31",
      "min_temp": 11.050000000000002,
      "max_temp": 22.816666666666666,
      "the_temp": 17.64,
      "wind_speed": 2.0433045017100135,
      "wind_direction": 6.617458481706948e-15,
      "air_pressure": 995.96,
      "humidity": 57,
      "visibility": 9.997862483098704,
      "predictability": 73
    }
  ],
  "time": "2018-08-26T19:57:43.001670-07:00",
  "sun_rise": "2018-08-26T06:24:54.544589-07:00",
  "sun_set": "2018-08-26T20:00:52.895430-07:00",
  "timezone_name": "LMT",
  "parent": {
    "title": "Oregon",
    "location_type": "Region / State / Province",
    "woeid": 2347596,
    "latt_long": "44.115589,-120.514839"
  },
  "sources": [
    {
      "title": "BBC",
      "slug": "bbc",
      "url": "http://www.bbc.co.uk/weather/",
      "crawl_rate": 180
    },
    {
      "title": "Forecast.io",
      "slug": "forecast-io",
      "url": "http://forecast.io/",
      "crawl_rate": 480
    },
    {
      "title": "Met Office",
      "slug": "met-office",
      "url": "http://www.metoffice.gov.uk/",
      "crawl_rate": 180
    },
    {
      "title": "OpenWeatherMap",
      "slug": "openweathermap",
      "url": "http://openweathermap.org/",
      "crawl_rate": 360
    },
    {
      "title": "World Weather Online",
      "slug": "world-weather-online",
      "url": "http://www.worldweatheronline.com/",
      "crawl_rate": 360
    },
    {
      "title": "Yahoo",
      "slug": "yahoo",
      "url": "http://weather.yahoo.com/",
      "crawl_rate": 180
    }
  ],
  "title": "Portland",
  "location_type": "City",
  "woeid": 2475687,
  "latt_long": "45.511791,-122.675629",
  "timezone": "US/Pacific"
}

*/

if (window.location.origin=="http://mhunterak.github.io") {
	alert("insecure services (like github.io) are not allowed access to location services, Please enter your Location in the form at the bottom. Currently loading weather for Portland.");
	xhr1.open('GET', "https://cors.io/?https://www.metaweather.com/api/location/search/?query=" + 'Portland');
	xhr1.send();
} else {
	getLocation();
}


