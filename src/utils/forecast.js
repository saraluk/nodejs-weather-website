const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=457e985df6ae9cd383f31aa9e0f0a63b&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        forecast: `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`,
        icons: body.current.weather_icons[0],
      });
    }
  });
};

module.exports = forecast;

// const url =
//   'http://api.weatherstack.com/current?access_key=457e985df6ae9cd383f31aa9e0f0a63b&query=37.8267,-122.4233&units=f';

// // The request() function is the function to make a request takes in 2 arguments;
// // First : The options object which outlines what we'd like to do, that's where we provide the URL and other information.
// // We also can sets json to true in options object which is going to have the request module automatically parse JSON response for us.
// // Second : The function to run once we actually have that response.
// request({ url: url, json: true }, (error, response) => {
//   // Handling low lovel OS error.
//   if (error) {
//     console.log('Unable to connect to weather service!');
//     // Handling invalid inputs that are used when making a request.
//   } else if (response.body.error) {
//     console.log('Unable to find location');
//     // Handling when there is no error
//   } else {
//     console.log(
//       `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`
//     );
//   }
// });
