// backend/seed_materias_ITTuxtepec_IDAP_2024.js
//
// Inserta materias de Ingeniería en Desarrollo de Aplicaciones IDAP-2024-246
// del Instituto Tecnológico del Tuxtepec en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// AJUSTA los nombres a cómo estén en tu BD
const TEC_NOMBRE = "Instituto Tecnológico de Tuxtepec";
const CARRERA_NOMBRE = "Ingeniería en Desarrollo de Aplicaciones";
const PLAN_ANIO = 2024;

// Materias extraídas del mapa IDAP-2024-246
// Semestre, clave, nombre, T-P-C
const materiasDatos = [
  // ---------- Semestre 1 ----------
  { semestre_recomendado: 1, clave: "AED-1285", nombre: "Fundamentos de Programación", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 1, clave: "DAD-2408", nombre: "Programación Orientada a Objetos", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 1, clave: "DAD-2405", nombre: "Diseño Web", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 1, clave: "DAD-2406", nombre: "Diseño Centrado en el Usuario", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "AEF-24129", nombre: "Administración Gerencial", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 1, clave: "ACF-2301", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------- Semestre 2 ----------
  { semestre_recomendado: 2, clave: "AEF-24126", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "AEE-24123", nombre: "Probabilidad y Estadística", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AEF-24121", nombre: "Estadística Inferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "DAD-2409", nombre: "Estructuras de Datos", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 2, clave: "DAC-2413", nombre: "Ingeniería Económica", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------- Semestre 3 ----------
  { semestre_recomendado: 3, clave: "AEF-24119", nombre: "Matemáticas Discretas", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "AEF-24124", nombre: "Arquitectura de Computadoras", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "DAC-2423", nombre: "Sistemas Operativos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "DAA-2420", nombre: "Taller de Sistemas Operativos I", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 3, clave: "DAF-2401", nombre: "Fundamentos de Ingeniería de Software", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------- Semestre 4 ----------
  { semestre_recomendado: 4, clave: "AEF-24131", nombre: "Investigación de Operaciones", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "DAF-2416", nombre: "Ingeniería de Software", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "DAC-2414", nombre: "Taller de Investigación I", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 4, clave: "DAC-2421", nombre: "Redes de Computadoras I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "ACF-0905", nombre: "Ecuaciones Diferenciales", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------- Semestre 5 ----------
  { semestre_recomendado: 5, clave: "DAC-2412", nombre: "Frameworks para Backend", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "DAD-2411", nombre: "Frameworks para Frontend", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "DAH-2403", nombre: "Aseguramiento de la Calidad del Software", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 5, clave: "DAA-2421", nombre: "Redes de Computadoras II", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "DAD-2422", nombre: "Taller de Investigación II", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },

  // ---------- Semestre 6 ----------
  { semestre_recomendado: 6, clave: "DAC-2420", nombre: "Desarrollo de Aplicaciones en la Nube", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 6, clave: "DAC-2417", nombre: "Mercadotecnia Digital", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 6, clave: "DAF-2415", nombre: "Despliegue de Aplicaciones", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 6, clave: "AEE-24123", nombre: "Formulación y Evaluación de Proyectos de Inversión", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 7 ----------
  { semestre_recomendado: 7, clave: "DAC-2418", nombre: "Programación de Dispositivos Móviles I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 7, clave: "DAH-2422", nombre: "Arquitecturas Web", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 7, clave: "DAA-2424", nombre: "Taller de Investigación II", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 7, clave: "DAC-2423", nombre: "Administración de Proyectos TI", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 8 ----------
  { semestre_recomendado: 8, clave: "DAC-2419", nombre: "Programación de Dispositivos Móviles II", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 8, clave: "AEF-1073", nombre: "Finanzas en las Organizaciones", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 8, clave: "DAC-2411", nombre: "Frameworks para Backend", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 9 ----------
  { semestre_recomendado: 9, clave: "RES-IDAP-2024-246", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 },
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado a MongoDB");

    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });
    if (!tec) return console.error("Tec no encontrado.");

    const carrera = await Carrera.findOne({ nombre: CARRERA_NOMBRE, tec: tec._id });
    if (!carrera) return console.error("Carrera no encontrada.");

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

    console.log("Materias IDAP-2024-246 guardadas correctamente.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
