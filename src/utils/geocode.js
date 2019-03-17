const request = require('request');

const geocode =(address, callback)=>{
    const url = `http://api.apixu.com/v1/current.json?key=${process.env.APIXU_KEY}&q=${address}`;
    request({url: url, json: true}, (error, response, body)=>{
        if(error){
            callback({error:'Unable to connect to apixu servers'});
        } else if(body.error){
            callback({error:body.error.message});
        } else if(body.location){
            const lat = body.location.lat;
            const lon = body.location.lon;
            const name = body.location.name;
            const country = body.location.country;
            callback(undefined, {lat, lon, name, country});
        }

    });
};

module.exports = geocode;