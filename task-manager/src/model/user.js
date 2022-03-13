const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
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
});

module.exports = {
  User
}