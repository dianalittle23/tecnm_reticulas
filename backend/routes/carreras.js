const express = require("express");
const Carrera = require("../models/Carrera");

const router = express.Router();

/** GET todas */
router.get("/", async (req, res) => {
  try {
    const { tecId } = req.query;
    const filtro = {};
    if (tecId) filtro.tec = tecId;

    const carreras = await Carrera.find(filtro)
      .populate("tec", "nombre")
      .populate("semestres.materias", "clave nombre semestre_recomendado es_modulo_especialidad")
      .populate("especialidades.materias", "clave nombre es_modulo_especialidad");

    res.json(carreras);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener carreras" });
  }
});

/** GET una sola por ID */
router.get("/:id", async (req, res) => {
  try {
    const carrera = await Carrera.findById(req.params.id)
      .populate("tec", "nombre")
      .populate("semestres.materias", "clave nombre semestre_recomendado es_modulo_especialidad")
      .populate("especialidades.materias", "clave nombre es_modulo_especialidad");

    if (!carrera)
      return res.status(404).json({ mensaje: "Carrera no encontrada" });

    res.json(carrera);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la carrera" });
  }
});

/** POST */
router.post("/", async (req, res) => {
  try {
    const carrera = new Carrera(req.body);
    await carrera.save();
    res.status(201).json(carrera);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear carrera" });
  }
});

module.exports = router;
