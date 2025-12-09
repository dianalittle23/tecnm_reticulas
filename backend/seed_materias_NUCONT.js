// backend/seed_materias_ITLinares_COPU_2010_205.js
//
// Inserta materias de Contador Público COPU-2010-205
// del Instituto Tecnológico de Linares en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Nombres según tu base de datos
const TEC_NOMBRE = "Instituto Tecnológico de Linares";
const CARRERA_NOMBRE = "Contador Público";
const PLAN_ANIO = 2010;

// -------- MATERIAS COPU-2010-205 --------
// Semestre, clave, nombre, T-P-C

const materiasDatos = [
  // ---------------- SEMESTRE 1 ----------------
  { semestre_recomendado: 1, clave: "CPM-1030", nombre: "Introducción a la Contabilidad Financiera", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 1, clave: "CPC-1001", nombre: "Administración", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "CPC-1025", nombre: "Fundamentos de Derecho", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "CPC-1018", nombre: "Desarrollo Humano", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "CPC-1009", nombre: "Comunicación Humana", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------------- SEMESTRE 2 ----------------
  { semestre_recomendado: 2, clave: "CPM-1012", nombre: "Contabilidad Financiera I", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 2, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 2, clave: "CPD-1008", nombre: "Cálculo Diferencial e Integral", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 2, clave: "CPC-1016", nombre: "Derecho Mercantil", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "CPC-1019", nombre: "Dinámica Social", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "CPC-1022", nombre: "Estadística Administrativa I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "CPC-1040", nombre: "Taller de Informática I", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------------- SEMESTRE 3 ----------------
  { semestre_recomendado: 3, clave: "CPM-1013", nombre: "Contabilidad Financiera II", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 3, clave: "CPC-1033", nombre: "Mercadotecnia", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "CPC-1032", nombre: "Matemáticas Financieras", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "CPC-1015", nombre: "Derecho Laboral y Seguridad Social", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "CPC-1026", nombre: "Gestión del Talento Humano", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "CPC-1023", nombre: "Estadística Administrativa II", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 3, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // ---------------- SEMESTRE 4 ----------------
  { semestre_recomendado: 4, clave: "CPD-1011", nombre: "Contabilidad de Sociedades", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 4, clave: "CPD-1038", nombre: "Sistemas de Costos Históricos", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 4, clave: "CPC-1034", nombre: "Microeconomía", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "CPJ-1017", nombre: "Derecho Tributario", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "CPC-1005", nombre: "Análisis e Interpretación de Estados Financieros", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 4, clave: "CPC-1003", nombre: "Administración de la Producción y de las Operaciones", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------------- SEMESTRE 5 ----------------
  { semestre_recomendado: 5, clave: "CPD-1010", nombre: "Contabilidad Avanzada", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "CPD-1039", nombre: "Sistemas de Costos Predeterminados", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 5, clave: "CPC-1031", nombre: "Macroeconomía", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "CPJ-1028", nombre: "Impuestos Personas Morales", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },
  { semestre_recomendado: 5, clave: "CPC-1024", nombre: "Fundamentos de Auditoría", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 5, clave: "CPC-1036", nombre: "Planeación Financiera", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------------- SEMESTRE 6 ----------------
  { semestre_recomendado: 6, clave: "CPD-1014", nombre: "Contabilidad Internacional", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "CPF-1027", nombre: "Gestión y Toma de Decisiones", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 6, clave: "CPH-1021", nombre: "Elaboración y Evaluación de Proyectos de Inversión", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 6, clave: "CPJ-1029", nombre: "Impuestos Personas Físicas", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },
  { semestre_recomendado: 6, clave: "CPD-1006", nombre: "Auditoría para Efectos Financieros", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "CPC-1020", nombre: "Economía Internacional", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 6, clave: "CPA-1041", nombre: "Taller de Informática II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // ---------------- SEMESTRE 7 ----------------
  { semestre_recomendado: 7, clave: "CPO-1037", nombre: "Seminario de Contaduría", cadena_creditos: "0-3-3", horas_teoria: 0, horas_practica: 3, creditos: 3 },
  { semestre_recomendado: 7, clave: "CPJ-1035", nombre: "Otros Impuestos y Contribuciones", cadena_creditos: "4-2-6", horas_teoria: 4, horas_practica: 2, creditos: 6 },
  { semestre_recomendado: 7, clave: "CPD-1007", nombre: "Auditoría para Efectos Fiscales", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 7, clave: "CPC-1004", nombre: "Alternativas de Inversión y Financiamiento", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------------- SEMESTRE 8 ----------------
  // Especialidad (no incluida en PDF)
  // Puedes agregarla después si me mandas el PDF de especialidad.

  // ---------------- SEMESTRE 9 ----------------
  { semestre_recomendado: 9, clave: "RES-COPU-2010-205", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 },
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado a MongoDB");

    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });
    if (!tec) return console.error("No se encontró el Tec.");

    const carrera = await Carrera.findOne({ nombre: CARRERA_NOMBRE, tec: tec._id });
    if (!carrera) return console.error("No se encontró la carrera.");

    console.log("Tec:", tec.nombre);
    console.log("Carrera:", carrera.nombre);

    for (const data of materiasDatos) {
      const materia = await Materia.findOneAndUpdate(
        {
          clave: data.clave,
          tec: tec._id,
          carrera: carrera._id,
        },
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

      console.log(`Materia guardada: Sem ${materia.semestre_recomendado} - ${materia.clave} - ${materia.nombre}`);
    }

    console.log("Materias de Contador Público COPU-2010-205 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
