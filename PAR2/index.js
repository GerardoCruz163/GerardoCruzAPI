const express=require('express');
const morgan=require('morgan');
const fs=require('fs');
const path=require('path');
const mysql=require('mysql2/promise');
const app=express();
const expressBasicAuth = require('express-basic-auth')
const bodyParser = require('body-parser');


var accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags: 'a'})
app.use(morgan('combined',{stream:accessLogStream}));
app.use(express.json());

app.use(expressBasicAuth({
    users:{"admin":"12345"}
}))

app.use(bodyParser.urlencoded({extended:true}));
app.post('/artistas',(req, res)=>{
    const{nombre, apellido}=req.body;
    res.json(req.body);
});

app.get("/artistas",async(req,res)=>{
    try{
        // const conn= await mysql.createConnection({host: 'localhost',user:'root',password:'Jerry200120172020',database:'aplicacion_musica'})
        // const [rows,fields] = await conn.query('SELECT * from artistas');
        // res.json(rows);
        console.log("Login exitoso")
        res.send("Login exitoso")
    }catch(err){
        res.status(500).json({mensaje:error.sqlMessage});
    }
});

app.get("/artistas/:id", async(req,res)=>{
    console.log(req.params.id);
    const conn = await mysql.createConnection({host:'localhost',user:'root',password:'Jerry200120172020',database:'aplicacion_musica'});
    const [rows, fields]=await conn.query('SELECT * from Artistas where id_Artista='+req.params.id);
    if(rows.length==0){
        res.status(404).json({mensaje:"Artista inexistente"});
    }else{
        res.json(rows);
    }
});

app.delete("/artistas",async(req,res)=>{
    const sentencia = `DELETE from artistas where id_Artista=${req.query.id_Artista}`;
    try{
        const conn= await mysql.createConnection({host:'localhost',user:'root',password:'Jerry200120172020',database:'aplicacion_musica'});
        const [rows,fields] = await conn.query(sentencia);
        res.json(rows);

        if(rows.affectedRows==0){
            res.json({mensaje:"Registro no Eliminado"});
        }else{
            res.json({mensaje: "Registro Eliminado"});
        }
    }catch(err){
        res.status(500).json({mensaje:"Error"});
    }
});

app.put("/artistas/:id", async (req, res) => {

    try {

       const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: 'Jerry200120172020', database: 'aplicacion_musica' });

          const { nombre, apellido, fecha_nacimiento,acerca_de,pais } = req.body;

          await conn.query('UPDATE Artistas SET nombre = ?, apellido = ?, fecha_nacimiento = ?, acerca_de=?,pais=? WHERE id_Artista = ?', [nombre, apellido, fecha_nacimiento,acerca_de,pais, req.params.id]);

          res.json({ mensaje: "Artista actualizado exitosamente" });

    } catch (err) {

       res.status(500).json({ mensaje: err.sqlMessage });

    }

 });

app.listen(8081,(req,res)=>{
    console.log("server express escuchando en el puerto 8081");
});