const request = require('request')

//getting forecast by city name
const weather_info = (city_name , callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(city_name) + '&APPID=0cf7e5311ea8a8e76e2a8bdb402e788a&units=metric'
    request({ url : url, json : true},(error,{body}) =>{
        if(error){
            callback("Poor Connection :(",undefined)
        }
        else if(body.message){
            callback(body.message , undefined)
        }
        else{
            callback(undefined , body)
        }
    
    }) 
}

//getting forecast by lattitudes and longitudes 
const weather_info_by_coordinates = (lat , lon , callback) =>{
    const url='https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(lon) + '&appid=0cf7e5311ea8a8e76e2a8bdb402e788a'
    request({ url : url, json : true},(error,{body}) =>{
        if(error){
            callback("Poor Connection :(",undefined)
        }
        else if(body.message){
            callback(body.message , undefined)
        }
        else{
            callback(undefined , (body))
        }
    
    })  
}
module.exports = {
     weather_info, //object shorthand_technique
     weather_info_by_coordinates
}