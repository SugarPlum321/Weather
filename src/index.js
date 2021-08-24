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
function displayCity(event) {
  event.preventDefault();
  let cityLocation = document.querySelector("#city-Location");
  let city = document.querySelector("#input-city").value;
  cityLocation.innerHTML = city;
  let apiKey = "a05ae6cedba9f2ae2d858f2bc163bc51";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(getTemp);
}

let formCity = document.querySelector("#form-city");
formCity.addEventListener("submit", displayCity);

//feching temp
function getTemp(response) {
  let temF = Math.round(response.data.main.temp);
  let todayTempFah = document.querySelector("#todayFahrenheit");
  todayTempFah.innerHTML = `${temF}°F`;
  let humidity = response.data.main.humidity;
  console.log(humidity);
  let todayhumidity = document.querySelector("#humidity");
  todayhumidity.innerHTML = `${humidity}`;
}

//🙀 Bonus point:
//Add a Current Location button.
//When clicking on it, it uses the Geolocation API to get
//your GPS coordinates and display and the city and current
//temperature using the OpenWeather API.

//function handlePosition(position) {
//let lat = position.coords.latitude;
//let lon = position.coords.longitude;
//let apiKey = "a05ae6cedba9f2ae2d858f2bc163bc51";
//let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
//axios.get(apiURL).then(getTemp);
//}
//navigator.geolocation.getCurrentPosition(handlePosition);
