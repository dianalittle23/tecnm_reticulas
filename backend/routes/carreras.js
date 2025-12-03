const express = require("express");
const router = express.Router();
const Carrera = require("../models/Carrera"); // Importa el modelo que acabamos de crear

// ----------------------------------------------------------------------
// ENDPOINT 1: OBTENER TODAS LAS CARRERAS (GET /api/carreras)
// ----------------------------------------------------------------------
router.get("/", async (req, res) => {
    console.log("Petición GET recibida para /api/carreras");
    try {
        // Busca TODAS las carreras en la base de datos
        // El .find({}) sin condiciones devuelve todos los documentos
        const carreras = await Carrera.find({});

        // Si no hay carreras, devuelve un 404
        if (carreras.length === 0) {
            return res.status(404).json({ 
                mensaje: "No se encontraron carreras.",
                datos: []
            });
        }

        // Responde con un estado 200 y la lista de carreras en formato JSON
        res.status(200).json({
            mensaje: "Carreras obtenidas exitosamente.",
            total: carreras.length,
            datos: carreras
        });

    } catch (error) {
        // Si hay algún error en la conexión o consulta, lo capturamos
        console.error("Error al obtener las carreras:", error);
        res.status(500).json({ 
            mensaje: "Error del servidor al obtener las carreras.",
            error: error.message 
        });
    }
});


// Puedes añadir más rutas aquí, como:
// router.post("/", async (req, res) => { /* Crear una carrera */ });
// router.get("/:id", async (req, res) => { /* Obtener una carrera por ID */ });


module.exports = router;
