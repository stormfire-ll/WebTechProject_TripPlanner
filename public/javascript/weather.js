function updateWeather() {
    console.log("updateWeather")
    const city = document.getElementById("query").value;

    fetch("/weather?city=" + city)
        .then(async response => {
            const test = await response.json() // should parse Sting into Object
            const data = JSON.parse(test)   // parse String -> Object

            let city = document.getElementById("weather_city");
            let day = document.getElementById("weather_day");
            let humidity = document.getElementById("humidity");
            let wind = document.getElementById("wind");
            let temperature = document.getElementById("temperature");

            // console.log(data)
            // console.log(data["temperature"])

            city.innerHTML = data["city"];
            day.innerHTML = data["day"];
            humidity.innerHTML = data["humidity"];
            wind.innerHTML = data["wind"];
            temperature.innerHTML = data["temperature"];
        })
        .catch(error => {
            console.log(error);
        })
}
window.onload = function () {
    document.getElementById("button").addEventListener("click", () => updateWeather());
};