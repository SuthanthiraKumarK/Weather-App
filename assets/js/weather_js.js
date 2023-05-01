'use strict';

const temp = document.querySelector('.temperature');
const weatherIcon = document.querySelector('.weather-icon');
const weatherText = document.querySelector('.weather-text');
const windSpeed = document.querySelector('.wind-speed');
const currentLocation = document.querySelector('.current-location');

const searchLocation = document.querySelector('.search-location');
const searchButton = document.querySelector('.search-button');



const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getLocation = async function() {
   
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  // console.log(lat,lng);

  fetch (`http://api.weatherapi.com/v1/current.json?key=71f1878f64a94dca85a102342230105&q=${lat},${lng}`).then(res=>res.json()).then(data=>{

    temp.innerHTML = `${data.current.temp_c}℃`;
    weatherIcon.setAttribute('src',`${data.current.condition.icon}`);
    weatherText.innerHTML = `${data.current.condition.text}`;
    windSpeed.innerHTML = `${data.current.wind_kph} kph`;
    currentLocation.innerHTML = `${data.location.name}`;
    
})};

getLocation();

const search = async function (){

  const Location = searchLocation.value;

  fetch (`http://api.weatherapi.com/v1/current.json?key=71f1878f64a94dca85a102342230105&q=${Location}`).then(res=>res.json()).then(data=>{

  temp.innerHTML = `${data.current.temp_c}℃`;
  weatherIcon.setAttribute('src',`${data.current.condition.icon}`);
  weatherText.innerHTML = `${data.current.condition.text}`;
  windSpeed.innerHTML = `${data.current.wind_kph} kph`;
  currentLocation.innerHTML = `${data.location.name}`;

}).catch(err=>{
  temp.innerHTML = `0℃`;
  weatherIcon.setAttribute('src',``);
  weatherText.innerHTML = `Error 404`;
  windSpeed.innerHTML = `0 kph`;
  currentLocation.innerHTML = `location not found`;
})};


searchButton.addEventListener('click',search);