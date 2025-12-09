// backend/seed_materias_IQUI_2010_232.js
//
// Inserta materias de Ingeniería Química IQUI-2010-232
// del Instituto Tecnológico de Zacatepec en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajustar según tu BD
const TEC_NOMBRE = "Instituto Tecnológico de Zacatepec";
const CARRERA_NOMBRE = "Ingeniería Química";
const PLAN_ANIO = 2010;

// Materias extraídas de la retícula IQUI-2010-232
const materiasDatos = [
  // -------- SEMESTRE 1 --------
  { semestre_recomendado: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "AEF-1060", nombre: "Química Inorgánica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "IQC-1018", nombre: "Programación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "AEO-1012", nombre: "Dibujo Asistido por Computadora", cadena_creditos: "0-3-3", horas_teoria: 0, horas_practica: 3, creditos: 3 },

  // -------- SEMESTRE 2 --------
  { semestre_recomendado: 2, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AEF-1042", nombre: "Mecánica Clásica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "IQF-1019", nombre: "Química Orgánica I", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AEF-1065", nombre: "Termodinámica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AEG-1059", nombre: "Química Analítica", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },

  // -------- SEMESTRE 3 --------
  { semestre_recomendado: 3, clave: "IQF-1001", nombre: "Análisis de Datos Experimentales", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "IQF-1003", nombre: "Electricidad, Magnetismo y Óptica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "IQF-1020", nombre: "Química Orgánica II", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "AEF-1004", nombre: "Balance de Materia y Energía", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "IQF-1006", nombre: "Gestión de la Calidad", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // -------- SEMESTRE 4 --------
  { semestre_recomendado: 4, clave: "IQH-1014", nombre: "Métodos Numéricos", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 4, clave: "ACF-0905", nombre: "Ecuaciones Diferenciales", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "IQF-1004", nombre: "Fisicoquímica I", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "AEF-1003", nombre: "Análisis Instrumental", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "IQN-1011", nombre: "Laboratorio Integral II", cadena_creditos: "0-6-6", horas_teoria: 0, horas_practica: 6, creditos: 6 },

  // -------- SEMESTRE 5 --------
  { semestre_recomendado: 5, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "IQC-1008", nombre: "Ingeniería de Costos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "IQJ-1002", nombre: "Balance de Momento, Calor y Masa", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },
  { semestre_recomendado: 5, clave: "IQF-1015", nombre: "Procesos de Separación I", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "IQN-1010", nombre: "Laboratorio Integral I", cadena_creditos: "0-6-6", horas_teoria: 0, horas_practica: 6, creditos: 6 },

  // -------- SEMESTRE 6 --------
  { semestre_recomendado: 6, clave: "IQO-1025", nombre: "Taller de Administración Gerencial", cadena_creditos: "0-3-3", horas_teoria: 0, horas_practica: 3, creditos: 3 },
  { semestre_recomendado: 6, clave: "AEF-1005", nombre: "Termodinámica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "IQF-1005", nombre: "Fisicoquímica II", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "IQF-1021", nombre: "Reactores Químicos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "IQF-1022", nombre: "Salud y Seguridad en el Trabajo", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // -------- SEMESTRE 7 --------
  { semestre_recomendado: 7, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 7, clave: "IQF-1016", nombre: "Procesos de Separación II", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 7, clave: "IQF-1017", nombre: "Procesos de Separación III", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 7, clave: "IQF-1024", nombre: "Síntesis y Optimización de Procesos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // -------- SEMESTRE 8 --------
  { semestre_recomendado: 8, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 8, clave: "AEF-1039", nombre: "Instrumentación y Control", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // -------- SEMESTRE 9 --------
  { semestre_recomendado: 9, clave: "IQM-1009", nombre: "Ingeniería de Proyectos", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 9, clave: "RES-IQUI-2010-232", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 }
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado a MongoDB");

    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });
    if (!tec) return console.error("Tec no encontrado");

    const carrera = await Carrera.findOne({ nombre: CARRERA_NOMBRE, tec: tec._id });
    if (!carrera) return console.error("Carrera no encontrada");

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
          plan_anio: PLAN_ANIO
        },
        { new: true, upsert: true }
      );

      console.log(
        "Materia guardada:",
        materia.semestre_recomendado,
        materia.clave,
        "-",
        materia.nombre
      );
    }

    console.log("Materias de Ingeniería Química IQUI-2010-232 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
