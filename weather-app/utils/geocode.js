const request = require('postman-request');

const geoApiKey = 'pk.eyJ1IjoibGVvZ2dvbnphbGV6IiwiYSI6ImNrdHdudnM3MzEzNWIyd21ydzBkZTZva2wifQ.hkrR9BFots9kG5cDFb1N-w';

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=${geoApiKey}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!')
    } else if (!response.body.features?.length) {
      callback('Unable to find location. Try another search')
    } else {
      const data = response.body.features[0];

      callback(undefined, {
        location: data.place_name,
        latitud: data.center[0],
        longitud: data.center[1],
      });
    }
  });
}

module.exports = {
  geocode
}