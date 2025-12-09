// backend/seed_materias_REYNOSA_2010_217.js
//
// Inserta materias de Ingeniería en Energías Renovables IENR-2010-217
// del Instituto Tecnológico de REYNOSA en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

const TEC_NOMBRE = "Instituto Tecnológico de Reynosa";
const CARRERA_NOMBRE = "Ingeniería en Energías Renovables";
const PLAN_ANIO = 2010;

// Materias obtenidas de la retícula IENR-2010-217
const materiasDatos = [
  // --- Semestre 1 ---
  { semestre_recomendado: 1, clave: "ERF-1024", nombre: "Química", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "ERC-1023", nombre: "Programación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ERA-1008", nombre: "Dibujo", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 1, clave: "ERF-1013", nombre: "Fuentes Renovables de Energía", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // --- Semestre 2 ---
  { semestre_recomendado: 2, clave: "ERF-1004", nombre: "Bioquímica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "AEF-1020", nombre: "Electromagnetismo", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 2, clave: "ERF-1010", nombre: "Estadística y Diseño de Experimentos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // --- Semestre 3 ---
  { semestre_recomendado: 3, clave: "ERF-1021", nombre: "Microbiología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "ERF-1030", nombre: "Taller de Sistemas de Información Geográfica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "ERF-1031", nombre: "Tecnología e Ingeniería de Materiales", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "ERF-1011", nombre: "Estática y Dinámica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "ERF-1020", nombre: "Metrología Mecánica y Eléctrica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // --- Semestre 4 ---
  { semestre_recomendado: 4, clave: "ERF-1026", nombre: "Resistencia de Materiales", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "ERF-1032", nombre: "Termodinámica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "ERI-1007", nombre: "Comportamiento Humano en las Organizaciones", cadena_creditos: "4-0-4", horas_teoria: 4, horas_practica: 0, creditos: 4 },
  { semestre_recomendado: 4, clave: "ERF-1022", nombre: "Óptica y Semiconductores", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "ACF-0905", nombre: "Ecuaciones Diferenciales", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 4, clave: "ERF-1005", nombre: "Circuitos Eléctricos I", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // --- Semestre 5 ---
  { semestre_recomendado: 5, clave: "ERF-1003", nombre: "Biocombustibles", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "ERO-1018", nombre: "Marco Jurídico en Gestión Energética", cadena_creditos: "0-3-3", horas_teoria: 0, horas_practica: 3, creditos: 3 },
  { semestre_recomendado: 5, clave: "ERF-1019", nombre: "Mecánica de Fluidos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "ERF-1025", nombre: "Refrigeración y Aire Acondicionado", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "ERF-1006", nombre: "Circuitos Eléctricos II", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 5, clave: "ERF-1029", nombre: "Sistemas Térmicos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // --- Semestre 6 ---
  { semestre_recomendado: 6, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 6, clave: "ERF-1016", nombre: "Máquinas Eléctricas", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "AEF-1038", nombre: "Instrumentación", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "ERF-1028", nombre: "Energía Eólica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "ERF-1015", nombre: "Instalaciones Eléctricas e Iluminación", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // --- Semestre 7 ---
  { semestre_recomendado: 7, clave: "ERD-1028", nombre: "Sistemas Solares Fotovoltaicos y Térmicos", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 7, clave: "ERC-1027", nombre: "Simulación de Sistemas de Energías Renovables", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 7, clave: "ERC-1014", nombre: "Gestión de Empresas de Energías Renovables", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // --- Semestre 8 ---
  { semestre_recomendado: 8, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 8, clave: "ERO-1002", nombre: "Auditoría Energética", cadena_creditos: "0-3-3", horas_teoria: 0, horas_practica: 3, creditos: 3 },

  // --- Semestre 9 ---
  { semestre_recomendado: 9, clave: "ERC-1012", nombre: "Formulación y Evaluación de Proyectos de Energías Renovables", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 9, clave: "ERI-1001", nombre: "Residencia Profesional", cadena_creditos: "4-0-4", horas_teoria: 4, horas_practica: 0, creditos: 4 },
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

      console.log("Materia guardada:", materia.clave, materia.nombre);
    }

    console.log("Materias IENR-2010-217 insertadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
