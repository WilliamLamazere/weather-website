require('dotenv').config()


const geocode = async (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + process.env.MAPBOX_TOKEN
    try {
        const response = await fetch(url)
        const data = await response.json()
        if (!data.features || data.features.length === 0) {
            return callback('Unable to find location.', undefined)
        }
        callback(undefined, {
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0],
            location: data.features[0].place_name
        })
    } catch (error) {
        callback('Unable to connect to location services!', undefined)
    }
}


module.exports = geocode