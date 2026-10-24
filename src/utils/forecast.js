const forecast = async (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHERSTACK_API_KEY + '&query=' + lat + ',' + long
    try {
        const response = await fetch(url)
        const data = await response.json()
        if (data.error) {
            return callback('Unable to find location. Try another search.', undefined)
        }
        callback(undefined, data.current.weather_descriptions + ' weather with ' + data.current.precip + '% chance of rain. The temperature is ' + data.current.temperature + ' degrees outside. The wind is coming from ' + data.current.wind_dir + ' with ' + data.current.wind_speed + ' knts.')
    } catch (error) {
        callback('Unable to connect to location services!', undefined)
    }
}


module.exports = forecast