const app = require('./app')

//Here we have created a port
const port = 3000;

//Listen function is like a switch that turn on the server for req and res
app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});