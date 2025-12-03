const express = require("express");
const router = express.Router();
const Materia = require("../models/Materia"); // Importa el modelo Materia
const Carrera = require("../models/Carrera"); // Necesario para validar la ID de Carrera

// ----------------------------------------------------------------------
// ENDPOINT 1: CREAR UNA NUEVA MATERIA (POST /api/materias)
// ----------------------------------------------------------------------
router.post("/", async (req, res) => {
    console.log("Petición POST recibida para /api/materias con datos:", req.body);
    
    const nuevaMateria = req.body;

    try {
        // 1. VALIDACIÓN: Verificar que el idCarrera proporcionado exista
        const carreraExistente = await Carrera.findById(nuevaMateria.idCarrera);

        if (!carreraExistente) {
            return res.status(404).json({
                mensaje: "Error de validación: La ID de Carrera proporcionada no existe.",
            });
        }

        // 2. Creación y Guardado
        const materiaCreada = new Materia(nuevaMateria);
        await materiaCreada.save();

        // 3. Respuesta exitosa (201 Created)
        res.status(201).json({
            mensaje: "Materia creada y asociada exitosamente.",
            datos: materiaCreada
        });

    } catch (error) {
        // Manejo de errores de Mongoose
        let statusCode = 500;
        let mensajeError = "Error interno del servidor al crear la materia.";

        if (error.name === 'ValidationError') {
            statusCode = 400; // Bad Request
            mensajeError = `Datos de entrada inválidos o incompletos: ${error.message}`;
        } else if (error.code === 11000) {
            statusCode = 409; // Conflict
            mensajeError = "Ya existe una materia con esa clave.";
        } else if (error.name === 'CastError' && error.path === 'idCarrera') {
            statusCode = 400; // Bad Request
            mensajeError = "La ID de Carrera proporcionada no tiene el formato correcto (ObjectId).";
        }

        console.error("Error al crear materia:", error);
        res.status(statusCode).json({ 
            mensaje: mensajeError,
            error: error.message 
        });
    }
});

// ----------------------------------------------------------------------
// ENDPOINT 2: OBTENER TODAS LAS MATERIAS (GET /api/materias)
// ----------------------------------------------------------------------
router.get("/", async (req, res) => {
    try {
        // Obtiene todas las materias, y con .populate('idCarrera') automáticamente
        // incluye el objeto de la carrera relacionada en lugar solo de la ID.
        const materias = await Materia.find({}).populate('idCarrera');

        res.status(200).json({
            mensaje: "Lista de materias obtenida exitosamente.",
            total: materias.length,
            datos: materias
        });
    } catch (error) {
        console.error("Error al obtener materias:", error);
        res.status(500).json({ 
            mensaje: "Error del servidor al obtener las materias.",
            error: error.message 
        });
    }
});


module.exports = router;
