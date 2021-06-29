//taking all the attributes that are to be displayed on client screen
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const table = document.querySelector('#tab-1')
const img1 = document.querySelector('#img1')

// place a event listenser that keeps a look on event of submit to be performed
weatherform.addEventListener('submit', (event) =>{

    //as page automatically refreshed as soon as data is entered n displayed we stop this action by preventdefault()
    event.preventDefault()

    //reinitialising the attributes 
    msgOne.textContent= 'Loading...'
    img1.src ="default.gif"

    const location = search.value 
    const url = '/weather?address=' + encodeURIComponent(location)
    
    //deleting contents of table at each call
    for(var i = table.rows.length; i > 0;i--){
        table.deleteRow(i -1);
    }

    // fetch data from url then converting response to json obj file
    fetch(url).then((response) => {
    response.json().then((res) => {

        //if no error
        if(res.error == undefined){
            if(res.data.weather[0].main == 'Clear')
            img1.src = "sunny-icon.jpg"
            else if(res.data.weather[0].main == 'Clouds')
            img1.src ="rainy.jpg"
            else if(res.data.weather[0].main == 'Haze')
            img1.src = "haze.png"
            msgOne.textContent = location.toUpperCase()

            //setting attributes to table
            var row = table.insertRow()
            const attribute = row.insertCell(0) 
            const value  = row.insertCell(1)
            attribute.innerHTML = res.data.weather[0].main
            value.innerHTML = String(res.data.weather[0].description)

            //setting attributes to table
            Object.keys(res.data.main).forEach(key => {
            var row = table.insertRow()
            const attribute = row.insertCell(0) 
            const value  = row.insertCell(1)
            attribute.innerHTML = key
            value.innerHTML = String(res.data.main[key])

            })
    }
    else{
        // display error msg if any
        msgOne.textContent = res.error.toUpperCase()
    }
})
})
}) 
