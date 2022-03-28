const express = require('express');
const { User } = require('../model/user');
const { getInvalidOperations } = require('../model/util.js');

const router = new express.Router();

/* User CREATE  */
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    res.send(await user.save())
  } catch (error) {
    res.status(400).send(error);
  }
});
/* User Read  */
router.get('/users', async (req, res) => {
  try {
    res.send(await User.find())
  } catch (error) {
    res.status(404).send(error);
  }
})
router.get('/users/:id', async ({ params: { id } }, res) => {
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
router.patch('/users/:id', async (req, res) => {
  const invalidOperations = getInvalidOperations(Object.keys(req.body), ['name', 'email', 'password', 'age']);

  try {
    if (invalidOperations.length) {
      throw new Error(`Invalid operation/s: ${invalidOperations.join(' - ')}`);
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send(`User with id: ${req.params.id} not found`);
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

/* User Delete  */
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send(`User with id: ${req.params.id} not found`);
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;