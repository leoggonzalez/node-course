const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');
const yargs = require('yargs');

yargs.version('1.0.1');

const getWeatherInfo = (query) => {
  geocode(query, (error, data) => {
    if (error) return console.log('Error', error);

    forecast(`${data.longitud},${data.latitud}`, (error, data) => {
      if (error) return console.log('Error', error);

      console.log(`Currently in ${data.name} it's ${data.temperature} C°, feels like ${data.feelslike} °C. There's ${data.precip}% chance of rain.`);
    })
  })
}

// Create read command
yargs.command({
  command: 'weather',
  describe: 'Get weather for a location',
  builder: {
    location: {
      describe: 'Location',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    getWeatherInfo(argv.location);
  }
});

yargs.parse();
