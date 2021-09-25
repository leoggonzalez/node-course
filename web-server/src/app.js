const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h1>Hello World</h1>
    <a href="/help">Help Page</a>
    <a href="/about">About Page</a>
  `);
});

app.get('/help', (req, res) => {
  res.send('<h1>Help page</h1><a href="/">Go Back</a>');
});

app.get('/about', (req, res) => {
  res.send('<h1>About page</h1><a href="/">Go Back</a>');
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
})