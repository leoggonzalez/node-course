const { date } = require('assert-plus');
const request = require('postman-request');

const apiKey = 'bc3ef64cc20218c60ae5a213c0c28593';

const forecast = (query, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${query}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!')
    } else if (response.body.error) {
      callback('Unable to find location. Try another search')
    } else {
      const data = response.body;

      callback(undefined, {
        ...data.location,
        ...data.current,
      });
    }
  });
}

module.exports = {
  forecast
}