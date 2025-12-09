// backend/seed_materias_Ambiental_IAMB_2010_206.js
//
// Inserta materias de Ingeniería Ambiental IAMB-2010-206
// del Instituto Tecnológico de ciudad valles en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajusta estos nombres como los tengas en tu BD
const TEC_NOMBRE = "Instituto Tecnologico de Ciudad Valles";
const CARRERA_NOMBRE = "Ingeniería Ambiental";
const PLAN_ANIO = 2010;

// Materias extraídas de la retícula IAMB-2010-206
const materiasDatos = [
  // ---------- Semestre 1 ----------
  { semestre_recomendado: 1, clave: "AEF-1060", nombre: "Química Inorgánica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "AMA-1004", nombre: "Dibujo Asistido por Computadora", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "AEF-1005", nombre: "Biología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------- Semestre 2 ----------
  { semestre_recomendado: 2, clave: "AEF-1033", nombre: "Fundamentos de Química Orgánica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AMF-1009", nombre: "Física", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AMF-1019", nombre: "Probabilidad y Estadística Ambiental", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AMF-1006", nombre: "Ecología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------- Semestre 3 ----------
  { semestre_recomendado: 3, clave: "AEG-1059", nombre: "Química Analítica", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "AMC-1005", nombre: "Diseño de Experimentos Ambientales", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "AEF-1065", nombre: "Termodinámica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "AMP-1007", nombre: "Economía Ambiental", cadena_creditos: "3-0-3", horas_teoria: 3, horas_practica: 0, creditos: 3 },
  { semestre_recomendado: 3, clave: "AEJ-1007", nombre: "Bioquímica", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },

  // ---------- Semestre 4 ----------
  { semestre_recomendado: 4, clave: "AMF-1001", nombre: "Análisis Instrumental", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "ACF-0905", nombre: "Ecuaciones Diferenciales", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "AEF-1004", nombre: "Balance de Materia y Energía", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "AMF-1010", nombre: "Fisicoquímica I", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "AMG-1015", nombre: "Gestión de Residuos", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 4, clave: "AEM-1050", nombre: "Microbiología", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },

  // ---------- Semestre 5 ----------
  { semestre_recomendado: 5, clave: "AEF-1027", nombre: "Fenómenos de Transporte", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "AMC-1022", nombre: "Sistemas de Información Geográfica", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "AMF-1013", nombre: "Gestión Ambiental I", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "AMF-1011", nombre: "Fisicoquímica II", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "AMG-1020", nombre: "Remediación de Suelos", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 5, clave: "AMF-1023", nombre: "Toxicología Ambiental", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------- Semestre 6 ----------
  { semestre_recomendado: 6, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 6, clave: "AMF-1003", nombre: "Contaminación Atmosférica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "AMC-1014", nombre: "Gestión Ambiental II", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 6, clave: "AMD-1008", nombre: "Evaluación de Impacto Ambiental", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "AMF-1017", nombre: "Mecánica de Fluidos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "AMF-1002", nombre: "Componentes de Equipo Industrial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------- Semestre 7 ----------
  { semestre_recomendado: 7, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 7, clave: "AMG-1018", nombre: "Potabilización de Agua", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 7, clave: "AEF-1029", nombre: "Formulación y Evaluación de Proyectos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 7, clave: "AMC-1021", nombre: "Seguridad e Higiene Industrial", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 8 ----------
  { semestre_recomendado: 8, clave: "AMG-1012", nombre: "Fundamentos de Aguas Residuales", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 8, clave: "AEF-1021", nombre: "Ingeniería de Costos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 9 ----------
  { semestre_recomendado: 9, clave: "RES-IAMB-2010-206", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 },
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

    console.log("Materias de Ingeniería Ambiental IAMB-2010-206 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
