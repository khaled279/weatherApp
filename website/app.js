
// cosntants has some elements and other constants 
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

//getting date 
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// zip and feel are declared with let so we can reset the value with each click
let zip ; 
let feel ; 
getWeather.onclick= ()=>{
    zip = zipCodeInput.value ; 
    feel = feelInput.value ; 
    if(zip.length===0 || feel.length===0) return  ; 
    getWeatherRequest();    

    return  false;  
} ; 

// this is the main function of the app this is like glue it holds everythingg together and uses then() function
// to determine the order of whichj the async funtions are called
async function getWeatherRequest(){
  
    try{
        //makes get request to base url then calls postResponse then fetchAppData
    let res =  await fetch(`${baseUrl}${zip}&appid=${apiKey}`).then(postResponse).then(fetchAppData); 
}
    catch(error ){
        alert("Please enter a valid zip code!");
        console.log(error) ; 
    }
}

//makes post request
async function postResponse(res){
    let jsonRes = await res.json() ; 
   
    //creates object that is populated for the data in the input fields
    const postData = {
        temp: jsonRes.main.temp , 
        content: feel , 
        date: newDate 
    }
    //makes the post request to postWeatherApi and sends the object in it 
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

// makes a get request to /all
async function  fetchAppData(){
    let appDataRes = await fetch(getAppDataEndPoint) ; 
    const jsonRes = await appDataRes.json();
    // pop last element in the last object in projectData as this is the latest entry and 
    let lastEntry = await jsonRes.pop()
    //updates UI with the data in the object last Entry 
    dateField.innerHTML = `Date: ${lastEntry.date}` 
    tempField.innerHTML = `Temprature: ${lastEntry.temp}` 
    contentField.innerHTML = `you said  ${lastEntry.content} about the weather` 
    // reset side bar so it can be populated with new data from the get request 
    // here we deal with the rest of the projectData array we populate the sidebar with it 
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
