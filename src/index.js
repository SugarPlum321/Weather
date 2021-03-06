//today date
function displayDate() {
  let now = new Date();
  let days = ["Sunday", "Monday", "Tusday", "Wendsday", "Friday", "Saturday"];
  let today = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let todayDate = `${today} ${hour}:${minutes}`;
  return todayDate;
}

let dateIsNow = document.querySelector("#todayDate");
dateIsNow.innerHTML = `${displayDate()}`;

//City input
function seachCity(city) {
  let apiKey = "a05ae6cedba9f2ae2d858f2bc163bc51";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  axios.get(apiURL).then(getInfo);
}

function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  seachCity(city);
}
seachCity("New York");

let formCity = document.querySelector("#form-city");
formCity.addEventListener("submit", displayCity);

//feching Today infor
function getInfo(response) {
  console.log(response.data);
  document.querySelector("#city-Location").innerHTML = response.data.name;
  let tempF = Math.round(response.data.main.temp);
  let todayTempFah = document.querySelector("#todayFahrenheit");
  todayTempFah.innerHTML = `${tempF}°F`;
  let tempC = Math.round(((response.data.main.temp - 32) * 5) / 9);
  let todayTempCel = document.querySelector("#todayCelsius");
  todayTempCel.innerHTML = `${tempC}°C`;
  let humidity = response.data.main.humidity;
  let todayhumidity = document.querySelector("#humidity");
  todayhumidity.innerHTML = `${humidity}`;
  document.querySelector("#weatherDiscrip").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  //icon
  let todayIcon = response.data.weather[0].icon;
  document
    .querySelector("#todayIcon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${todayIcon}@2x.png`
    );
  //5 day forcast call
  getForecast(response.data.coord);
}

//5 day forcast information call
function getForecast(coordinates) {
  let apiKey = "a05ae6cedba9f2ae2d858f2bc163bc51";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}
//formate the 5 day forcast
function formateDays(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tusday",
    "Wensday",
    "Thursaday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
//5day forcast display
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let forecastDays = document.querySelector("#forcast-Days");
  let forecastHTML = "";

  forecast.forEach(function (forecastFive, index) {
    //display box
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <div class="dayBox" class="col-12" >
    <h4 class="day">${formateDays(forecastFive.dt)}</h4>
      <div class="row">
        <div class="col">
        <img class="fiveDayIcon" src="http://openweathermap.org/img/wn/${
          forecastFive.weather[0].icon
        }@2x.png"/>
         
        </div>
        <div class="col">
        <h3 class="fahrenheit"> ${Math.round(forecastFive.temp.day)}°F</h3>
          <div class="row">
          <h3 class="celsius">${Math.round(
            ((forecastFive.temp.day - 32) * 5) / 9
          )}°C</h3>
          </div>
        </div>
      </div>
    </div>
  `;
    }
  });

  forecastDays.innerHTML = forecastHTML;
}
