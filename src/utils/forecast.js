const request = require('request')

const forecast = (lattitude,longitude, callback)=>{

    const url = 'https://api.darksky.net/forecast/9bbff7661aebce95e5d1e6b5e4e04eb8/'+lattitude+','+longitude


    request({url : url, json: true}, (error, response)=> {

        if(error){
         callback("unable to connect to weather service!",undefined)
        }else if(response.body.error === 0)
        {
            callback("unable to find location try another search!",undefined)
        }else{
            const data = response.body.currently
           
            console.log(data)
            const degree = data.temperature;
            const perception = data.precipProbability;
            
           const str = response.body.daily.data[0].summary+ " It's currently "+degree+" degrees out. There is "+ perception  +"% chance of rain."
           //console.log(str)
       callback(undefined, str)
         //console.log(lattitude , longitude)
        }
   })
   }
  
   module.exports = forecast