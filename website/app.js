
const getWeather = document.getElementById('generate') ; 
const zipCodeInput = document.getElementById('zip') ;
const feelInput = document.getElementById('feelings');
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip="; 
const apiKey = "e005dc37ccb13c00d6f3abac73b64bd1&units=imperial" ; 
const postWeatherApi = "/post/weather/entry"; 
const getAppDataEndPoint = "/all" ; 
const dateField = document.getElementById('date'); 
const tempField = document.getElementById('temp');
const contentField = document.getElementById('content');


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
        content: feel , 
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
    const jsonRes = await appDataRes.json();
    const lastEntry = await jsonRes.pop()
    dateField.innerHTML = `Date: ${lastEntry.date}` 
    tempField.innerHTML = `Temprature: ${lastEntry.temp}` 
    contentField.innerHTML = `you said  ${lastEntry.content} about the weather` 

}
