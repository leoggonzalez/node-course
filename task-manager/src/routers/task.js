const express = require('express');
const { Task } = require('../model/task');
const { getInvalidOperations } = require('../model/util.js');
const { auth } = require('../middleware/auth');

const router = new express.Router();

/* Task Create  */
router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    res.send(await task.save());
  } catch (error) {
    res.status(400).send(error);
  }
});
/* Task Read  */
router.get('/tasks', async (_, res) => {
  try {
    res.send(await Task.find())
  } catch (error) {
    res.status(404).send(error);
  }
})
router.get('/tasks/:id', async ({ params: { id } }, res) => {
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
/* Task Update  */
router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const invalidOperations = getInvalidOperations(updates, ['title', 'required']);

  try {
    if (invalidOperations.length) {
      throw new Error(`Invalid operation/s: ${invalidOperations.join(' - ')}`);
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).send(`Task with id: ${req.params.id} not found`);
    }

    updates.forEach(update => task[update] = req.body[update]);

    await task.save();

    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
})
/* Task Delete  */
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send(`Task with id: ${req.params.id} not found`);
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

module.exports = router;