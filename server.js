const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exceptions');
  console.log(err.name, err.message);
  process.exit(1);
});

//Here we have created a port
const port = 3000;

//Listen function is like a switch that turn on the server for req and res
const server = app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
