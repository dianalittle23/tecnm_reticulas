// backend/seed_materias_ITSN_iial_2010_219.js
//
// Inserta materias de Ingeniería en Industrias Alimentarias IIAL-2010-219
// del Instituto Tecnológico de carrillo puerto en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

const TEC_NOMBRE = "Instituto Tecnológico de Carrillo Puerto";
const CARRERA_NOMBRE = "Ingeniería en Industrias Alimentarias";
const PLAN_ANIO = 2010;

// Materias según la retícula IIAL-2010-219
const materiasDatos = [
  // ---------- Semestre 1 ----------
  { semestre_recomendado: 1, clave: "AEF-1005", nombre: "Biología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "ALB-1015", nombre: "Laboratorio de Química Analítica", cadena_creditos: "1-4-5", horas_teoria: 1, horas_practica: 4, creditos: 5 },
  { semestre_recomendado: 1, clave: "ALF-1002", nombre: "Bioquímica de Alimentos I", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "ALF-1003", nombre: "Bioquímica de Alimentos II", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "ALF-1008", nombre: "Evaluación Sensorial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "ALG-1004", nombre: "Biotecnología", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 1, clave: "ALM-1027", nombre: "Tecnología de Lácteos", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 1, clave: "AEF-1029", nombre: "Formulación y Evaluación de Proyectos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // ---------- Semestre 2 ----------
  { semestre_recomendado: 2, clave: "ALF-1021", nombre: "Química Inorgánica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ALF-1022", nombre: "Química Orgánica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ACF-0905", nombre: "Ecuaciones Diferenciales", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 2, clave: "AEM-1083", nombre: "Tecnología de Frutas, Hortalizas y Confitería", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 2, clave: "ALC-1011", nombre: "Gestión de la Calidad e Inocuidad Alimentaria", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "ALM-1019", nombre: "Operaciones Mecánicas", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 2, clave: "ALH-1006", nombre: "Diseño e Impartición de Cursos Presenciales", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },

  // ---------- Semestre 3 ----------
  { semestre_recomendado: 3, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "ACF-0902", nombre: "Cálculo Integral", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "ALJ-1028", nombre: "Termodinámica", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },
  { semestre_recomendado: 3, clave: "ALM-1009", nombre: "Flujo de Fluidos", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 3, clave: "ALM-1016", nombre: "Microbiología de Alimentos", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 3, clave: "ALM-1024", nombre: "Tecnología de Cárnicos", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 3, clave: "ALM-1025", nombre: "Tecnología de Cereales y Oleaginosas", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },

  // ---------- Semestre 4 ----------
  { semestre_recomendado: 4, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 4, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "ALM-1001", nombre: "Análisis de Alimentos", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 4, clave: "AEM-1050", nombre: "Microbiología", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 4, clave: "ALM-1017", nombre: "Operaciones de Transferencia de Calor", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 4, clave: "ALA-1013", nombre: "Innovación y Desarrollo de Nuevos Productos", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 4, clave: "ALD-1005", nombre: "Diseño de Plantas Alimentarias", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // ---------- Semestre 5 ----------
  { semestre_recomendado: 5, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "AEC-1081", nombre: "Probabilidad y Estadística", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "ALD-1007", nombre: "Diseños Experimentales", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "ALA-1020", nombre: "Programación", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 5, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 5, clave: "ALM-1018", nombre: "Operaciones de Transferencia de Masa", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 5, clave: "ALC-1012", nombre: "Inducción a la Administración y Economía", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 6 ----------
  { semestre_recomendado: 6, clave: "ALR-1014", nombre: "Introducción a la Industria Alimentaria", cadena_creditos: "2-1-3", horas_teoria: 2, horas_practica: 1, creditos: 3 },
  { semestre_recomendado: 6, clave: "ALC-1010", nombre: "Fundamentos de Física", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 6, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "ALA-1023", nombre: "Taller de Control Estadístico de Procesos", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 6, clave: "ALM-1026", nombre: "Tecnología de Conservación", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },

  // ---------- Semestre 7 - Residencia ----------
  { semestre_recomendado: 9, clave: "RES-IIAL-2010-219", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 },
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
      await Materia.findOneAndUpdate(
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
    }

    console.log("Materias IIAL-2010-219 guardadas correctamente.");
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

main();
