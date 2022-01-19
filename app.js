const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const lat = req.body.lat;
    const lon = req.body.lon;
    /*     console.log(lat);
        console.log(lon); */
    const apiKey = "51c066067127e0f9136707c05295399a";
    /* const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric"; */
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";
    /* api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} */
    https.get(url, function(respone) {
        respone.on("data", function(data) {
            console.log(JSON.parse(data));
            const weatherData = JSON.parse(data);
            const cityName = weatherData.name;
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const textButton = "Back"
            const buttonOnclick = "window.location.href=";
            const linkButton = "/"
            res.write("<h1>The weather is currently " + description + "</h1>");
            /* res.write("<h1>The temperature in " + lat + " is " + temperature + " " + description + "</h1>"); */
            res.write("<h1>Temperature is " + temperature + " Celcius " + "</h1>");
            res.write("<h1>Minimum temperature is " + temperature + " Celcius " + "</h1>");
            res.write("<h1>Maximum temperature is " + temperature + " Celcius " + "</h1>");
            res.write("<h1>Atmospheric pressure (hPa) is " + temperature + " Celcius " + "</h1>");
            res.write("<h1>Humidity is " + temperature + " Celcius " + "</h1>");
            res.write("<h1>Sea level " + description + "</h1>");
            res.write("<h1>Gorund level " + description + "</h1>");
            /* res.write("<img src=" + imageUrl + ">"); */
            res.write("<button><a href=" + linkButton + ">" + textButton + "</a></button>");
            res.send();
        });
    });
});


app.listen(3000, function() {
    console.log("Running on port 3000.");
});