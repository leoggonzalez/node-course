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
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    res.send(await user.save())
  } catch (error) {
    res.status(400).send(error);
  }
});
/* User Read  */
app.get('/users', async (req, res) => {
  try {
    res.send(await User.find())
  } catch (error) {
    res.status(404).send(error);
  }
})
app.get('/users/:id', async ({ params: { id } }, res) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('Not found')
    }
    res.send(user)
  } catch (error) {
    res.status(500).send();
  }
})
/* User Update  */
app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send(`User with id: ${req.params.id} not found`);
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
})
/* Task Create  */
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    res.send(await task.save());
  } catch (error) {
    res.status(400).send(error);
  }
});
/* Task Read  */
app.get('/tasks', async (_, res) => {
  try {
    res.send(await Task.find())
  } catch (error) {
    res.status(404).send(error);
  }
})
app.get('/tasks/:id', async ({ params: { id } }, res) => {
  try {
    const task = await Task.findById(id);
    if (!task) {
      res.status(404).send('Task not found')
    }
    res.send(task)
  } catch (error) {
    res.status(500).send();
  }
})

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
})