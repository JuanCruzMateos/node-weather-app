// console.log("client side js file is loaded...");

// 
// Goal: Fetch the weather!
// 
// 1. Setpu a call to fetch to fetch weather from Boston
// 2. GEt the parse JSON response
//      - If error propery, print error
//      - If no error propery, print location and forecast
// 3. Refresh the browser and test your work
// 

// Solution:
// fetch('http://localhost:3000/weather?address=!')
//     .then(response => response.json())
//     .then(data => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.location, data.forecast);
//         }
//     });

// 
// Goal: Use input value to get weather
// 
// 1. Migrate fetch call into the submit callback
// 2. Use the search text as the address query string value
// 3. Submit the form with a valir and invalid value to test
//


//
// Goal: Render content to paragraph
//
// 1. Select the second message p from JavaScript
// 2. Just before fetch, render loading message and empty p
// 3. If error, render error
// 4. If no error, render location and forecast
// 5. Test your work! Seach for errors and for valid locations
// 

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // the default behaviour of forms is to completely reload the page on submit (refresh the browser)

    messageOne.textContent = "Loading forecast...";
    messageTwo.textContent = "";

    const location = search.value;

    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
});