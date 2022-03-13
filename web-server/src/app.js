const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { geocode } = require('./../utils/geocode');
const { forecast } = require('./../utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Set up paths
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars enginge
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'My App',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae rem dolorem dolore eveniet exercitationem assumenda suscipit minima quisquam, non ex dolor fugit quas. Maiores, a cupiditate quisquam natus eius adipisci!',
    footer: 'Leo Gonzalez',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    footer: 'Leo Gonzalez',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    footer: 'Leo Gonzalez',
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    message: 'Help article not found',
    footer: 'Leo Gonzalez',
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: 'You need to provide an address',
    });
  }

  geocode(address, (error, { longitude, latitude } = {}) => {
    if (error) return res.send({ error });

    forecast(`${longitude},${latitude}`, (error, data) => {
      if (error) return res.send({ error });

      res.send(data);
    })
  })
});

app.get('*', (req, res) => {
  res.render('error', {
    message: '404. Not found',
    footer: 'Created by Me',
  })
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})