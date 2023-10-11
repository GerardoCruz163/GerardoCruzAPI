const validation =require("./middleware/joiValidacion")
const {registroSchema}=require("./schemas/registro")
const express =require('express');
const app=express();

//capturar datos
app.use(express.join());

//middleware
app.use(express.urlencoded({extended: false}));

//altas
app.post("/artistas", validation(registroSchema),(req,res)=>{
    const{nombre, apellido, acerca_de}=req.body;
    res.send(`nombre:${nombre},apellido:${apellido}, acerca_de:${acerca_de}`);
});

app.listen(8081,()=>{
    console.log("Servidor express escuchando en el puerto 8081");
});
