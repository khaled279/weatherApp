
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
const sideBar = document.getElementById('sideBar') ; 
const  docFragment = document.createDocumentFragment();


let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let zip ; 
let feel ; 
getWeather.onclick= ()=>{
    zip = zipCodeInput.value ; 
    feel = feelInput.value ; 
    if(zip.length===0 || feel.length===0) return  ; 
    makeApiCalls();

    return  false;  
} ; 

function makeApiCalls(){
    getWeatherRequest();    
}

async function getWeatherRequest(){
  
    try{
    let res =  await fetch(`${baseUrl}${zip}&appid=${apiKey}`).then(postResponse).then(fetchAppData); 
}
    catch(error ){
        alert("Please enter a valid zip code!");
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
    let lastEntry = await jsonRes.pop()
    dateField.innerHTML = `Date: ${lastEntry.date}` 
    tempField.innerHTML = `Temprature: ${lastEntry.temp}` 
    contentField.innerHTML = `you said  ${lastEntry.content} about the weather` 
    sideBar.innerHTML = `<h2>Previous Entries</h2>`
        for(entry of jsonRes){
        const newDiv = document.createElement('div'); 
        newDiv.classList.add('roundedBackground');
        newDiv.innerHTML = `<div> Entered at: ${entry.date}</div>
                            <div> temp: ${entry.temp}</div>
                            <div> you felt: ${entry.content}</div>
        `
        docFragment.appendChild(newDiv) ; 
    }
    sideBar.appendChild(docFragment) ; 
}
