// backend/seed_materias_Electromecanica_IEME_2010_210.js
//
// Inserta materias de Ingeniería Electromecánica IEME-2010-210
// del Instituto Tecnológico de Linares en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajusta estos nombres a como los tengas en tu BD
const TEC_NOMBRE = "Instituto Tecnológico de Linares";
const CARRERA_NOMBRE = "Ingeniería Electromecánica";
const PLAN_ANIO = 2010;

// Materias extraídas de la retícula IEME-2010-210
// Semestre, clave, nombre, T-P-C
const materiasDatos = [
  // ---------- Semestre 1 ----------
  { semestre_recomendado: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "EMH-1016", nombre: "Introducción a la Programación", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 1, clave: "AEC-1058", nombre: "Química", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 2 ----------
  { semestre_recomendado: 2, clave: "EME-1012", nombre: "Estática", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AEC-1047", nombre: "Metrología y Normalización", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "EAF-1011", nombre: "Electricidad y Magnetismo", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "AEF-1390", nombre: "Dibujo Electromecánico", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------- Semestre 3 ----------
  { semestre_recomendado: 3, clave: "EME-1008", nombre: "Dinámica", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "EMC-1022", nombre: "Procesos de Manufactura", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "EMJ-1021", nombre: "Mecánica de Materiales", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },
  { semestre_recomendado: 3, clave: "EMC-1011", nombre: "Análisis de Circuitos Eléctricos de CD", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "AEE-1051", nombre: "Probabilidad y Estadística", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },

  // ---------- Semestre 4 ----------
  { semestre_recomendado: 4, clave: "EME-1005", nombre: "Análisis y Síntesis de Mecanismos", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 4, clave: "ACF-0905", nombre: "Ecuaciones Diferenciales", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "EME-1020", nombre: "Mecánica de Fluidos", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 4, clave: "EMF-1004", nombre: "Análisis de Circuitos Eléctricos de CA", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "AEC-1022", nombre: "Electrónica Analógica", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // ---------- Semestre 5 ----------
  { semestre_recomendado: 5, clave: "EMF-1009", nombre: "Diseño de Elementos de Máquinas", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "EME-1029", nombre: "Termodinámica", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 5, clave: "EMJ-1026", nombre: "Sistemas y Máquinas de Fluidos", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },
  { semestre_recomendado: 5, clave: "EMJ-1017", nombre: "Máquinas Eléctricas", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },
  { semestre_recomendado: 5, clave: "AEC-1022", nombre: "Electrónica Digital", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // ---------- Semestre 6 ----------
  { semestre_recomendado: 6, clave: "EMC-1018", nombre: "Máquinas y Equipos Térmicos I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 6, clave: "EMF-1030", nombre: "Transferencia de Calor", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 6, clave: "EMF-1015", nombre: "Instalaciones Eléctricas", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "EMJ-1001", nombre: "Administración y Técnicas de Mantenimiento", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },
  { semestre_recomendado: 6, clave: "AEC-1022", nombre: "Electrónica Digital", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 7 ----------
  { semestre_recomendado: 7, clave: "EMC-1019", nombre: "Máquinas y Equipos Térmicos II", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 7, clave: "EMF-1024", nombre: "Sistemas Eléctricos de Potencia", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 7, clave: "EMF-1006", nombre: "Controles Eléctricos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 7, clave: "EMJ-1014", nombre: "Ingeniería de Control Clásico", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },
  { semestre_recomendado: 7, clave: "EMC-1013", nombre: "Formulación y Evaluación de Proyectos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 8 — Especialidad ----------
  { semestre_recomendado: 8, clave: "EME-1028", nombre: "Tecnología de los Materiales", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 8, clave: "EME-1020", nombre: "Mecánica de Fluidos", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 8, clave: "EMJ-1026", nombre: "Sistemas y Máquinas de Fluidos", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },
  { semestre_recomendado: 8, clave: "EMJ-1001", nombre: "Administración y Técnicas de Mantenimiento", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },

  // ---------- Semestre 9 ----------
  { semestre_recomendado: 9, clave: "RES-IEME-2010-210", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 },
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado a MongoDB");

    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });
    if (!tec) return console.error("No se encontró el Tec.");

    const carrera = await Carrera.findOne({ nombre: CARRERA_NOMBRE, tec: tec._id });
    if (!carrera) return console.error("No se encontró la carrera.");

    for (const data of materiasDatos) {
      await Materia.findOneAndUpdate(
        { clave: data.clave, tec: tec._id, carrera: carrera._id },
        {
          ...data,
          tec: tec._id,
          carrera: carrera._id,
          tipo_unidad: "Curso",
          area_materia: "Basica",
          es_modulo_especialidad: false,
          plan_anio: PLAN_ANIO,
        },
        { new: true, upsert: true }
      );
    }

    console.log("Materias de Ingeniería Electromecánica IEME-2010-210 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
