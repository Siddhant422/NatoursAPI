// eslint-disable-next-line no-unused-vars
const Tour = require('../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Missing Name or Price',
    });
  }
  next();
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'Success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  //This is a trick and it will convert the string to a integer
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'Failed',
  //     message: 'Invalid ID',
  //   });
  // }
  // res.status(200).json({
  //   status: 'Success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated Tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};
