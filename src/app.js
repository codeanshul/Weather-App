const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();


const weatherData = require('../utils/weatherData')
const port = process.env.PORT || 3000;

const publicStaticDirPath = path.join(__dirname,'../public');

const viewspath = path.join(__dirname,'../templates/views');

const partialpath = path.join(__dirname,'../templates/partials');


app.set('view engine','hbs');
app.set('views',viewspath);
hbs.registerPartials(partialpath);
app.use(express.static(publicStaticDirPath));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App'
    });
})

app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if(!address)
    {
        return res.send({
            error: 'You must add a city in address box',
        })
    }
    // console.log(req.query);
    weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

app.get("*",(req,res) =>{
    res.render('404',{
        title: 'Page not Found'
    })
})
app.listen(port,()=>{
    console.log("Server is running om port",port);
})



/*
1. modify search button ->done 
2. Drop down for location search if poss
3. Write Centigrade.(f if poss)
4. Current time.
*/