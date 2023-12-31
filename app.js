//Imported all the modules from express
const express = require('express');
const morgan = require('morgan');
//Now app will be able to use epxress methods;
const app = express();

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
