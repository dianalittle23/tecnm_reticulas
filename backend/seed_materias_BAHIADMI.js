// backend/seed_materias_IADM_2010_213.js
//
// Inserta materias de Ingeniería en Administración IADM-2010-213
// del Instituto Tecnológico de bahia de banderas en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

const TEC_NOMBRE = "Instituto Tecnológico de Bahía de Banderas";
const CARRERA_NOMBRE = "Ingeniería en Administración";
const PLAN_ANIO = 2010;

const materiasDatos = [
  // ------------------ Semestre 1 ------------------
  { semestre_recomendado: 1, clave: "ADD-1030", nombre: "Taller de Administración I", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 1, clave: "ADV-1032", nombre: "Tecnologías de la Información", cadena_creditos: "0-5-5", horas_teoria: 0, horas_practica: 5, creditos: 5 },
  { semestre_recomendado: 1, clave: "ADD-1013", nombre: "Contabilidad Aplicada a la Ingeniería", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 1, clave: "AEC-1014", nombre: "Dinámica Social", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ------------------ Semestre 2 ------------------
  { semestre_recomendado: 2, clave: "ADD-1031", nombre: "Taller de Administración II", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 2, clave: "ADV-1033", nombre: "TIC'S Aplicadas a la Administración", cadena_creditos: "0-5-5", horas_teoria: 0, horas_practica: 5, creditos: 5 },
  { semestre_recomendado: 2, clave: "ADC-1012", nombre: "Contabilidad Administrativa", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "ADC-1009", nombre: "Comportamiento Organizacional", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ------------------ Semestre 3 ------------------
  { semestre_recomendado: 3, clave: "ADD-1022", nombre: "Innovación Tecnológica I", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 3, clave: "ADC-1015", nombre: "Derecho Laboral", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "AEC-1079", nombre: "Matemáticas Financieras", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "ADC-1010", nombre: "Comunicación Organizacional", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "ADC-1020", nombre: "Estadística I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ------------------ Semestre 4 ------------------
  { semestre_recomendado: 4, clave: "ADC-1007", nombre: "Capital Humano I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "ADC-1017", nombre: "Economía", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "ADC-1016", nombre: "Derecho Mercantil", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "ADC-1021", nombre: "Estadística II", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 4, clave: "ADD-1025", nombre: "Investigación de Operaciones", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 4, clave: "ADB-1023", nombre: "Innovación Tecnológica II", cadena_creditos: "1-4-5", horas_teoria: 1, horas_practica: 4, creditos: 5 },

  // ------------------ Semestre 5 ------------------
  { semestre_recomendado: 5, clave: "ADD-1008", nombre: "Capital Humano II", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "AEC-1077", nombre: "Macroeconomía", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "AED-1068", nombre: "Administración Financiera I", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "AEC-1080", nombre: "Mezcla de Mercadotecnia", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 5, clave: "AEC-1070", nombre: "Derecho Fiscal", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ------------------ Semestre 6 ------------------
  { semestre_recomendado: 6, clave: "ADF-1002", nombre: "Administración de la Producción", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "ADI-1005", nombre: "Análisis de la Problemática Nacional", cadena_creditos: "4-0-4", horas_teoria: 4, horas_practica: 0, creditos: 4 },
  { semestre_recomendado: 6, clave: "ADD-1004", nombre: "Administración Financiera II", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "AEB-1045", nombre: "Mercadotecnia Electrónica", cadena_creditos: "1-4-5", horas_teoria: 1, horas_practica: 4, creditos: 5 },
  { semestre_recomendado: 6, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 6, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // ------------------ Semestre 7 ------------------
  { semestre_recomendado: 7, clave: "ADD-1001", nombre: "Administración de la Calidad", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 7, clave: "ADC-1019", nombre: "Economía Internacional", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 7, clave: "AED-1015", nombre: "Diseño Organizacional", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 7, clave: "ADD-1024", nombre: "Investigación de Mercado", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 7, clave: "ADV-1029", nombre: "Plan de Negocios", cadena_creditos: "0-5-5", horas_teoria: 0, horas_practica: 5, creditos: 5 },

  // ------------------ Semestre 8 ------------------
  { semestre_recomendado: 8, clave: "AED-1035", nombre: "Gestión Estratégica", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 8, clave: "ADD-1006", nombre: "Auditoría Administrativa", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 8, clave: "ADH-1011", nombre: "Consultoría", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },

  // ------------------ Semestre 9 ------------------
  { semestre_recomendado: 9, clave: "RES-IADM-2010-213", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 },
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
      console.log("Materia guardada:", materia.semestre_recomendado, materia.clave, "-", materia.nombre);
    }

    console.log("Materias de Ingeniería en Administración IADM-2010-213 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
