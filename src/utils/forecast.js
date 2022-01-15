const request = require('request');
const { WEATHERSTACK_ACCESSKEY } = require('./privateKeys')

/**
 * Get forecast from coordinates
 * @param {Number} longitude 
 * @param {Number} latitude 
 * @param {Function} callback (error, forecastData {.description, .temperature, .feelslike})
 */
const forecast = (latitude, longitude, callback) => {
    const weatherStackURL = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_ACCESSKEY}&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;

    request({ url: weatherStackURL, json: true }, (error, { body }) => {
        if (error) { // null if no error occured -> evaluates to false
            callback({ message: "Unable to connect to weather service! " + error.message }, undefined);
        } else if (body.error) { // undefined if no server error ocurred -> evaluates to false
            callback({ message: "Error: Unable to find location.", type: body.error.type, info: body.error.info }, undefined);
        } else {
            const { weather_descriptions, temperature, feelslike } = body.current;
            callback(undefined, { description: weather_descriptions[0], temperature, feelslike });
        }
    });
}

module.exports = {
    forecast
}