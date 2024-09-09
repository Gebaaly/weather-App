async function getWeather() {
  const apiKey = `efac2e832d369cfc5f0cfa1d60bb1bd3`;
  const city = document.getElementById(`city`).value;
  if (!city) {
    alert(`please Enter A City`);
    return;
  }
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  try {
    const currentWeather = await fetch(currentWeatherUrl);
    if (!currentWeather.ok) {
      throw new Error(
        `Error fetching current weather data: ${currentWeather.statusText}`
      );
    }
    const currentWeatherData = await currentWeather.json();
    console.log("Current Weather Data:", currentWeatherData); // Logs the current weather data
    displayWeather(currentWeatherData);

    const forecastfetch = await fetch(forecastUrl);
    if (!forecastfetch.ok) {
      throw new Error(
        `Error fetching hourly forecast data: ${forecastfetch.statusText}`
      );
    }
    const forecastData = await forecastfetch.json();
    displayHourlyForecast(forecastData.list);
  } catch (error) {
    console.error(error.message);
    alert(error.message);
  }
}
// fetch(currentWeatherUrl)
//   .then((response) => response.json())
//   .then((data) => {
//       console.log("Current Weather Data:", data);  // Logs the current weather data to the console

//     displayWeather(data);
//   })
//   .catch((error) => {
//     console.error(`Error fetching current weather data: `, error);
//     alert(`Error fetching current weather data. please try again`);
//   });

// fetch(forecastUrl)
//   .then((response) => response.json())
//   .then((data) => {
//     displayHourlyForecast(data.list);
//   })
//   .catch((error) => {
//     console.error(`Error fetching hourly forecast data: `, error);
//     alert(`Error fetching hourly forecast data. please try again`);
//   });
// }
function displayWeather(data) {
  const tempDivInfo = document.getElementById(`temp-div`);
  const weatherInfoDiv = document.getElementById(`weather-info`);
  const weatherIcon = document.getElementById(`weather-icon`);
  const hourlyForecastDiv = document.getElementById(`hourly-forecast`);
  //clear previous content
  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempDivInfo.innerHTML = "";
  if (data.cod === `404`) {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHtml = `<p>${temperature}C°</p>`;

    const weatherHtml = `
    <p>${cityName}</p>
    <p>${description}</p>
    `;
    tempDivInfo.innerHTML = temperatureHtml;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconURL;
    weatherIcon.alt = description;
    showImage();
  }
}
function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById(`hourly-forecast`);
  const next24Hours = hourlyData.slice(0, 8);
  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    const hourlyItemHtml = `
    <div class="hourly-item">
    <span>${hour}:00</span>
    <img src="${iconUrl}" alt="Hourly Weather Icon">
    <span>${temperature}C°</span>
    </div>    
    `;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}
function showImage() {
  const weatherIcon = document.getElementById(`weather-icon`);
  weatherIcon.style.display = `block`;
}
