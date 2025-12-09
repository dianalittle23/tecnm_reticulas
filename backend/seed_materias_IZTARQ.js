// backend/seed_materias_ITIztapalapa_arqu_2010_204.js
const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";
const TEC_NOMBRE = "Instituto Tecnológico de Iztapalapa";
const CARRERA_NOMBRE = "Arquitectura";
const PLAN_ANIO = 2010;

// Reutilizamos el array de datos de materias de la retícula genérica (mismo que usamos para Cabos/Mexicali)
const materiasDatos = [
  // ... (Aquí irían los mismos datos que en el script de Cabos/Mexicali para esta carrera)
  // Por brevedad, asumo que copiarás el array `materiasDatos` del script de Arquitectura anterior.
  // Ejemplo:
  { semestre: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena: "2-2-4" },
  { semestre: 1, clave: "ARC-1022", nombre: "Matemáticas Aplicadas a la Arquitectura", cadena: "2-2-4" },
  // ... y así sucesivamente todas las materias genéricas.
  // IMPORTANTE: Debes copiar todo el array del ejemplo de Arquitectura anterior.
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });
    if (!tec) { console.error(`Tec no encontrado: ${TEC_NOMBRE}`); return; }
    
    // Crear carrera si no existe
    let carrera = await Carrera.findOne({ nombre: CARRERA_NOMBRE, tec: tec._id });
    if (!carrera) { 
        carrera = await Carrera.create({ nombre: CARRERA_NOMBRE, tec: tec._id });
        console.log(`Carrera creada: ${CARRERA_NOMBRE}`);
    }

    for (const data of materiasDatos) {
        const [ht, hp, cr] = data.cadena.split('-').map(Number);
        await Materia.findOneAndUpdate(
            { clave: data.clave, tec: tec._id, carrera: carrera._id },
            { ...data, tec: tec._id, carrera: carrera._id, horas_teoria: ht, horas_practica: hp, creditos: cr, plan_anio: PLAN_ANIO, tipo_unidad: "Curso", area_materia: "Basica" },
            { new: true, upsert: true }
        );
        console.log(`Guardada: ${data.nombre}`);
    }
    console.log("Finalizado Arquitectura Iztapalapa.");
  } catch (err) { console.error(err); } finally { await mongoose.disconnect(); }
}
// Descomentar para ejecutar si tienes el array completo
// main();