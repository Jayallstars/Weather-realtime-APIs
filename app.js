const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "51c066067127e0f9136707c05295399a";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
  https.get(url, function(respone) {
    respone.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const cityName = weatherData.name;
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
      const textButton = "Back"
      const buttonOnclick = "window.location.href=";
      const linkButton = "/"
      res.write("<p>The weather is currently " + description + "</p>");
      res.write("<h1>The temperature in " + cityName + " is " + temperature + " " + description + "</h1>");
      res.write("<img src="+imageUrl+">");
      res.write("<button><a href="+linkButton+">"+ textButton +"</a></button>");
      res.send();
    });
  });
});


app.listen(3000, function () {
  console.log("Running on port 3000.");
});
