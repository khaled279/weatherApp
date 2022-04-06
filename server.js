const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const { sendStatus } = require('express/lib/response');
const { SocketAddress } = require('net');
const projectData = [{
    temp: 35 , 
    date: '1/4/2022', 
    userRes: "it's nice in Here"
}] ; 
app.use(bodyParser.urlencoded({extended:false})); 
app.use(bodyParser.json()); 

app.use(express.static('website')); 

const port = 8080; 
app.listen(port, ()=>{
   console.log(`server is up and running on port ${port}`);  

}); 

app.get('/all', (req, res)=>{
   res.send(projectData) ; 
   console.log("sent",projectData) ; 
});

app.post('/post/weather/entry', (req, res)=>{
    projectData.push(req.body); 
    res.sendStatus(200);
    console.log("recieved",req.body) ; 
}); 
