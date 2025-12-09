// backend/seed_materias_ARQU_2010_204.js
//
// Inserta materias de Arquitectura ARQU-2010-204
// del Instituto Tecnológico de chetumal en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

const TEC_NOMBRE = "Instituto Tecnológico de Chetumal";
const CARRERA_NOMBRE = "Arquitectura";
const PLAN_ANIO = 2010;

// Materias extraídas de la retícula ARQU-2010-204
const materiasDatos = [

  // ---------------- SEMESTRE 1 ----------------
  { semestre_recomendado: 1, clave: "ARE-1015", nombre: "Fundamentos Teóricos del Diseño I", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ARC-1059", nombre: "Análisis Proyectual", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ARC-1007", nombre: "Geometría Descriptiva I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ARE-1005", nombre: "Análisis Crítico de la Arquitectura y el Arte I", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 1, clave: "ARX-1034", nombre: "Taller de Expresión Plástica", cadena_creditos: "1-5-6", horas_teoria: 1, horas_practica: 5, creditos: 6 },

  // ---------------- SEMESTRE 2 ----------------
  { semestre_recomendado: 2, clave: "ARC-1016", nombre: "Fundamentos Teóricos del Diseño II", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 2, clave: "ARC-1023", nombre: "Metodología para el Diseño", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "ARC-1042", nombre: "Matemáticas Aplicadas a la Arquitectura", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "ARC-1037", nombre: "Geometría Descriptiva II", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "ARE-1006", nombre: "Análisis Crítico de la Arquitectura y el Arte II", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 2, clave: "ARX-1035", nombre: "Taller de Lenguaje Arquitectónico I", cadena_creditos: "1-5-6", horas_teoria: 1, horas_practica: 5, creditos: 6 },

  // ---------------- SEMESTRE 3 ----------------
  { semestre_recomendado: 3, clave: "ARC-1028", nombre: "Taller de Diseño I", cadena_creditos: "4-4-8", horas_teoria: 4, horas_practica: 4, creditos: 8 },
  { semestre_recomendado: 3, clave: "ARC-1025", nombre: "Propiedades y Comportamiento de los Materiales", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "ARC-1011", nombre: "Estructuras I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "ARC-1022", nombre: "Topografía", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "ARC-1008", nombre: "Análisis Crítico III", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 3, clave: "ARX-1036", nombre: "Taller de Lenguaje Arquitectónico II", cadena_creditos: "1-5-6", horas_teoria: 1, horas_practica: 5, creditos: 6 },

  // ---------------- SEMESTRE 4 ----------------
  { semestre_recomendado: 4, clave: "ARC-1029", nombre: "Taller de Diseño II", cadena_creditos: "3-5-8", horas_teoria: 3, horas_practica: 5, creditos: 8 },
  { semestre_recomendado: 4, clave: "ARC-1026", nombre: "Taller de Construcción I", cadena_creditos: "2-6-8", horas_teoria: 2, horas_practica: 6, creditos: 8 },
  { semestre_recomendado: 4, clave: "ARC-1012", nombre: "Estructuras II", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "ARC-1024", nombre: "Pensamiento Arquitectónico Contemporáneo", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 4, clave: "ARJ-1012", nombre: "Desarrollo Sustentable", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // ---------------- SEMESTRE 5 ----------------
  { semestre_recomendado: 5, clave: "ARM-1030", nombre: "Taller de Diseño III", cadena_creditos: "2-6-8", horas_teoria: 2, horas_practica: 6, creditos: 8 },
  { semestre_recomendado: 5, clave: "ARC-1031", nombre: "Taller de Diseño IV", cadena_creditos: "2-6-8", horas_teoria: 2, horas_practica: 6, creditos: 8 },
  { semestre_recomendado: 5, clave: "ARC-1003", nombre: "Estructuras de Concreto", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "ARE-1038", nombre: "Urbanismo I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "ARX-1034", nombre: "Instalaciones I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------------- SEMESTRE 6 ----------------
  { semestre_recomendado: 6, clave: "ART-1031", nombre: "Taller de Diseño V", cadena_creditos: "2-6-8", horas_teoria: 2, horas_practica: 6, creditos: 8 },
  { semestre_recomendado: 6, clave: "ART-1032", nombre: "Taller de Diseño VI", cadena_creditos: "2-6-8", horas_teoria: 2, horas_practica: 6, creditos: 8 },
  { semestre_recomendado: 6, clave: "ARC-1010", nombre: "Estructuras de Acero", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 6, clave: "ARE-1039", nombre: "Urbanismo II", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 6, clave: "AEQ-1064", nombre: "Instalaciones II", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------------- SEMESTRE 7 ----------------
  { semestre_recomendado: 7, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 7, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 7, clave: "ARE-1019", nombre: "Gestión Urbanística", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },

  // ---------------- SEMESTRE 8 ----------------
  { semestre_recomendado: 8, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 8, clave: "ARX-1036", nombre: "Administración de la Construcción I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 8, clave: "ARX-1035", nombre: "Administración de Empresas Constructoras I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------------- SEMESTRE 9 ----------------
  { semestre_recomendado: 9, clave: "ARX-1036", nombre: "Administración de Empresas Constructoras II", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------------- SEMESTRE 10 ----------------
  { semestre_recomendado: 10, clave: "RES-ARQU-2010-204", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 },
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado a MongoDB");

    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });
    if (!tec) return console.error("No se encontró el Tec");

    const carrera = await Carrera.findOne({ nombre: CARRERA_NOMBRE, tec: tec._id });
    if (!carrera) return console.error("No se encontró la carrera");

    for (const data of materiasDatos) {
      const materia = await Materia.findOneAndUpdate(
        { clave: data.clave, tec: tec._id, carrera: carrera._id },
        { ...data, tec: tec._id, carrera: carrera._id, tipo_unidad: "Curso", area_materia: "Basica", es_modulo_especialidad: false, plan_anio: PLAN_ANIO },
        { new: true, upsert: true }
      );

      console.log("Materia guardada:", materia.semestre_recomendado, materia.clave, "-", materia.nombre);
    }

    console.log("Materias de Arquitectura ARQU-2010-204 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
