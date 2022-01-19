const express = require("express");
const https = require("https");
var http = require("http");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const lat = req.body.lat;
    const lon = req.body.lon;
    // https://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536,-104.9847034&key=
    const googleApiKey = "AIzaSyDN-GS61p2LZP4Zj7Dj8JdZDtzl15tTNBM";
    // https://api.airmap.com/elevation/v1/ele/?points=14.158813,101.34478; ใช้ได้
    /* const apiKey = "51c066067127e0f9136707c05295399a"; */
    /* const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric"; */
    const url1 = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";
    const url = "https://api.open-elevation.com/api/v1/lookup?locations=" + lat + "," + lon; // ใช้ได้เเต่ช้ามาก
    // const url = "https://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536,-104.9847034&key=" + googleApiKey; ใช้ไม่ได้ต้องเสียเงิน
    // const url = "https://api.opentopodata.org/v1/test-dataset?locations=" + lat + "," + lon; ใช้ได้เเต่ไม่เเม่นยำ
    /* api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key} */
    // http://open.mapquestapi.com/elevation/v1/profile?key=KEY&shapeFormat=raw&latLngCollection=39.74012,-104.9849,39.7995,-105.7237,39.6404,-106.3736;
    https.get(url, function(respone) {
        respone.on("data", function(data) {
            console.log(JSON.parse(data));
            /* const weatherData = JSON.parse(data);
            const cityName = weatherData.name;
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            const textButton = "Back";
            const buttonOnclick = "window.location.href=";
            const linkButton = "/" */
            //res.write("<h1>The weather is currently " + description + "</h1>");
            /* res.write("<h1>The temperature in " + lat + " is " + temperature + " " + description + "</h1>"); */
            // res.write("<h1>Temperature is " + temperature + " Celcius " + "</h1>");
            // res.write("<h1>Minimum temperature is " + temperature + " Celcius " + "</h1>");
            // res.write("<h1>Maximum temperature is " + temperature + " Celcius " + "</h1>");
            // res.write("<h1>Atmospheric pressure (hPa) is " + temperature + " Celcius " + "</h1>");
            // res.write("<h1>Humidity is " + temperature + " Celcius " + "</h1>");
            // res.write("<h1>Sea level " + description + "</h1>");
            // res.write("<h1>Gorund level " + description + "</h1>");
            /* res.write("<img src=" + imageUrl + ">"); */
            // res.write("<button><a href=" + linkButton + ">" + textButton + "</a></button>");
            res.write("Success");
            res.send();
        });
    });
});


app.listen(3000, function() {
    console.log("Running on port 3000.");
});