// backend/seed_materias_ITrioverde_iias_2010_221.js
//
// Inserta materias de Ingeniería en Innovación Agrícola Sustentable IIAS-2010-221
// del Instituto Tecnológico rio verde en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

const TEC_NOMBRE = "Instituto Tecnológico Rio Verde";
const CARRERA_NOMBRE = "Ingeniería en Innovación Agrícola Sustentable";
const PLAN_ANIO = 2010;

// Materias extraídas de la retícula IIAS-2010-221
const materiasDatos = [
  // --------- Semestre 1 ---------
  { semestre_recomendado: 1, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "AEF-1056", nombre: "Química", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "ASQ-1023", nombre: "Taller de Elementos de Mecánica de Sólidos", cadena_creditos: "1-2-3", horas_teoria: 1, horas_practica: 2, creditos: 3 },
  { semestre_recomendado: 1, clave: "ASF-1004", nombre: "Biología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "AEQ-1064", nombre: "Tecnologías de la Información y las Comunicaciones", cadena_creditos: "1-2-3", horas_teoria: 1, horas_practica: 2, creditos: 3 },
  { semestre_recomendado: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // --------- Semestre 2 ---------
  { semestre_recomendado: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ASF-1019", nombre: "Química Analítica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AEF-1019", nombre: "Edafología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ASF-1009", nombre: "Elementos de Termodinámica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ASF-1006", nombre: "Botánica Aplicada", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ASF-1010", nombre: "Estadística", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ASF-1015", nombre: "Métodos Estadísticos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // --------- Semestre 3 ---------
  { semestre_recomendado: 3, clave: "AEF-1036", nombre: "Hidráulica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "AEF-1017", nombre: "Ecología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "ASQ-1008", nombre: "Diseño Agrícola Asistido por Computadora", cadena_creditos: "1-2-3", horas_teoria: 1, horas_practica: 2, creditos: 3 },
  { semestre_recomendado: 3, clave: "AEF-1016", nombre: "Diseños Experimentales", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "ASF-1018", nombre: "Principios de Electromecánica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "AEM-1066", nombre: "Topografía", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 3, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // --------- Semestre 4 ---------
  { semestre_recomendado: 4, clave: "ASF-1005", nombre: "Biología Molecular", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "AEF-1001", nombre: "Agroclimatología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "ASD-1020", nombre: "Sistemas de Producción Agrícola", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 4, clave: "ASF-1012", nombre: "Fisiología Vegetal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "AEJ-1028", nombre: "Fitopatología", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },
  { semestre_recomendado: 4, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 4, clave: "ASC-1003", nombre: "Base de Datos y SIG", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // --------- Semestre 5 ---------
  { semestre_recomendado: 5, clave: "ASD-1007", nombre: "Desarrollo Comunitario", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "ASF-1011", nombre: "Agroecología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "ASF-1017", nombre: "Olericultura", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "ASF-1022", nombre: "Sistemas de Riego Superficial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "ASF-1014", nombre: "Introducción a la Agricultura Protegida", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // --------- Semestre 6 ---------
  { semestre_recomendado: 6, clave: "ASD-1001", nombre: "Agronegocios I", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "ASD-1002", nombre: "Agronegocios II", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "ASF-1021", nombre: "Sistemas de Riego Presurizado", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "ASC-1013", nombre: "Inocuidad Alimentaria y Bioseguridad", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // --------- Semestre 7 ---------
  { semestre_recomendado: 7, clave: "ASF-1005", nombre: "Biología Molecular", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 7, clave: "ASF-1020", nombre: "Fertirrigación", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // --------- Semestre 8 (Especialidad) ---------
  { semestre_recomendado: 8, clave: "ASF-1017", nombre: "Olericultura", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // --------- Semestre 9 (Residencia) ---------
  { semestre_recomendado: 9, clave: "RES-IIAS-2010-221", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 }
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
          plan_anio: PLAN_ANIO
        },
        { new: true, upsert: true }
      );

      console.log(`Materia guardada: ${materia.clave} - ${materia.nombre}`);
    }

    console.log("Materias de IIAS-2010-221 guardadas exitosamente.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
