//modulo npm i express
const express=require('express');
const https = require('https');
const app=express();
const fs = require('fs');
const path = require('path');

app.use(express.json());

const opciones = {
    key: fs.readFileSync(path.join(__dirname,"SSL/key.pem")),
    cert: fs.readFileSync(path.join(__dirname,"SSL/cert.pem"))
}

app.get("/artistas",(req,res)=>{
    res.send("Servidor Express contestando a peticion GET");
});
app.post("/artistas",(req,res)=>{
    res.send("Servidor Express contestando a peticion POST");
});

https.createServer(opciones,app).listen(8081,function(){
    console.log("Servidor Expres Seguro en puerto 8081")
})

