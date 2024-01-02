//Imported all the modules from express
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

//Connecting mongoose
dotenv.config({ path: './config.env' });

//Replacing the real password with the DATABASE PASSWORD
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);
//This is used for avoiding the deprecation
// Copy the whole code, when creating new project
mongoose.set('strictQuery', false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true, // Add this line for MongoDB version 3.6 and later
  })
  .then(() => {
    console.log('DB Connection Successful');
  });

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//1) MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
// this is used to access the static files in the directory
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
