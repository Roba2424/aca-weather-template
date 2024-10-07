const apiKey = "0a29b1f501fe91ed8bfeaee61400e49c";
const weatherIcon = document.getElementById("weather-icon");

window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const iconCode = data.weather[0].icon;

      getWheatherIcon(weatherIcon, iconCode);
      document.getElementById("city").textContent = data.name;
      document.getElementById("country").textContent = data.sys.country;
      document.getElementById(
        "temperature"
      ).textContent = `${data.main.temp.toFixed(2)} °C`;
    })
    .catch((error) => {
      console.error("Error fetching the weather data:", error);
    });
}

function searchCity() {
  let city = document.getElementById("cityInput").value;
  if (city === "") {
    alert("Please enter a city");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const iconeCode = data.weather[0].icon;

      if (data.cod === "404") {
        alert("City not found");
        return;
      }
      getWheatherIcon(weatherIcon, iconeCode);
      document.getElementById("city").textContent = data.name;
      document.getElementById("country").textContent = data.sys.country;
      document.getElementById(
        "temperature"
      ).textContent = `${data.main.temp.toFixed(2)} °C`;

      document.getElementById("cityInput").value = "";
    })
    .catch((error) => {
      document.getElementById("cityInput").value = "";
      alert("City not found");
    });
}

function getWheatherIcon(weatherIcon, iconCode) {
  weatherIcon.src = "";
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.src = iconUrl;
}
