const request = require('request')

const geocode = (address, callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmlrczA5IiwiYSI6ImNrNWpqbGU1dDAzcWszZW8wa25mYzU5eWMifQ.C9cm5Hu5Xb0pR7QXb5aF2A'

    request({url : url, json: true}, (error, response)=> {

        if(error){
         callback("unable to connect to weather service!",undefined)
        }else if(response.body.features.length === 0)
        {
            callback("unable to find location try another search!",undefined)
        }else{
         const lattitude = response.body.features[0].center[1]
         const longitude = response.body.features[0].center[0]
         const location = response.body.features[0].place_name
       callback(undefined, {
           lattitude: lattitude,
           longitude: longitude,
           location: location

       })
        // console.log(lattitude , longitude)
        }
   })
   }
  
   module.exports = geocode