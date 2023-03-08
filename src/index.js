async function getWeather(e) {
  e.preventDefault();

  let location = e.target[0].value;

  const fetchWeather = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      location +
      "&appid=ebec32689cca57873a2e0efa1d5292d3&units=metric"
  );

  const weatherData = await fetchWeather.json();

  const displayWeather = document.getElementById("displayWeather");
  displayWeather.innerHTML = " ";

  handleWeather(weatherData);
}

function handleWeather(weatherData) {
  let weather = {
    location: weatherData.name,
    temp: weatherData.main.temp,
    feels: weatherData.main.feels_like,
    weather: weatherData.weather[0].main,
    wind: weatherData.wind
  };

  console.log(weather);

  const displayWeather = document.getElementById("displayWeather");
  const body = document.getElementById("body");
  // Change styling with weather
  switch (weather.weather) {
    case "Rain":
      console.log("raining");
      body.className = "rain";
      break;

    case "Clouds":
      console.log("cloudy");
      body.className = "clouds";
      break;

    case "Clear":
      console.log("clear");
      body.className = "clear";
      break;

    case "Snow":
      console.log("snow");
      body.className = "snow";
      break;

    default:
      console.log("No matching weather");
  }

  // Display weather details
  let locationDiv = document.createElement("div");
  locationDiv.id = "locationDiv";
  let location = document.createElement("h2");
  location.innerHTML = weather.location;
  locationDiv.appendChild(location);
  displayWeather.appendChild(locationDiv);

  let weatherTypeDiv = document.createElement("div");
  weatherTypeDiv.id = "weatherTypeDiv";
  let weatherType = document.createElement("h2");
  weatherType.innerHTML = weather.weather;
  weatherTypeDiv.appendChild(weatherType);
  displayWeather.appendChild(weatherTypeDiv);

  // Create div for temp and button to change temp to fahrenheit
  let tempDiv = document.createElement("div");
  let temp = document.createElement("h3");
  temp.className = "C";
  temp.id = "tempC";
  temp.innerHTML = "Temp: " + weather.temp + " Celsius";
  tempDiv.appendChild(temp);

  let feels = document.createElement("h3");
  feels.className = "C";
  feels.id = "feelsC";
  feels.innerHTML = "Feels like: " + weather.feels + " Celsius";
  tempDiv.appendChild(feels);

  let tempButton = document.createElement("button");
  tempButton.innerHTML = "Change units";
  tempButton.addEventListener("click", () => {
    let tempC = document.getElementById("tempC");
    let feelsC = document.getElementById("feelsC");
    if (tempC.className === "C" && feelsC.className === "C") {
      tempC.className = "F";
      feelsC.className = "F";
      tempC.innerHTML =
        "Temp: " + ((weather.temp - 32) * (5 / 9)).toFixed(2) + " Fahrenheit";
      feelsC.innerHTML =
        "Feels like: " +
        ((weather.temp - 32) * (5 / 9)).toFixed(2) +
        " Fahrenheit";
    } else {
      tempC.className = "C";
      tempC.innerHTML = "Temp: " + weather.temp + " Celsius";
      feelsC.className = "C";
      feelsC.innerHTML = "Feels like: " + weather.feels + " Celsius";
    }
  });
  tempDiv.appendChild(tempButton);

  let weatherDetailsDiv = document.createElement("div");
  weatherDetailsDiv.id = "weatherDetailsDiv";
  let wind = document.createElement("h3");
  wind.innerHTML = "Wind: " + weather.wind.speed + " MPH";
  weatherDetailsDiv.appendChild(tempDiv);
  weatherDetailsDiv.appendChild(wind);

  displayWeather.appendChild(weatherDetailsDiv);
}

let getWeatherForm = document.getElementById("weatherForm");
getWeatherForm.addEventListener("submit", getWeather);
