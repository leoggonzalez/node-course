const express = require('express');
const { User } = require('../model/user');
const { getInvalidOperations } = require('../model/util.js');
const { auth } = require('./../middleware/auth');

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

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(item => item.token !== req.token);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/users/logout-all', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
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

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
/* User Read  */
router.get('/users', auth, async (req, res) => {
  try {
    res.send(await User.find());
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get('/users/me', auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(404).send(error);
  }
});

/* User Update  */
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const invalidOperations = getInvalidOperations(updates, ['name', 'email', 'password', 'age']);

  try {
    if (invalidOperations.length) {
      throw new Error(`Invalid operation/s: ${invalidOperations.join(' - ')}`);
    }

    updates.forEach(update => req.user[update] = req.body[update]);

    await req.user.save();

    res.send(req.user);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

/* User Delete  */
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;