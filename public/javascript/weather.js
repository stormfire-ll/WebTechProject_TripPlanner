function updateWeather() {
    console.log("Test")
    const city = document.getElementById("query").value;

    fetch("/weather?city=" + city)
        .then(response => response.json())
        .then(response => {
            const city = document.getElementById("weather_city");
            const day = document.getElementById("weather_day");
            const humidity = document.getElementById("humidity");
            const wind = document.getElementById("pressure");
            const temperature = document.getElementById("temperature");

            city.textContent = response.city;
            day.textContent = response.day;
            humidity.textContent = response.humidity;
            wind.textContent = response.wind;
            temperature.textContent = response.temperature;

            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
}
