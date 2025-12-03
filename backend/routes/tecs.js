const express = require("express");
const router = express.Router();

// ----------------------------------------------------------------------
// RUTA DE EJEMPLO: OBTENER TODOS LOS TECNOLÓGICOS (GET /api/tecs)
// Nota: Aquí no hay lógica de Mongoose todavía, solo es un placeholder
// para que el servidor no falle al inicio.
// ----------------------------------------------------------------------
router.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "Ruta /api/tecs funcionando. Debes implementar el modelo y la lógica de base de datos aquí.",
        datos: []
    });
});


module.exports = router;

