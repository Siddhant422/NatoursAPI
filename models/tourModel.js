const mongoose = require('mongoose');
// Here we have created a schema of the database
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

//Here we will create a database called tour
//Which will follow schema of tourSchema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
