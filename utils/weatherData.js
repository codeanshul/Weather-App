// const { add } = require('nodemon/lib/rules');
const request = require('request');
const constants = require('../config');
 
const weatherData = (address,callback) =>{

    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    console.log(url);
    request({url,json:true},(error,{body})=>{
        console.log(body);
        if(error)
        {
            callback('Cant fetch weather data');
        }
        else if(!body.main || !body.main.temp || !body.name || !body.weather)
        {
            callback("Unable to find the required data",undefined);
        }
        else
        {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
    // request({url,json:true})
}

module.exports=weatherData;