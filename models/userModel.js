const mongoose = require('mongoose');
const validator = require('validator');

//name,email,photo, password, passwordConfirm;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please Provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please Provide a Password'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please Confirm your Password'],
    validate: {
      //This will only work on CREATE AND SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
