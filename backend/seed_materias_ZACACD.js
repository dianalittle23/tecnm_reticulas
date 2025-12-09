// backend/seed_materias_CienciaDatos_ICDA_2024.js
//
// Inserta materias de Ingeniería en Ciencia de Datos ICDA-2024-247
// del Instituto Tecnológico de Zacatepec en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

const TEC_NOMBRE = "Instituto Tecnológico de Zacatepec";
const CARRERA_NOMBRE = "Ingeniería en Ciencia de Datos";
const PLAN_ANIO = 2024;

// ---------------- MATERIAS EXTRAÍDAS DE LA RETÍCULA ICDA-2024-247 ----------------
// Todas provienen del PDF oficial proporcionado por el usuario.
const materiasDatos = [
  // ---------------- SEMESTRE 1 ----------------
  { semestre_recomendado: 1, clave: "ACF-2301", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "CDD-2408", nombre: "Fundamentos de Programación", cadena_creditos: "1-4-5", horas_teoria: 1, horas_practica: 4, creditos: 5 },
  { semestre_recomendado: 1, clave: "AEC-1058", nombre: "Química", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "CDF-2418", nombre: "Principios Eléctricos y Aplicaciones Digitales", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "CDF-2416", nombre: "Introducción a la Ingeniería en Ciencia de Datos", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },

  // ---------------- SEMESTRE 2 ----------------
  { semestre_recomendado: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "CDD-2421", nombre: "Programación Orientada a Objetos", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 2, clave: "CDC-2411", nombre: "Estructura de Datos", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 2, clave: "CDF-2413", nombre: "Matemáticas Discretas", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AEF-24129", nombre: "Física General", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------------- SEMESTRE 3 ----------------
  { semestre_recomendado: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "CDC-2407", nombre: "Métodos Numéricos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "CDF-2410", nombre: "Fundamentos de Bases de Datos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "AEC-24128", nombre: "Desarrollo Sustentable", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // ---------------- SEMESTRE 4 ----------------
  { semestre_recomendado: 4, clave: "ACF-0905", nombre: "Ecuaciones Diferenciales", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "CDF-2420", nombre: "Programación Avanzada para Ciencia de Datos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "CDF-2419", nombre: "Estadística para Ciencia de Datos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "CDF-2414", nombre: "Investigación de Operaciones", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------------- SEMESTRE 5 ----------------
  { semestre_recomendado: 5, clave: "CDD-2415", nombre: "Lenguajes y Autómatas", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "CDF-2402", nombre: "Aprendizaje Automático", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "CDF-2424", nombre: "Fundamentos de Redes", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 5, clave: "CDF-2412", nombre: "Inteligencia de Negocios", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------------- SEMESTRE 6 ----------------
  { semestre_recomendado: 6, clave: "CDF-2417", nombre: "Inteligencia Artificial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "CDF-2415B", nombre: "Procesamiento de Lenguaje Natural", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "CDF-2404", nombre: "Big Data", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------------- SEMESTRE 7 ----------------
  { semestre_recomendado: 7, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 7, clave: "CDA-2423", nombre: "Tópicos Selectos para Ciencia de Datos", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 7, clave: "CDD-2422", nombre: "Taller de Desarrollo Ágil", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // ---------------- SEMESTRE 8 ----------------
  { semestre_recomendado: 8, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // ---------------- SEMESTRE 9 ----------------
  { semestre_recomendado: 9, clave: "CDH-2417", nombre: "Metodologías para Proyectos en Ciencia de Datos", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 9, clave: "RES-ICDA-2024", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 },
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

      console.log(`Materia guardada: ${materia.semestre_recomendado} ${materia.clave} - ${materia.nombre}`);
    }

    console.log("Materias de Ingeniería en Ciencia de Datos ICDA-2024-247 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
