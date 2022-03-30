const express = require('express');
const { User } = require('../model/user');
const { getInvalidOperations } = require('../model/util.js');

const router = new express.Router();

/* User LOGIN  */
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* User CREATE  */
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
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
  const updates = Object.keys(req.body);
  const invalidOperations = getInvalidOperations(updates, ['name', 'email', 'password', 'age']);

  try {
    if (invalidOperations.length) {
      throw new Error(`Invalid operation/s: ${invalidOperations.join(' - ')}`);
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send(`User with id: ${req.params.id} not found`);
    }

    updates.forEach(update => user[update] = req.body[update]);

    await user.save();

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