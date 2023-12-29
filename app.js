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

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

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
