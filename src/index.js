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
  console.log(apiURL);
  axios.get(apiURL).then(getTemp);
  displayCity.innerHTML = document.querySelector("#city-Location").value;
}

function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  seachCity(city);
}
seachCity("New York");

let formCity = document.querySelector("#form-city");
formCity.addEventListener("submit", displayCity);

//feching temp
function getTemp(response) {
  let tempF = Math.round(response.data.main.temp);
  let todayTempFah = document.querySelector("#todayFahrenheit");
  todayTempFah.innerHTML = `${tempF}°F`;
  let humidity = response.data.main.humidity;
  let todayhumidity = document.querySelector("#humidity");
  todayhumidity.innerHTML = `${humidity}`;
  let tempC = Math.round(((response.data.main.temp - 32) * 5) / 9);
  console.log(tempC);
  let todayTempCel = document.querySelector("#todayCelsius");
  todayTempCel.innerHTML = `${tempC}°C`;
}

//Auto weather for cutrrent location
//function searchLocation(position) {
//let apiKey = "a05ae6cedba9f2ae2d858f2bc163bc51";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

//axios.get(apiUrl).then(getTemp);
//}
//function getCurrentLocation(event) {
//event.preventDefault();
//navigator.geolocation.getCurrentPosition(searchLocation);
//}
