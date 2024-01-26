// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// eslint-disable-next-line arrow-body-style, prettier/prettier
const signToken = (id) => jwt.sign({ id: id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN,});

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'Success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 404));
  }
  //2) Check if user exits && password is correct
  const user = await User.findOne({ email: email }).select('+password');
  console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  //3) If everything is ok, send token to client
  const token = signToken(user._id);
  console.log(token);
  console.log('hello');
  res.status(200).json({
    status: 'Success',
    token: token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //Getting the token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in!', 401));
  }
  //Verification Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // Check if user still exists
  const CurrentUser = await User.findById(decoded.id);
  if (!CurrentUser)
    return next(
      new AppError('The token belonging to the user does no longer exits', 401),
    );
  //Check if user changed password after token was issued.
  if (CurrentUser.changesPasswordAfter(decoded.iat)) {
    return next(new AppError('User Recently changed Password!,', 401));
  }

  //Grant Access to the protected route
  req.user = CurrentUser;
  next();
});
