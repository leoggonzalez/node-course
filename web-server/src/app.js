const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'My App',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae rem dolorem dolore eveniet exercitationem assumenda suscipit minima quisquam, non ex dolor fugit quas. Maiores, a cupiditate quisquam natus eius adipisci!'
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/help', (req, res) => {
  res.render('help');
});

app.get('/weather', (req, res) => {
  res.send({
    weather: 32,
    location: 'Berlin',
  })
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
})