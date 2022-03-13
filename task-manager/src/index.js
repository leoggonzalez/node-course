const express = require('express');
require('./db/mongoose');
const { User } = require('./model/user');

const app = express();

const port = process.env.PORT || '3000';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello')
})

app.post('/users', (req, res) => {
  const user = new User(req.body);
  // res.send(resp);
  user.save().then((resp) => {
    res.send(resp);
  }).catch((error) => {
    res.status(400);
    res.send(error);
  })
})

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})