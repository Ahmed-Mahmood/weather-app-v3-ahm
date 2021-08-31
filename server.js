
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?';

let projectData = {};
const express = require('express');
const fetch = require("node-fetch");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
app.use(express.static('website'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('server running');
    console.log(`running on localhost ${port}`);
});

app.get('/get', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

app.get('/all', (req, res) => {
    res.json(projectData);
    console.log(projectData);
});

app.post('/add', (req, res) => {
  let zip = req.body.number;
  let apiKey = req.body.key;
  let unit = req.body.unit;

  const getWeather = async (baseURL, zip, apiKey) => {
    const response = await fetch(`${baseURL}zip=${zip}&appid=${apiKey}&units=${unit}`);
    console.log(`${baseURL}zip=${zip}&appid=${apiKey}`);
      try {
          const data = await response.json();
          return data;
      } catch(error) {
          console.log("error", error);
      }
  }
  getWeather(baseURL, zip, apiKey, unit)
  .then(function(data){

      projectData.location =`${data.name}, ${data.sys.country}`;
      projectData.temp= data.main.temp;
      projectData.icon= data.weather[0].icon;
      projectData.description= data.weather[0].description;
      projectData.feelsLike= data.main.feels_like;
      projectData.max= data.main.temp_max;
      projectData.min= data.main.temp_min;
      projectData.dt= req.body.dt;
      projectData.feelings= req.body.feelings;
      console.log(projectData);

      res.json("success");
  })
});

