const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

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

app.get('*', (req, res)=>{
    res.render('notfound',{
        title: "404",
        errorMessage: "Page not found",
        name: 'Baris Cetinturk'
    });
});

app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
});