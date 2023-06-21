const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const locationNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");

async function fetchWeatherData(city) {
  const apiKey = "bc295a4bc8727b69c6df749ba9cc88be";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const weatherData = await response.json();

    if (weatherData.cod === "404") {
      locationNotFound.style.display = "flex";
      weatherBody.style.display = "none";
      console.log("error");
      return;
    }

    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";

    const temperatureValue = Math.round(weatherData.main.temp - 273.15);
    temperature.innerHTML = `${temperatureValue}°C`;
    description.innerHTML = `${weatherData.weather[0].description}`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;

    //console.log(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

searchBtn.addEventListener("click", () => {
  let city = inputBox.value.trim();

  if (city) {
    fetchWeatherData(city);
  } else {
    alert("Please enter a valid city name");
  }
});
