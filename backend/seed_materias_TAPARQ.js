// backend/seed_materias_ITTapachula_arqu_2010_204.js
const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";
const TEC_NOMBRE = "Instituto Tecnológico de Tapachula";
const CARRERA_NOMBRE = "Arquitectura";
const PLAN_ANIO = 2010;

const materiasDatos = [
  // Semestre 1
  { semestre: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena: "2-2-4" },
  { semestre: 1, clave: "ARC-1022", nombre: "Matemáticas Aplicadas a la Arquitectura", cadena: "2-2-4" },
  { semestre: 1, clave: "ARC-1023", nombre: "Metodología para el Diseño", cadena: "2-2-4" },
  { semestre: 1, clave: "ARC-1009", nombre: "Análisis Proyectual", cadena: "2-2-4" },
  { semestre: 1, clave: "ARE-1015", nombre: "Fundamentos Teóricos del Diseño I", cadena: "2-2-4" },
  { semestre: 1, clave: "ARX-1034", nombre: "Taller de Expresión Plástica", cadena: "1-5-6" },
  // Semestre 2
  { semestre: 2, clave: "ACA-0907", nombre: "Taller de Ética", cadena: "0-4-4" },
  { semestre: 2, clave: "ARC-1013", nombre: "Estructuras I", cadena: "2-2-4" },
  { semestre: 2, clave: "ARC-1025", nombre: "Propiedades y Comportamiento de los Materiales", cadena: "2-2-4" },
  { semestre: 2, clave: "ARC-1016", nombre: "Fundamentos Teóricos del Diseño II", cadena: "2-2-4" },
  { semestre: 2, clave: "ARG-1028", nombre: "Taller de Diseño I", cadena: "1-3-4" },
  { semestre: 2, clave: "ARX-1035", nombre: "Taller de Lenguaje Arquitectónico I", cadena: "1-5-6" },
  // Semestre 3
  { semestre: 3, clave: "ARC-1014", nombre: "Estructuras II", cadena: "2-2-4" },
  { semestre: 3, clave: "ARJ-1026", nombre: "Taller de Construcción I", cadena: "2-4-6" },
  { semestre: 3, clave: "ARC-1017", nombre: "Pensamiento Arquitectónico Contemporáneo", cadena: "2-2-4" },
  { semestre: 3, clave: "ARE-1005", nombre: "Análisis Crítico de la Arquitectura y el Arte I", cadena: "2-2-4" },
  { semestre: 3, clave: "ARC-1029", nombre: "Taller de Diseño II", cadena: "1-3-4" },
  { semestre: 3, clave: "ARX-1036", nombre: "Taller de Lenguaje Arquitectónico II", cadena: "1-5-6" },
  // Semestre 4
  { semestre: 4, clave: "ARJ-1012", nombre: "Estructuras de Concreto", cadena: "2-4-6" },
  { semestre: 4, clave: "ARJ-1027", nombre: "Taller de Construcción II", cadena: "2-4-6" },
  { semestre: 4, clave: "ARC-1018", nombre: "Geometría Descriptiva I", cadena: "2-2-4" },
  { semestre: 4, clave: "ARE-1006", nombre: "Análisis Crítico de la Arquitectura y el Arte II", cadena: "2-2-4" },
  { semestre: 4, clave: "ARM-1030", nombre: "Taller de Diseño III", cadena: "1-3-4" },
  { semestre: 4, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena: "2-3-5" },
  // Semestre 5
  { semestre: 5, clave: "ARC-1011", nombre: "Estructuras de Acero", cadena: "2-2-4" },
  { semestre: 5, clave: "ARC-1020", nombre: "Instalaciones I", cadena: "2-2-4" },
  { semestre: 5, clave: "ARH-1037", nombre: "Geometría Descriptiva II", cadena: "1-3-4" },
  { semestre: 5, clave: "ARE-1007", nombre: "Análisis Crítico de la Arquitectura y el Arte III", cadena: "2-2-4" },
  { semestre: 5, clave: "ART-1031", nombre: "Taller de Diseño IV", cadena: "2-6-8" },
  { semestre: 5, clave: "ARC-1003", nombre: "Administración de la Construcción I", cadena: "2-2-4" },
  // Semestre 6
  { semestre: 6, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena: "0-4-4" },
  { semestre: 6, clave: "ARC-1021", nombre: "Instalaciones II", cadena: "2-2-4" },
  { semestre: 6, clave: "ARE-1038", nombre: "Urbanismo I", cadena: "2-2-4" },
  { semestre: 6, clave: "ARE-1008", nombre: "Análisis Crítico de la Arquitectura y el Arte IV", cadena: "2-2-4" },
  { semestre: 6, clave: "ART-1032", nombre: "Taller de Diseño V", cadena: "2-6-8" },
  { semestre: 6, clave: "ARC-1004", nombre: "Administración de la Construcción II", cadena: "2-2-4" },
  // Semestre 7
  { semestre: 7, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena: "0-4-4" },
  { semestre: 7, clave: "ARE-1039", nombre: "Urbanismo II", cadena: "2-2-4" },
  { semestre: 7, clave: "ARR-1010", nombre: "Estética", cadena: "2-2-4" },
  { semestre: 7, clave: "ART-1033", nombre: "Taller de Diseño VI", cadena: "2-6-8" },
  { semestre: 7, clave: "ARC-1001", nombre: "Administración de Empresas Constructoras I", cadena: "2-2-4" },
  // Semestre 8
  { semestre: 8, clave: "ARE-1019", nombre: "Gestión Urbanística", cadena: "2-2-4" },
  { semestre: 8, clave: "ARC-1002", nombre: "Administración de Empresas Constructoras II", cadena: "2-2-4" },
  // Semestre 9
  { semestre: 9, clave: "RES-ARQU-2010-204", nombre: "Residencia Profesional", cadena: "0-0-10" }
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
    console.log("Finalizado Arquitectura Tapachula.");
  } catch (err) { console.error(err); } finally { await mongoose.disconnect(); }
}
main();