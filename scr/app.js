function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#city");
  let discriptionElement = document.querySelector("#weatherDescription");
  let humidityElement = document.querySelector("#Humidity");
  let WindElement = document.querySelector("#Wind");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  discriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  WindElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "537a0e0e7ac70ad389445679f87e0b6e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=brussel&appid=${apiKey}&units=metric`;
console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
