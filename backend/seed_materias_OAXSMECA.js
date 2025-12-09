// backend/seed_materias_IMEC_2010_228.js
//
// Inserta materias de Ingeniería Mecánica IMEC-2010-228
// del Instituto Tecnológico de salina cruz en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

const TEC_NOMBRE = "Instituto Tecnológico de Salina Cruz";
const CARRERA_NOMBRE = "Ingeniería Mecánica";
const PLAN_ANIO = 2010;

// ---- Materias extraídas de la retícula IMEC-2010-228 ----
const materiasDatos = [
  // ---------- Semestre 1 ----------
  { semestre_recomendado: 1, clave: "MEV-1006", nombre: "Dibujo Mecánico", cadena_creditos: "0-5-5", horas_teoria: 0, horas_practica: 5, creditos: 5 },
  { semestre_recomendado: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "AEH-1393", nombre: "Metrología y Normalización", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 1, clave: "MEC-1026", nombre: "Química", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 2 ----------
  { semestre_recomendado: 2, clave: "MEC-1023", nombre: "Probabilidad y Estadística", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "MEF-1013", nombre: "Ingeniería de Materiales Metálicos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "MEA-1001", nombre: "Algoritmos y Programación", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 2, clave: "MER-1024", nombre: "Proceso Administrativo", cadena_creditos: "2-1-3", horas_teoria: 2, horas_practica: 1, creditos: 3 },

  // ---------- Semestre 3 ----------
  { semestre_recomendado: 3, clave: "MED-1010", nombre: "Estática", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "MEC-1003", nombre: "Calidad", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "MEF-1014", nombre: "Ingeniería de Materiales No Metálicos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "AEF-1020", nombre: "Electromagnetismo", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "MER-1005", nombre: "Contabilidad y Costos", cadena_creditos: "2-1-3", horas_teoria: 2, horas_practica: 1, creditos: 3 },

  // ---------- Semestre 4 ----------
  { semestre_recomendado: 4, clave: "MED-1020", nombre: "Mecánica de Materiales I", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 4, clave: "ACF-0905", nombre: "Ecuaciones Diferenciales", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "AED-1391", nombre: "Dinámica", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 4, clave: "MED-1025", nombre: "Procesos de Manufactura", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 4, clave: "MED-1030", nombre: "Sistemas Electrónicos", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 4, clave: "AEC-1046", nombre: "Métodos Numéricos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------- Semestre 5 ----------
  { semestre_recomendado: 5, clave: "MED-1021", nombre: "Mecánica de Materiales II", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "AED-1043", nombre: "Mecanismos", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "MEF-1031", nombre: "Termodinámica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "MEC-1019", nombre: "Mecánica de Fluidos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "MED-1004", nombre: "Circuitos y Máquinas Eléctricas", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // ---------- Semestre 6 ----------
  { semestre_recomendado: 6, clave: "MED-1008", nombre: "Diseño Mecánico I", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "AED-1067", nombre: "Vibraciones Mecánicas", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "MEF-1032", nombre: "Transferencia de Calor", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "MED-1029", nombre: "Sistemas e Instalaciones Hidráulicas", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "MEF-1015", nombre: "Instrumentación y Control", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // ---------- Semestre 7 ----------
  { semestre_recomendado: 7, clave: "MED-1009", nombre: "Diseño Mecánico II", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 7, clave: "MER-1012", nombre: "Higiene y Seguridad Industrial", cadena_creditos: "2-1-3", horas_teoria: 2, horas_practica: 1, creditos: 3 },
  { semestre_recomendado: 7, clave: "MEF-1018", nombre: "Máquinas de Fluidos Incompresibles", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 7, clave: "MEF-1002", nombre: "Automatización Industrial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 7, clave: "MEC-1011", nombre: "Gestión de Proyectos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 7, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // ---------- Semestre 8 ----------
  { semestre_recomendado: 8, clave: "MEC-1016", nombre: "Mantenimiento", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 8, clave: "MEL-1028", nombre: "Sistemas de Generación de Energía", cadena_creditos: "4-1-5", horas_teoria: 4, horas_practica: 1, creditos: 5 },

  // ---------- Semestre 9 ----------
  { semestre_recomendado: 9, clave: "RES-IMEC-2010-228", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 },
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);

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

    console.log("Materias de Ingeniería Mecánica IMEC-2010-228 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

main();
