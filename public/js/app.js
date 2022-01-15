const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // the default behaviour of forms is to completely reload the page on submit (refresh the browser)

    messageOne.textContent = "Loading forecast...";
    messageTwo.textContent = "";

    const location = search.value;

    fetch(`/weather?address=${location}`)
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
