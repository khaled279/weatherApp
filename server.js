const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const { sendStatus } = require('express/lib/response');
const { SocketAddress } = require('net');
const cors = require('cors');

// used and Array instead of an object to keep history and use it for sidebar 
const projectData = [] ; 
app.use(bodyParser.urlencoded({extended:false}));

// body parser type json  wraps all sent response in json format
app.use(bodyParser.json()); 


app.use(cors()) ;

//defining the static resources of the website
app.use(express.static('website')); 

//initiate server at port 8080 port can be changed by changing the value of port and reintializing the server
const port = 8080; 
app.listen(port, ()=>{
   console.log(`server is up and running on port ${port}`);  

}); 

//get end point at url /all sends the array to the client side 
app.get('/all', (req, res)=>{
   res.send(projectData) ; 
   console.log("sent",projectData) ; 
});


//post endpoint with url /post/.... and callback function that saves the recieved object to projectData and 
// sends a status 200 to make sure the client side is not stuck waiting for response
app.post('/post/weather/entry', (req, res)=>{
    projectData.push(req.body); 
    res.sendStatus(200);
    console.log("recieved",req.body) ; 
}); 
