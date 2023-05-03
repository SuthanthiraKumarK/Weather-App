"use strict";

// DOM ELEMENTS
const temp = document.querySelector(".temperature");
const weatherIcon = document.querySelector(".weather-icon");
const weatherText = document.querySelector(".weather-text");
const windSpeed = document.querySelector(".wind-speed");
const currentLocation = document.querySelector(".current-location");

const searchLocation = document.querySelector(".search-location");
const searchButton = document.querySelector(".search-button");

// FUNCTIONS
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getLocation = async function () {
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=71f1878f64a94dca85a102342230105&q=${lat},${lng}&days=7`
  )
    .then((res) => res.json())
    .then((data) => {
      temp.innerHTML = `${data.current.temp_c}℃`;
      weatherIcon.setAttribute("src", `${data.current.condition.icon}`);
      weatherText.innerHTML = `${data.current.condition.text}`;
      windSpeed.innerHTML = `${data.current.wind_kph} kph`;
      currentLocation.innerHTML = `${data.location.name}`;

      updateForecast(1, data);
      updateForecast(2, data);
      updateForecast(3, data);
      updateForecast(4, data);
      updateForecast(5, data);
    });
};

getLocation();

const updateForecast = function (x, y) {
  const forecastDate = document.querySelector(`.forecast-date${x}`);
  const forecastTemp = document.querySelector(`.forecast-temp${x}`);
  const forecastIcon = document.querySelector(`.forecast-icon${x}`);

  forecastDate.innerHTML = `${y.forecast.forecastday[x].date}`;
  forecastTemp.innerHTML = `${y.forecast.forecastday[x].day.avgtemp_c}℃
  `;
  forecastIcon.setAttribute(
    "src",
    `${y.forecast.forecastday[x].day.condition.icon}`
  );
};

const search = async function () {
  const Location = searchLocation.value;

  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=71f1878f64a94dca85a102342230105&q=${Location}&days=7`
  )
    .then((res) => res.json())
    .then((data) => {
      temp.innerHTML = `${data.current.temp_c}℃`;
      weatherIcon.setAttribute("src", `${data.current.condition.icon}`);
      weatherText.innerHTML = `${data.current.condition.text}`;
      windSpeed.innerHTML = `${data.current.wind_kph} kph`;
      currentLocation.innerHTML = `${data.location.name}`;

      updateForecast(1, data);
      updateForecast(2, data);
      updateForecast(3, data);
      updateForecast(4, data);
      updateForecast(5, data);
    })
    .catch((err) => {
      temp.innerHTML = `0℃`;
      weatherIcon.setAttribute("src", ``);
      weatherText.innerHTML = `Error 404`;
      windSpeed.innerHTML = `0 kph`;
      currentLocation.innerHTML = `location not found`;
    });
};

// EVENTS
searchButton.addEventListener("click", search);
