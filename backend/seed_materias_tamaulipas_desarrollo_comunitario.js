// backend/seed_materias_ITNN_ALTAMIRA_2010_216.js
//
// Inserta materias de Ingeniería en Desarrollo Comunitario IDCO-2010-216
// del Instituto Tecnológico de ALTAMIRA en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Datos del Tec y Carrera
const TEC_NOMBRE = "Instituto Tecnológico de Altamira";
const CARRERA_NOMBRE = "Ingeniería en Desarrollo Comunitario";
const PLAN_ANIO = 2010;

// Materias extraídas de la retícula IDCO-2010-216
const materiasDatos = [

  // ---------- Semestre 1 ----------
  { semestre_recomendado: 1, clave: "DCD-1024", nombre: "Sociología Rural", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 1, clave: "DCD-1016", nombre: "Fundamentos de Desarrollo Comunitario", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 1, clave: "DCF-1002", nombre: "Biología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // ---------- Semestre 2 ----------
  { semestre_recomendado: 2, clave: "DCF-1006", nombre: "Cultura y Vida Comunitaria", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "DCC-1019", nombre: "Organización de Grupos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "DCF-1004", nombre: "Botánica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AEF-1056", nombre: "Química", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AEQ-1064", nombre: "Tecnologías de la Información y las Comunicaciones", cadena_creditos: "1-2-3", horas_teoria: 1, horas_practica: 2, creditos: 3 },

  // ---------- Semestre 3 ----------
  { semestre_recomendado: 3, clave: "DCP-1023", nombre: "Socioeconomía y Política de México", cadena_creditos: "3-0-3", horas_teoria: 3, horas_practica: 0, creditos: 3 },
  { semestre_recomendado: 3, clave: "AED-1006", nombre: "Bioquímica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "AEF-1049", nombre: "Microbiología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "DCF-1010", nombre: "Física I", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "ACF-0902", nombre: "Cálculo Integral", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "DCC-1014", nombre: "Fundamentos de Administración", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 4 ----------
  { semestre_recomendado: 4, clave: "AEF-1019", nombre: "Edafología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "DCF-1028", nombre: "Zoología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "DCD-1026", nombre: "Taller de Diagnósticos y Participación Comunitaria", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 4, clave: "DCF-1011", nombre: "Física II", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "DCF-1007", nombre: "Estadística I", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "DCC-1015", nombre: "Fundamentos de Contabilidad y Costos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 5 ----------
  { semestre_recomendado: 5, clave: "DCD-1027", nombre: "Taller de Planificación Regional", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "DCD-1017", nombre: "Introducción a la Producción Agropecuaria y Forestal", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "DCF-1012", nombre: "Fisiología Vegetal y Animal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "AEF-1017", nombre: "Ecología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "DCF-1008", nombre: "Estadística II", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "DCF-1001", nombre: "Análisis Económico", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------- Semestre 6 ----------
  { semestre_recomendado: 6, clave: "DCD-1025", nombre: "Taller de Desarrollo Comunitario", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "AED-1002", nombre: "Agroecología", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 6, clave: "AEF-1001", nombre: "Agroclimatología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "DCD-1020", nombre: "Planeación y Creación de Nuevas Empresas", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "DCG-1005", nombre: "Calidad y Administración de la Producción", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 6, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // ---------- Semestre 7 ----------
  { semestre_recomendado: 7, clave: "DCF-1009", nombre: "Evaluación Tecnológica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 7, clave: "DCG-1003", nombre: "Biotecnología", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 7, clave: "DCC-1018", nombre: "Manejo y Conservación del Agua", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 7, clave: "DCM-1013", nombre: "Formulación y Evaluación de Proyectos", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 7, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 7, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // ---------- Semestre 8 ----------
  { semestre_recomendado: 8, clave: "DCD-1022", nombre: "Sistemas de Información Geográfica", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 8, clave: "AMG-1012", nombre: "Fundamentos de Aguas Residuales", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 8, clave: "AMD-1008", nombre: "Evaluación de Impacto Ambiental", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 8, clave: "Residencia", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 },

  // ---------- Semestre 9 ----------
  { semestre_recomendado: 9, clave: "AC", nombre: "Actividades Complementarias", cadena_creditos: "0-5-5", horas_teoria: 0, horas_practica: 5, creditos: 5 },
  { semestre_recomendado: 9, clave: "SS", nombre: "Servicio Social", cadena_creditos: "0-10-10", horas_teoria: 0, horas_practica: 10, creditos: 10 }

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

      console.log(`Materia guardada: ${materia.semestre_recomendado} ${materia.clave} - ${materia.nombre}`);
    }

    console.log("Materias IDCO-2010-216 guardadas correctamente.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
