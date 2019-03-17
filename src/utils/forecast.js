const request = require('request');

const forecast = (lat, lon, callback)=>{
    const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${lat},${lon}`;
    request({url: url, json: true}, (error, response, body)=>{
        if(error){
            callback({error:'Unable to connect to darksky servers'});
        } else if(body.error){
            callback({error:body.error});
        } else {
            const temperature = body.currently.temperature;
            const summary = body.currently.summary;
            const humidity = body.currently.humidity;

            callback(undefined, {temperature, summary, humidity});
        }
    });
};

module.exports = forecast;