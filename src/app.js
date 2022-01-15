const express = require('express');
const path = require('path');
const hbs = require('hbs');

const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');

const app = express();
const PORT = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location, and partials
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.render("index", { title: "Weather", name: "Juan Cruz Mateos" });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About Me", name: "Juan Cruz Mateos" });
});

app.get("/help", (req, res) => {
    res.render("help", { title: "Help", message: "How can I help you?", name: " Juan Cruz Mateos" });
});

app.get("/help/*", (req, res) => {
    res.render("404", { title: "404", errorMessage: "Help article not found", name: "Juan Cruz Mateos" });
});

app.get("/weather", (req, res) => {
    if (!req.query || !req.query.address) {
        return res.send({
            error: "You must provide an address"
        });
    }
    // @ts-ignore :: for the default = {}
    geocode(req.query.address.toString(), (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error.message });
        }
        // @ts-ignore :: for the default = {}
        forecast(latitude, longitude, (error, { description, temperature, feelslike } = {}) => {
            if (error) {
                return res.send({ error: `${error.message}, ${error.type}, ${error.info}` });
            }
            res.send({ location, forecast: `${description}. It is ${temperature}°C, but it feels like ${feelslike}°C.`, address: req.query.address });
        })
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get("*", (req, res) => {
    res.render("404", { title: "404", errorMessage: "Page not found", name: "Juan Cruz Mateos" });
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
