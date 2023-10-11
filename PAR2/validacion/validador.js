// const express =require('express');
// const { check } = require('express-validator');
// const app =express();

// app.post("/artistas",check('apellido').is(), (req, res)=>{
//     const result=validationResult(req);
//     if(result.isEmpty()){
//         console.log(req.body);
//         res.json({mensaje: "Respuesta a peticion post"});
//     }else{
//         res.json(result);
//     }
// });

// app.listen(8081,()=>{
//     console.log("Servidor express escuchando 8081")
// });


const express = require('express');
const { check, validationResult } = require('express-validator');
const app = express();

app.use(express.json()); // Middleware para procesar datos JSON en las solicitudes

app.post("/artistas", [
    check('id_artista').isNumeric(),
    
    // Agrega más validaciones según tus requisitos
], (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        console.log(req.body);
        res.json({ mensaje: "Respuesta a petición POST exitosa" });
    } else {
        res.json(result);
    }
});

app.listen(8081, () => {
    console.log("Servidor express escuchando en el puerto 8081");
});

app.get("/", (req, res, next) => {
    try {
      throw new Error('Se ha producido un error en esta ruta.');
    } catch (error) {
      next(error);
    }
  });  

  app.use((err, req, res, next) => {
    res.status(500).send({
      error: 'Se ha producido un error en la aplicación.',
      message: err.message
    });
  });

