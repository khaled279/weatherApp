
const getWeather = document.getElementById('get-weather') ; 
const zipCodeInput = document.getElementById('zip') ;
const feelInput = document.getElementById('feel');
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip="; 
const apiKey = "e005dc37ccb13c00d6f3abac73b64bd1&units=imperial" ; 
const postWeatherApi = "/post/weather/entry"; 
const getAppDataEndPoint = "/all" ; 
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let zip ; 
let feel ; 
const countryCode = "ar"; 
getWeather.onclick= ()=>{
    zip = zipCodeInput.value ; 
    feel = feelInput.value ; 
    makeApiCalls(); 
} ; 

function makeApiCalls(){
    getWeatherRequest();    
}

async function getWeatherRequest(){
   try{
    let res =  await fetch(`${baseUrl}${zip}&appid=${apiKey}`).then(postResponse).then(fetchAppData); 
}
    catch(error ){
        console.log(error) ; 
    }
}

async function postResponse(res){
    let jsonRes = await res.json() ; 
   
    const postData = {
        temp: jsonRes.main.temp , 
        userFeel : feel , 
        date: newDate 
    }
    let postRes = await fetch(postWeatherApi, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-type' : 'application/json'
        },
        body : JSON.stringify(postData)
    })
    return ; 

}

async function  fetchAppData(){
    let appDataRes = await fetch(getAppDataEndPoint) ; 
    console.log(await appDataRes.json()) ; 
}
