const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

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
          forecast: forecastData.forecast,
          location: location,
          address: req.query.address,
          icon: forecastData.icons,
        });
      });
    }
  );
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
app.listen(port, () => {
  console.log(`Server us up on port ${port}`);
});
