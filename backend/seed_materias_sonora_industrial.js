// backend/seed_materias_ITNOGALES_Industrial_2010.js
//
// Inserta materias de Ingeniería Industrial IIND-2010-227
// del Instituto Tecnológico de NOGALES en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajusta estos nombres a como los tengas guardados en tu BD
const TEC_NOMBRE = "Instituto Tecnológico de Nogales";
const CARRERA_NOMBRE = "Ingeniería Industrial";
const PLAN_ANIO = 2010;

// Materias extraídas de la retícula IIND-2010-227
// Semestre, clave, nombre, T-P-C

const materiasDatos = [
  // ---------- Semestre 1 ----------
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "INH-1029", nombre: "Taller de Herramientas Intelectuales", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 1, clave: "INC-1025", nombre: "Química", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "INN-1008", nombre: "Dibujo Industrial", cadena_creditos: "0-6-6", horas_teoria: 0, horas_practica: 6, creditos: 6 },

  // ---------- Semestre 2 ----------
  { semestre_recomendado: 2, clave: "INC-1009", nombre: "Electricidad y Electrónica Industrial", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "INC-1024", nombre: "Propiedades de los Materiales", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AEC-1053", nombre: "Probabilidad y Estadística", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "INQ-1006", nombre: "Análisis de la Realidad Nacional", cadena_creditos: "1-2-3", horas_teoria: 1, horas_practica: 2, creditos: 3 },
  { semestre_recomendado: 2, clave: "INC-1030", nombre: "Taller de Liderazgo", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 3 ----------
  { semestre_recomendado: 3, clave: "AEC-1048", nombre: "Metrología y Normalización", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "AEC-1018", nombre: "Economía", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "AEF-1024", nombre: "Estadística Inferencial I", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "INJ-1011", nombre: "Estudio del Trabajo I", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },

  // ---------- Semestre 4 ----------
  { semestre_recomendado: 4, clave: "INC-1023", nombre: "Procesos de Fabricación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "INC-1013", nombre: "Física", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "INC-1005", nombre: "Algoritmos y Lenguajes de Programación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "AEF-1025", nombre: "Estadística Inferencial II", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "INJ-1012", nombre: "Estudio del Trabajo II", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },
  { semestre_recomendado: 4, clave: "INF-1016", nombre: "Higiene y Seguridad Industrial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------- Semestre 5 ----------
  { semestre_recomendado: 5, clave: "INR-1003", nombre: "Administración de Proyectos", cadena_creditos: "2-1-3", horas_teoria: 2, horas_practica: 1, creditos: 3 },
  { semestre_recomendado: 5, clave: "AEC-1392", nombre: "Gestión de Costos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "INC-1001", nombre: "Administración de las Operaciones I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "INC-1002", nombre: "Administración de las Operaciones II", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "INF-1007", nombre: "Control Estadístico de la Calidad", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "INF-1010", nombre: "Ergonomía", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------- Semestre 6 ----------
  { semestre_recomendado: 6, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 6, clave: "INC-1021", nombre: "Planeación Financiera", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 6, clave: "INC-1022", nombre: "Planeación y Diseño de Instalaciones", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 6, clave: "INC-1019", nombre: "Investigación de Operaciones II", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 6, clave: "INH-1020", nombre: "Logística y Cadenas de Suministro", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 6, clave: "AED-1044", nombre: "Mercadotecnia", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // ---------- Semestre 7 ----------
  { semestre_recomendado: 7, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 7, clave: "INC-1026", nombre: "Relaciones Industriales", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 7, clave: "INF-1028", nombre: "Sistemas de Manufactura", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 7, clave: "INC-1015", nombre: "Gestión de los Sistemas de Calidad", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 7, clave: "INR-1017", nombre: "Ingeniería de Sistemas", cadena_creditos: "2-1-3", horas_teoria: 2, horas_practica: 1, creditos: 3 },

  // ---------- Semestre 8 ----------
  { semestre_recomendado: 8, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // ---------- Semestre 9 ----------
  { semestre_recomendado: 9, clave: "RES-IIND-2010-227", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 },
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado a MongoDB");

    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });
    if (!tec) return console.error("No se encontró el Tec.");

    const carrera = await Carrera.findOne({ nombre: CARRERA_NOMBRE, tec: tec._id });
    if (!carrera) return console.error("No se encontró la carrera.");

    console.log("Tec:", tec.nombre);
    console.log("Carrera:", carrera.nombre);

    for (const data of materiasDatos) {
      const materia = await Materia.findOneAndUpdate(
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

      console.log("Materia guardada:", materia.semestre_recomendado, materia.clave, "-", materia.nombre);
    }

    console.log("Materias de Ingeniería Industrial IIND-2010-227 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
