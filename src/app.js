const express = require('express')
const path = require('path')
const hbs = require('hbs')
const weather_info = require('./weather_info.js')

//setting application of express
const app = express()

//recieve port value provided by environment variables or keep it 3000 for local host
const port = process.env.PORT || 3000

//store file directories to link our app to them
const staticDataDirectory = path.join(__dirname, '../staticdata')
const hbsfilesDirectory = path.join(__dirname, '../templates/hbsfiles')

//for partials directories
const partialDirectory = path.join(__dirname, '../templates/partial')

//setting app to view for hbs files
app.set('view engine','hbs')

// setting app to view hbs files in given directory (generalising search-window)
app.set('views',hbsfilesDirectory)

// loading static files like css,js,html etc
app.use(express.static(staticDataDirectory))

// registering partialfiles of hbs exe
hbs.registerPartials(partialDirectory)

//setting main routes
app.get('/', (req,res) =>{
    res.render('index')
})

// setting about page route
app.get('/about', (req, res) => {
    res.render('about')
})

// setting help page route
app.get('/help', (req, res) =>{
    res.render('help')
})

app.get('/weather', (req, res) =>{
    const address = req.query.address //taking the address query entered by client
    //if address is empty display msg
    if(!address){
        return res.send({
            error: 'plz enter location'
        })
    }
    // calling weather api for given address
    weather_info.weather_info(address, (error, data)  =>{
        if(error)
        return res.send({error})
        return res.send({data})
    })
})
app.get('/index', (req,res)=>{
    res.render('index')
})

// setting error pages routes
app.get('/help/*', (req,res)=>{
    res.render('error', {
        title : 'help page not found'
    })

})
app.get('*', (req, res) =>{
    res.render('error')
})
//setting the port
app.listen(port, () => {
    console.log("kudos!...app is up and running at" + port)
})