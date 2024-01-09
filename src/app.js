const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname, '../templates/views' )
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views locations
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Victor Pono'
    })
})

app.get('/about' , (req, res) => {
    res.render('about', {
        title : 'About' ,
        name : 'Victor Pono'
    })
})

app.get('/help', (req, res) => {
    res.render('help' , {
        text: 'You dont need help :)' , 
        title : 'Help' ,
        name : 'Victor Pono'
    })
})

app.get('/weather' , (req, res) => {
    if(!req.query.address){
         return res.send({
            error: 'You must provide a search term '
        })
    }

    geocode( req.query.address , (error, {latitude , longtitude , location} = {}) => {
        if(error){
            return res.send ({ error })
        }
        forecast(latitude , longtitude , (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast : forecastData,
                location ,
                address : req.query.address
            }) 
          })
    })
})

app.get('/products' , (req , res) => {
    res.send({
        products : []
    })
})

app.get('/help*' , (req , res) => {
    res.render('404page' , {
       title : '404',
       name : 'Victor pono', 
        errorMessage: 'Help article not found.'

    })
})

app.get('*' , (req , res) => {
    res.render('404page' , {
        title : '404' , 
       name : 'Victor Pono' ,
       errorMessage : 'Page not found.'
    })
})
 
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})