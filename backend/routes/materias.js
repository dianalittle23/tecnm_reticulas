const express = require("express");
const Materia = require("../models/Materia");

const router = express.Router();

// GET /api/materias
router.get("/", async (req, res) => {
  try {
    const {
      clave,
      nombre,
      tecId,
      carreraId,
      semestre,
      soloEspecialidad,
      tag,
    } = req.query;

    const filtro = {};

    if (clave) filtro.clave = clave;
    if (nombre) filtro.nombre = new RegExp(nombre, "i");
    if (tecId) filtro.tec = tecId;
    if (carreraId) filtro.carrera = carreraId;
    if (semestre) filtro.semestre_recomendado = Number(semestre);
    if (soloEspecialidad === "true") filtro.es_modulo_especialidad = true;
    if (tag) filtro.tags = tag;

    const materias = await Materia.find(filtro)
      .populate("tec", "nombre")
      .populate("carrera", "nombre clave_oficial")
      .populate("prerrequisitos", "clave nombre");

    res.json(materias);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener materias" });
  }
});

// POST /api/materias
router.post("/", async (req, res) => {
  try {
    const materia = new Materia(req.body);
    await materia.save();
    res.status(201).json(materia);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear materia",
      error: error.message,
      detalles: error.errors,
    });
  }
});

module.exports = router;
