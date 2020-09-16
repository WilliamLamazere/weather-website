const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000 // will use the one that exist

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Courtois'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Courtois'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Courtois'
    })
})

app.get('/weather', (req,res) => {
    
    if(!req.query.address) {
        return res.send({
            error:'please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({
                error:error
            })
        }
    
        forecast(latitude,longitude, (error,forecastData) => {
            if (error) {
                return res.send({
                    error:error
                })
            }
            
            res.send({
                address:req.query.address,
                forecast: forecastData,
                location
            })            
        })
    
    })
    }
)

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'404',
        name:'Courtois',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title:'404',
        name:'Courtois',
        errorMessage:'Page not found'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})