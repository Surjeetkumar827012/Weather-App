const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'c6852f0d1dmsh6bd027a1fafa892p155127jsn24045f13a1f3',
        'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
    }
};

// Function to fetch weather data
const getWeather = (city) => {
    const cityNameElement = document.getElementById("cityName");
    const cityInput = document.getElementById("city"); // Ensure the input field is selected

    if (cityNameElement) {
        cityNameElement.textContent = city; // Update city name in UI
    }

    fetch(`https://weather-api138.p.rapidapi.com/weather?city_name=${city}`, options)
        .then(response => response.json())
        .then((response) => {
            console.log(response); // Debugging: Check API response

            if (!response.main || !response.sys) {
                throw new Error("Invalid API response structure");
            }

            // Extract data
            const weatherData = response.main;
            const countryData = response.sys;

            // Update the UI elements safely
            document.getElementById("temp").textContent = `${(weatherData.temp - 273.15).toFixed(2)}°C`;
            document.getElementById("feels_like").textContent = `${(weatherData.feels_like - 273.15).toFixed(2)}°C`;
            document.getElementById("min_temp").textContent = `${(weatherData.temp_min - 273.15).toFixed(2)}°C`;
            document.getElementById("max_temp").textContent = `${(weatherData.temp_max - 273.15).toFixed(2)}°C`;
            document.getElementById("pressure").textContent = `${weatherData.pressure * 100} Pa`; // Convert to Pascal
            document.getElementById("humidity").textContent = `${weatherData.humidity}%`;
            document.getElementById("sea_level").textContent = `${weatherData.sea_level ?? "N/A"} m`;
            document.getElementById("grnd_level").textContent = `${weatherData.grnd_level ?? "N/A"} m`;
            document.getElementById("country").textContent = `${countryData.country}`;

            // Change background based on temperature
            updateBackground(weatherData.temp);
        })
        .catch(err => console.error("Error fetching data:", err));
};

// Function to update background image based on temperature
const updateBackground = (temperatureK) => {
    const temperatureC = temperatureK - 273.15;
    const body = document.body;

    if (temperatureC > 20) {
        body.style.backgroundImage = "url('image/sunny.jpg')"; // Replace with actual sunny image
    } else if (temperatureC >= 10) {
        body.style.backgroundImage = "url('image/cloud.jpg')"; // Replace with actual cloudy image
    } else {
        body.style.backgroundImage = "url('image/snow.jpeg')"; // Replace with actual snowy image
    }

    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "top";
};

// Event listener for form submission
document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    const cityInput = document.getElementById("city").value;
    if (cityInput.trim() !== "") {
        getWeather(cityInput);
    }
});

// Fetch weather for default city
getWeather("Delhi");
