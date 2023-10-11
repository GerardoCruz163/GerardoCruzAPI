const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const app = express();
var cors = require('cors');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());
app.use(cors());

// CONSULTA
app.get("/artistas/:id", async (req, res, next) => {
    try {
        console.log(req.params.id);
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'banco' });
        const [rows, fields] = await conn.query('SELECT * from artistas where id_artista=' + req.params.id);
        if (rows.length === 0) {
            let error = new Error("Usuario No existe");
            error.status = 404; // Cambiado el código de estado a 404 Not Found
            throw error;
        } else {
            res.json(rows);
        }
    } catch (err) {
        next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});

// ALTA
app.post("/artistas", async (req, res, next) => {
    try {
        const { nombre, apellido, fecha_nacimiento, acerca_de, pais } = req.body; // Desestructurar correctamente el cuerpo de la solicitud
        const conn = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'aplicacion_musica' });
        await conn.query('INSERT INTO artistas (nombre, apellido, fecha_nacimiento, acerca_de, pais) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, fecha_nacimiento, acerca_de, pais]); // Cambiado el nombre de la tabla a 'artistas'
        res.json({ mensaje: "Artista creado exitosamente" });
    } catch (err) {
        next(err); // Pasar el error al siguiente middleware de manejo de errores
    }
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ mensaje: err.message || "Error interno del servidor" });
});

app.listen(8081, () => {
    console.log("Servidor express escuchando en el puerto 8081");
});
