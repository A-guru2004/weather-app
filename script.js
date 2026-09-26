const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const message = document.getElementById("message");

const icon = document.getElementById("icon");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const description = document.getElementById("description");



searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") getWeather();
});

function showMessage(text, isError = false) {
    message.textContent = text;
    message.className = isError ? "error" : "";
}

async function getWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        showMessage("Please enter a city name", true);
        return;
    }

    showMessage("Loading...");
    searchBtn.disabled = true;

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) throw new Error("City not found");
            if (response.status === 401) throw new Error("Invalid API key");
            throw new Error("Failed to fetch weather");
        }

        const data = await response.json();

        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        icon.hidden = false;

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `Temperature: ${Math.round(data.main.temp)} °C`;
        feelsLike.textContent = `Feels like: ${Math.round(data.main.feels_like)} °C`;
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
        wind.textContent = `Wind: ${data.wind.speed} m/s`;
        description.textContent = `Weather: ${data.weather[0].description}`;

        showMessage("");
    } catch (error) {
        showMessage(error.message, true);
    } finally {
        searchBtn.disabled = false;
    }
}