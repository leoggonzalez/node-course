const jwt = require('jsonwebtoken');
const { User } = require('../model/user');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
      throw new Error('Request needs authorization.');
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'my_secret');
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authorize." });
  }
};

module.exports = {
  auth,
};