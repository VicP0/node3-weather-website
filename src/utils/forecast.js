const request = require('request')

const forecast = (latitude , longtitude , callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=cb57c6e85b4ec7d9bb471780592520cc&query=' + decodeURIComponent (latitude) + ',' + decodeURIComponent (longtitude) + '&units=m'

    request ({url , json : true} , (error, {body}) => {

        if(error){
            callback('Unable to connect to weather service! ', undefined)
        }
        else if(body.error){
            callback('Unable to find location! ', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature +' degrees out. It feels like '+ body.current.feelslike)
        }
    })
}

module.exports = forecast