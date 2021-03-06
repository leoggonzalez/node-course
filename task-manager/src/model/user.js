const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) throw new Error('Must be an email')
    }
  },
  age: {
    type: Number,
    default: 0,
    validate: (value) => {
      if (value < 0) throw new Error('Age must be positive')
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    validate: (value) => {
      if (value.includes('password')) throw new Error("Password can't include the word \"password\"")
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }],
});

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'my_secret');

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error(`Unable to login.`);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error(`Unable to login.`);
  }

  return user;
}

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
})

const User = mongoose.model('User', userSchema);

module.exports = {
  User
}