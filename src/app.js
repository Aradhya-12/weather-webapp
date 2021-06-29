const express = require('express')
const path = require('path')
const hbs = require('hbs')
const weather_info = require('./weather_info.js')

const app = express()
const port = process.env.PORT || 3000

const staticDataDirectory = path.join(__dirname, '../staticdata')
const hbsfilesDirectory = path.join(__dirname, '../templates/hbsfiles')
const partialDirectory = path.join(__dirname, '../templates/partial')

app.set('view engine','hbs')
app.set('views',hbsfilesDirectory)
app.use(express.static(staticDataDirectory))
hbs.registerPartials(partialDirectory)
app.get('', (req,res) =>{
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/help', (req, res) =>{
    res.render('help')
})

app.get('/weather', (req, res) =>{
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'plz enter location'
        })
    }
    weather_info.weather_info(address, (error, data)  =>{
        if(error)
        return res.send({error})
        return res.send({data})
    })
})
app.get('/index', (req,res)=>{
    res.render('index')
})
app.get('/help/*', (req,res)=>{
    res.render('error', {
        title : 'help page not found'
    })

})
app.get('*', (req, res) =>{
    res.render('error')
})
app.listen(port, () => {
    console.log("kudos!...app is up and running at" + port)
})