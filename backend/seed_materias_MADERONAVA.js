// backend/seed_materias_ITMADERO_inav_2010_230.js
//
// Inserta materias de Ingeniería Naval INAV-2010-230
// del Instituto Tecnológico de MADERO en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajusta estos nombres a como los tengas guardados en tu BD
const TEC_NOMBRE = "Instituto Tecnológico de Ciduad Madero";
const CARRERA_NOMBRE = "Ingeniería Naval";
const PLAN_ANIO = 2010;

// Materias extraídas de la retícula INAV-2010-230
// Semestre, clave, nombre, T-P-C
const materiasDatos = [
  // ---------- Semestre 1 ----------
  { semestre_recomendado: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "NVQ-1034", nombre: "Química", cadena_creditos: "1-2-3", horas_teoria: 1, horas_practica: 2, creditos: 3 },
  { semestre_recomendado: 1, clave: "NVO-1010", nombre: "Computación", cadena_creditos: "0-3-3", horas_teoria: 0, horas_practica: 3, creditos: 3 },
  { semestre_recomendado: 1, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "NVC-1031", nombre: "Probabilidad y Estadística", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 2 ----------
  { semestre_recomendado: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "NVP-1008", nombre: "Ciencia de Materiales", cadena_creditos: "3-0-3", horas_teoria: 3, horas_practica: 0, creditos: 3 },
  { semestre_recomendado: 2, clave: "NVB-1029", nombre: "Métodos Numéricos", cadena_creditos: "1-4-5", horas_teoria: 1, horas_practica: 4, creditos: 5 },
  { semestre_recomendado: 2, clave: "NVF-1019", nombre: "Estática", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "NVA-1012", nombre: "Dibujo en Ingeniería Naval", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 2, clave: "NVP-1030", nombre: "Microeconomía", cadena_creditos: "3-0-3", horas_teoria: 3, horas_practica: 0, creditos: 3 },

  // ---------- Semestre 3 ----------
  { semestre_recomendado: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "NVC-1032", nombre: "Producción Naval", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "NVF-1026", nombre: "Mecánica de Materiales I", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "NVG-1013", nombre: "Dinámica", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 3, clave: "NVR-1024", nombre: "Marketing", cadena_creditos: "2-1-3", horas_teoria: 2, horas_practica: 1, creditos: 3 },
  { semestre_recomendado: 3, clave: "NVC-1018", nombre: "Electricidad y Magnetismo", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 4 ----------
  { semestre_recomendado: 4, clave: "ACF-0905", nombre: "Ecuaciones Diferenciales", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "NVF-1025", nombre: "Mecánica de Fluidos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "NVF-1027", nombre: "Mecánica de Materiales II", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "NVB-1007", nombre: "Cálculos de Forma y Estabilidad", cadena_creditos: "1-4-5", horas_teoria: 1, horas_practica: 4, creditos: 5 },
  { semestre_recomendado: 4, clave: "NVF-1039", nombre: "Termodinámica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "NVC-1009", nombre: "Circuitos y Electrónica", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 5 ----------
  { semestre_recomendado: 5, clave: "NVE-1021", nombre: "Fundamentos de Vibraciones", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 5, clave: "NVF-1035", nombre: "Resistencia y Propulsión", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "NVD-1005", nombre: "Análisis Estructural Naval I", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "NVF-1004", nombre: "Análisis de Estabilidad", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "NVF-1038", nombre: "Sistemas de Propulsión", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "NVC-1023", nombre: "Máquinas Eléctricas", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 6 ----------
  { semestre_recomendado: 6, clave: "NVF-1037", nombre: "Sistemas de Ingeniería del Casco", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "NVE-1014", nombre: "Dinámica de Vehículos Marinos", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 6, clave: "NVF-1006", nombre: "Análisis Estructural Naval II", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "NVE-1028", nombre: "Métodos de Diseño de Vehículos Marinos", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 6, clave: "NVF-1036", nombre: "Sistemas Auxiliares", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // ---------- Semestre 7 ----------
  { semestre_recomendado: 7, clave: "NVC-1017", nombre: "Diseño Estructural Naval", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 7, clave: "NVH-1033", nombre: "Proyecto de Diseño de Vehículos Marinos", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 7, clave: "NVC-1015", nombre: "Diseño de Elementos de Máquinas", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 7, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 7, clave: "NVC-1022", nombre: "Ingeniería Económica", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 7, clave: "NVH-1020", nombre: "Formulación y Evaluación de Proyectos", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },

  // ---------- Semestre 8 ----------
  { semestre_recomendado: 8, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 8, clave: "NVC-1003", nombre: "Administración de Costos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 8, clave: "NVR-1001", nombre: "Administración de Operaciones I", cadena_creditos: "2-1-3", horas_teoria: 2, horas_practica: 1, creditos: 3 },
  { semestre_recomendado: 8, clave: "NVR-1002", nombre: "Administración de Operaciones II", cadena_creditos: "2-1-3", horas_teoria: 2, horas_practica: 1, creditos: 3 },
  { semestre_recomendado: 8, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // ---------- Semestre 9 ----------
  { semestre_recomendado: 9, clave: "RES-INAV-2010-230", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 },
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

    console.log("Materias de Ingeniería Naval INAV-2010-230 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
