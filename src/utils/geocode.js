const request = require('request')

const geocode = (address , callback) => {
    const url = 'https://geocode.maps.co/search?q= '+ encodeURIComponent(address) +'&api_key=6597eda845c1c101889907nkzf13418'

    request({url , json : true}, (error,{body}) => {

        if(error){
            callback('Unable to connect to location services !' , undefined)
        }
        else if (body.length === 0 ){
            callback('Unable to find location. Try another search' , undefined)
        }
        else{
            callback(undefined , {
                latitude : body[0].lon,
                lontitude : body[0].lat,
                location : body[0].display_name
            })
        }
    })
}

module.exports = geocode