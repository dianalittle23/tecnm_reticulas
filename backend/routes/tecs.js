const express = require("express");
const Tec = require("../models/Tec");

const router = express.Router();

// GET /api/tecs  -> lista todos los tecnológicos desde MongoDB
router.get("/", async (req, res) => {
  try {
    const tecs = await Tec.find().sort({ nombre: 1 });
    res.json(tecs);                     //  DEVUELVE JSON
  } catch (error) {
    console.error("Error al obtener tecs:", error);
    res.status(500).json({ mensaje: "Error al obtener tecs" });
  }
});

// (opcional) crear un tec a mano
router.post("/", async (req, res) => {
  try {
    const tec = new Tec(req.body);
    await tec.save();
    res.status(201).json(tec);
  } catch (error) {
    console.error("Error al crear tec:", error);
    res.status(500).json({ mensaje: "Error al crear tec" });
  }
});

module.exports = router;
