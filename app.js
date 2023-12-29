//Imported all the modules from express
const express = require('express');
const fs = require('fs');

//Now app will be able to use epxress methods;
const app = express();

//This is middleware, Which parses the req and response
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//To Fetch the whole tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// To fetch specific tours by ID
app.get('/api/v1/tours/:id', (req, res) => {
  //This is a trick and it will convert the string to a integer
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
});


// To post a new Tour in the data
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  //Object.assign(Target, Source) -> Assign req.body to this id
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

//Here we have created a port
const port = 3000;

//Listen function is like a switch that turn on the server for req and res
app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});
