import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { sql, connectToDatabase } from "./BaseDeDatos.js";

const app = express(); // Crear una instancia de Express
app.use(express.json()); // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios HTML
app.use(cors()); // Habilitar CORS para permitir solicitudes desde el frontend

connectToDatabase();

//REGISTRO

app.post("/api/registro", async (req, res) => {
    const { Usuario, Nombre, Apellido, Mail, Pass } = req.body
    try {
        const hashedPassword = await bcrypt.hash(Pass, 10);
        await sql.query`
            INSERT INTO Usuarios (Usuario, Nombre, Apellido, Mail, Pass) 
            VALUES (${Usuario}, ${Nombre}, ${Apellido}, ${Mail}, ${hashedPassword})
        `
        res.json({ ok: true, mensaje: "Usuario registrado correctamente" })
    } catch (err) {
        console.error("No se pudo registrar al usuario:", err)
        res.status(500).json({ ok: false, mensaje: "Error al registrar" })
    }
})

const PORT = 3001; // Puerto en el que el servidor escuchará las solicitudes
app.listen(PORT, () => { // Iniciar el servidor y escuchar en el puerto especificado
  console.log(`Servidor escuchando en el puerto ${PORT}`); // Imprimir un mensaje en la consola para indicar que el servidor está funcionando
});