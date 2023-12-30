//Imported all the modules from express
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

//Now app will be able to use epxress methods;
const app = express();

//1) MIDDLEWARE
app.use(morgan('dev'));

app.use(express.json());
app.use((req, res, next) => {
  console.log('Hello from the middleWare');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route Handlers
const createTour = (req, res) => {
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
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated Tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'Success',
    data: null,
  });
};

// //To Fetch the whole tours
// app.get('/api/v1/tours', getAllTours);

// // To fetch specific tours by ID
// app.get('/api/v1/tours/:id', getTour);

// // To post a new Tour in the data
// app.post('/api/v1/tours', createTour);

// // Handling Patch request
// app.patch('/api/v1/tours/:id', updateTour);

// //Delete Tour
// app.delete('/api/v1/tours/:id', deleteTour);

// Routes
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

//Here we have created a port
const port = 3000;

//Listen function is like a switch that turn on the server for req and res
app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});
