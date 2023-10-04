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

app.use(express.json());

app.post("/artistas", checkSchema({
    'id_Artista': {isl}
}))


