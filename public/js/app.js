// This app.js file is client side JavaScript which is going to run in the browser (inserted as a script to index.hbs).
// The goal inside of here is to be fetch the forecast information.
// Getting the forecast data inside of our client side JavaScript. To actually make an HTTP request from client side JavaScript.

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      // This function is going to run when the JSON data has arrived and been parsed. We have access to the parsed data (a JavaScript Object) as the first and only argument.
      console.log(data);
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
