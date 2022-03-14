const express = require('express');
require('./db/mongoose');
const { User } = require('./model/user');
const { Task } = require('./model/task');

const app = express();

const port = process.env.PORT || '3000';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello')
})

/* User CREATE  */
app.post('/users', (req, res) => {
  const user = new User(req.body);
  // res.send(resp);
  user.save().then((resp) => {
    res.send(resp);
  }).catch((error) => {
    res.status(400);
    res.send(error);
  })
});
/* User Read  */
app.get('/users', (req, res) => {
  User.find().then((resp) => {
    res.send(resp)
  }).catch((error) => {
    res.status(404);
    res.send(error);
  })
})
app.get('/users/:id', ({ params: { id } }, res) => {
  User.findById(id).then((user) => {
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  }).catch((error) => {
    res.status(500).send();
  })
})
/* Task Create  */
app.post('/tasks', (req, res) => {
  const task = new Task(req.body);
  task.save().then((resp) => {
    res.send(resp);
  }).catch((error) => {
    res.status(400);
    res.send(error);
  })
});
/* User Read  */
app.get('/tasks', (_, res) => {
  Task.find().then((resp) => {
    res.send(resp)
  }).catch((error) => {
    res.status(404);
    res.send(error);
  })
})
app.get('/tasks/:id', ({ params: { id } }, res) => {
  Task.findById(id).then((task) => {
    if (!task) {
      return res.status(404).send()
    }
    res.send(task)
  }).catch(() => {
    res.status(500).send();
  })
})

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})