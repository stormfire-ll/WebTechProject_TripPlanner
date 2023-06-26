function updateWeather() {
    console.log("updateWeather")
    const city = document.getElementById("query").value;

    fetch("/weather?city=" + city)
        //.then(response => response.json())
        .then(async response => {
            const test = await response.json()
            // let city = document.querySelector(".weather_city");
            // let day =  document.querySelector(".weather_day");
            // let humidity = document.querySelector(".weather_indicator--humidity>.value");
            // let wind =  document.querySelector(".weather_indicator--wind>.value");
            // let temperature = document.querySelector(".weather_temperature>.value");

            let city = document.getElementById("weather_city");
            let day = document.getElementById("weather_day");
            let humidity = document.getElementById("humidity");
            let wind = document.getElementById("wind");
            let temperature = document.getElementById("temperature");

            console.log(response)
            console.log(test["temperature"])
            console.log(city, wind)
            console.log(response["city"])

            city.innerHTML = response.city;
            day.innerHTML = response.day;
            humidity.innerHTML = response.humidity;
            wind.innerHTML = response.wind;
            temperature.innerHTML = response.temperature;
        })
        .catch(error => {
            console.log(error);
        })
}
