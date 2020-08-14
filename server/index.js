const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(morgan('tiny'));
app.use(cors());

app.get('/api/v1/weather', (req, res) => {
  const url = `http://api.weatherapi.com/v1/current.json?&key=${process.env.WEATHER_API_KEY}q=${city}`
  fetch(url)
    .then((res) => res.json())
    .then(json => {
      res.json(json);
    }); 
});

function notFound(req, res, next) {
    const error = new Error('Not Found');
    res.status(404);
    next(error);
}

function errorHandler(error, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: error.message,
    });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 6500;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
