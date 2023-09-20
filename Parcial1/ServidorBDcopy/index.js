const express=require('express');

const morgan=require('morgan');
const fs=require('fs');
const path=require('path');
const mysql=require('mysql');

const app=express();

var accessLogStream=fs.createWriteStream(path.join(__dirname,"access.log"),{flags: 'a'})
app.use(morgan('combined',{stream:accessLogStream}));

    
app.get("/aplicacion_musica",(req,res)=>{
    var connection=mysql.createConnection({
        
    })
    res.jsonp("Servidor Express constentando a peticion GET");
});

app.get("/aplicacion_musica")