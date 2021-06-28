const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const table = document.querySelector('#tab-1')
const img1 = document.querySelector('#img1')

msgOne.textContent= ''

weatherform.addEventListener('submit', (event) =>{
    event.preventDefault()
    msgOne.textContent= 'Loading...'
    img1.src =""
    const location = search.value 
    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location)
    
    for(var i = table.rows.length; i > 0;i--){
        table.deleteRow(i -1);
    }

    fetch(url).then((response) => {
    response.json().then((res) => {
        if(res.error == undefined){
            if(res.data.weather[0].main == 'Clear')
            img1.src = "sunny-icon.jpg"
            else if(res.data.weather[0].main == 'Clouds')
            img1.src ="rainy.jpg"
            else if(res.data.weather[0].main == 'Haze')
            img1.src = "haze.png"
        msgOne.textContent = location.toUpperCase() + ":\n" + String(res.data.weather[0].main)
        
        Object.keys(res.data.main).forEach(key => {
        var row = table.insertRow()
        const attribute = row.insertCell(0) 
        const value  = row.insertCell(1)
        attribute.innerHTML = key
        value.innerHTML = String(res.data.main[key])
        })
    }
    else{
        msgOne.textContent = res.error.toUpperCase()
    }
})
})
}) 
