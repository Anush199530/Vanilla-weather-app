function formateDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[day];
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#city");
  let discriptionElement = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#Humidity");
  let WindElement = document.querySelector("#Wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weatherIcon");

  celsiusTemperature = response.data.temperature.main;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  discriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  WindElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formateDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.coordinates);
}

function displayForecast(response) {
  let forcast = response.data.daily;
  console.log(response.data);
  let forecastElement = document.querySelector("#forcast");
  let forcastHTML = ` <div class="row"> `;

  forcast.forEach(function (forcastDay, index) {
    if (index < 5) {
      forcastHTML =
        forcastHTML +
        `
           <div class="col-2">
            <div class="weather-forcast-date">
            ${formateDay(forcastDay.time)} 
      
            </div>
 
              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forcastDay.condition.icon
              }.png" alt= "" width="60">
  
              <div class="weather-forcast-temperature">
                  <span class="weather-forcast-temperatures-max">${Math.round(
                    forcastDay.temperature.maximum
                  )}°</span>/ 
                  <span class="weather-forcast-temperatures-min">${Math.round(
                    forcastDay.temperature.minimum
                  )}°</span>
                </div>
                </div>
                

                `;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forecastElement.innerHTML = forcastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1a747f2d7ac32a100bt13fab8776o6ca";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function search(city) {
  let apiKey = "1a747f2d7ac32a100bt13fab8776o6ca";
  let apiUnits = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${apiUnits}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showfahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function showcelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showfahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showcelsiusTemperature);

search("Brussel");