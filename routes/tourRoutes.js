const express = require('express');
// eslint-disable-next-line import/newline-after-import
const tourController = require('../controllers/tourController');
const router = express.Router();

// router.param('id',tourController.checkID)

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
