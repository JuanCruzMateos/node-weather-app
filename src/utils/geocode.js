const request = require('request');
const { MAPBOX_ACCESSKEY } = require('./privateKeys')

/**
 * Get location, latitude and longitud from address
 * @param {String} address 
 * @param {Function} callback (error, locationData{.location, .longitude, .latitude})
 */
const geocode = (address, callback) => {
    const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + encodeURIComponent(address) + `.json?access_token=${MAPBOX_ACCESSKEY}&limit=1`;

    request({ url: mapboxURL, json: true }, (error, { body }) => {
        if (error) {
            // null or undefined (or no parameter passed at all -> translates to undefined)
            callback({ message: "Unable to connect to location service! " + error.message }, undefined);
        } else if (body.message) {
            callback({ message: "API error ocurred" + body.message }, undefined);
        } else if (body.features.length === 0) {
            callback({ message: "No results found, try another search." }, undefined);
        } else {
            const { place_name: location } = body.features[0];
            const [longitude, latitude] = body.features[0].center;
            callback(undefined, { location, longitude, latitude });
        }
    });
}

module.exports = {
    geocode
}