const mongoose = require("mongoose");

// Define el esquema (estructura) de una Carrera
const CarreraSchema = new mongoose.Schema({
    // Nombre de la carrera (ej: Ingeniería en Sistemas Computacionales)
    nombre: {
        type: String,
        required: [true, "El nombre de la carrera es obligatorio"],
        trim: true, // Quita espacios en blanco al inicio/fin
        unique: true // No puede haber dos carreras con el mismo nombre
    },
    // Código o clave de la carrera (ej: ISC-2010-224)
    codigo: {
        type: String,
        required: [true, "El código es obligatorio"],
        unique: true,
        trim: true
    },
    // Opcional: Referencia al Tecnológico al que pertenece, si lo necesitas
    idTec: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tecnologico', // Asumiendo que tienes un modelo llamado Tecnologico
        required: false // Por ahora lo dejamos opcional
    },
    // Fecha de creación, útil para auditoría
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Crea y exporta el Modelo de Mongoose
module.exports = mongoose.model("Carrera", CarreraSchema);
