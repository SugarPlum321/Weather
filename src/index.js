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
  document.querySelector("#city-Location").innerHTML = response.data.name;
  let tempF = Math.round(response.data.main.temp);
  let todayTempFah = document.querySelector("#todayFahrenheit");
  todayTempFah.innerHTML = `${tempF}°F`;
  let humidity = response.data.main.humidity;
  let todayhumidity = document.querySelector("#humidity");
  todayhumidity.innerHTML = `${humidity}`;
  let tempC = Math.round(((response.data.main.temp - 32) * 5) / 9);

  let todayTempCel = document.querySelector("#todayCelsius");
  todayTempCel.innerHTML = `${tempC}°C`;
}
