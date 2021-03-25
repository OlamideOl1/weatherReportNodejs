const express = require("express");

const app = express();

const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/", function(req, res) {

  var cityname = req.body.cityName;

  var apikey = "64f4091a57269f4e06a56b4e1edc5df0";

  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + ",&APPID=" + apikey + "&units=" + unit;

  https.get(url, function(response) {

    console.log(response.statusCode);
    response.on("data", function(value) {
      weatherData = JSON.parse(value);
      console.log(weatherData.main.temp);
      console.log(weatherData.weather[0].description);

      const imageUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
      res.write("<h1>The temperature in " + cityname + " is about " + weatherData.main.temp + " degrees </h1>")
      res.write("<h1>The weather in ur location feels " + weatherData.weather[0].description + " </h1>")
      res.write("<img src=" + imageUrl + ">");
      res.write("<a href='/'>return to home page</a>");

      res.send();
    })
  })
})
app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");
});

// https.get(url,function(response){
//   console.log(response)
// })

// https.get(url,function(response){
//   console.log(response.statusCode);
//   response.on("data",function(value){
//     weatherData = JSON.parse(value);
//     console.log(weatherData.main.temp);
//     console.log(weatherData.weather[0].description);
//   })
// })

app.listen(3000, function() {
  console.log("Server is started on port 3000");
});
