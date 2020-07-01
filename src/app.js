const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location.
app.set('view engine', 'hbs'); // set() method allows us to set a value for a given Express setting. It takes in a setting name and a value we want to set for the setting. In our case, to set up a view engine to use the module that we installed which is hbs.
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); // registerPartials() takes a path to the directory where our partials live

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // use() is a way to customize our server.

app.get('', (req, res) => {
  res.render('index', {
    // render() method allow us to render one of our views. We need to provide the name of the particular view we want to use as the first argument
    title: 'Weather',
    name: 'Saraluk Kaiwansakul',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Saraluk Kaiwansakul',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'How can we help?',
    name: 'Saraluk Kaiwansakul',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    // Run this code if the search term is not provided.
    return res.send({ error: 'You must provide a search term' }); // return the response right away so the function won't continue running the rest of the code. We want to return right away because later in the function, we have another res.send(). We can only send response back once, if we do send twice, it will cause an error.
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// Set up 404 page handler
app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: '404 Page',
    name: 'Saraluk Kaiwansakul',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    title: '404 Page',
    name: 'Saraluk Kaiwansakul',
  });
});

// Start up the web server
app.listen(3000, () => {
  console.log('Server us up on port 3000');
});
