const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port =  process.env.PORT || 3000 

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const parialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(parialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('' ,  (req, res) => {
    res.render('index', {
        title : "Weather App",
        name : 'Nikul Chauhan'

    })
})

app.get('/about' ,  (req, res) => {
    res.render('about', {
        title : "About Me",
        name : 'Nikul Chauhan'

    })
})


app.get('/help' ,  (req, res) => {
    res.render('help', {
        helpText : "This is some help text",
        title : "Help",
        name : 'Nikul Chauhan'
       

    })
})


app.get('/weather', (req,res) => {

    if(!req.query.address)
    {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode( req.query.address, (error, { lattitude, longitude, location }={} ) => {

        if(error)
        {
            res.send( { error} )
        }

        forecast(lattitude, longitude, (error, forecastData) => {
            if(error)
            {
                res.send( { error} )
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
           
          })
    })


  
} )

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage : "Page not found",
        title : "404",
        name : 'Nikul Chauhan'
       

    })
})


app.get('*', (req, res) => {
    res.render('404', {
        errorMessage : "404 Page not found",
        title : "404",
        name : 'Nikul Chauhan'
       

    })
})

app.listen(port, () => {
 console.log("Server is running on port "+ port)
})