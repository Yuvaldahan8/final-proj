async function fetchWeather(city) {
    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherElement = document.getElementById('weather-info');
    if (weatherElement) {
        if (data && data.main) {
            weatherElement.innerHTML = `
                <p>Weather: ${data.main.temp}°C</p>
            `;
        } else {
            weatherElement.innerHTML = '<p>Unable to fetch weather data.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const weatherData = await fetchWeather('Tel Aviv');
    displayWeather(weatherData);
});
