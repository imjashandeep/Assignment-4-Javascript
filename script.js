const apiKeyWeather = 'YOUR_OPENWEATHERMAP_API_KEY';
const apiKeyGiphy = 'YOUR_GIPHY_API_KEY';
const generateBtn = document.getElementById('generateBtn');
const weatherInfo = document.getElementById('weatherInfo');
const gifContainer = document.getElementById('gifContainer');

generateBtn.addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput').value;
    getWeatherData(cityInput);
});

async function getWeatherData(city) {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}`);
    const weatherData = await weatherResponse.json();

    const weatherDescription = weatherData.weather[0].description;
    const temperature = (weatherData.main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius

    weatherInfo.innerHTML = `<p>Weather: ${weatherDescription}</p><p>Temperature: ${temperature} °C</p>`;

    getWeatherGif(weatherDescription);
}

async function getWeatherGif(query) {
    const gifResponse = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKeyGiphy}&tag=${query}`);
    const gifData = await gifResponse.json();

    const gifUrl = gifData.data.images.downsized.url;
    const gifImage = document.createElement('img');
    gifImage.src = gifUrl;

    gifContainer.innerHTML = '';
    gifContainer.appendChild(gifImage);
}
