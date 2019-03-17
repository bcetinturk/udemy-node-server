const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.set('x-powered-by', false);

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Baris Cetinturk'
    });
});

app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Baris Cetinturk'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Baris Cetinturk'
    });
});

app.get('/help/*', (req, res)=>{
    res.render('notfound', {
        title: "404",
        message: "Help article not found",
        name: 'Baris Cetinturk'
    });
});

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (errorMsg, {lat, lon, name, country}={})=>{
        if(errorMsg){
            return res.send(errorMsg);
        }
        forecast(lat, lon, (errorMsg, {temperature, summary, humidity}={})=>{
            if(errorMsg){
                return res.send(errorMsg);
            }
            res.send({name, country, temperature, summary, humidity});

        })

    });


});

app.get('*', (req, res)=>{
    res.render('notfound',{
        title: "404",
        errorMessage: "Page not found",
        name: 'Baris Cetinturk'
    });
});

app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
});