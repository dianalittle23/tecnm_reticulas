const mongoose = require("mongoose");

// Define un esquema muy simple para el Tecnológico
const TecnologicoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del Tecnológico es obligatorio"],
        trim: true,
        unique: true
    },
    clave: {
        type: String,
        required: [true, "La clave del Tecnológico es obligatoria"],
        unique: true,
        trim: true
    },
    // Dirección, opcional por ahora
    direccion: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Tecnologico", TecnologicoSchema);
