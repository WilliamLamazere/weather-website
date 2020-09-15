const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=26783e67e0990a3ea804d7edded637ac&query=' + lat + ',' + long
    request({ url: url, json: true }, (error, response) => { 
        if (error) {
            callback('Unable to connect to location services!', undefined) } 
        else if (response.body.error) {
            callback('Unable to find location. Try another search.',undefined)
    }   else {
            callback(undefined, response.body.current.weather_descriptions + ' weather with ' + response.body.current.precip + '% chance of rain. The temperature is ' + response.body.current.temperature + ' degrees outside.') 
            }
        }) 

    }


module.exports = forecast