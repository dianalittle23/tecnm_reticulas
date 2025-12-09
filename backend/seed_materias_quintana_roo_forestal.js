// backend/seed_materias_ITSMG_forestal_2010.js
//
// Inserta materias de Ingeniería Forestal IFOR-2010-226
// del Instituto Tecnológico de zona maya en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajustar nombres según BD
const TEC_NOMBRE = "Instituto Tecnológico de La Zona Maya";
const CARRERA_NOMBRE = "Ingeniería Forestal";
const PLAN_ANIO = 2010;

// Materias extraídas de la retícula IFOR-2010-226
const materiasDatos = [
  // ---------------- SEMESTRE 1 ----------------
  { semestre_recomendado: 1, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "AEQ-1064", nombre: "Tecnologías de la Información y las Comunicaciones", cadena_creditos: "1-2-3", horas_teoria: 1, horas_practica: 2, creditos: 3 },
  { semestre_recomendado: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 1, clave: "FOC-1006", nombre: "Botánica General", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 1, clave: "FOD-1004", nombre: "Bioquímica", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // ---------------- SEMESTRE 2 ----------------
  { semestre_recomendado: 2, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "FOC-1002", nombre: "Administración", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "FOD-1017", nombre: "Física", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 2, clave: "FOQ-1009", nombre: "Desarrollo Humano", cadena_creditos: "1-2-3", horas_teoria: 1, horas_practica: 2, creditos: 3 },
  { semestre_recomendado: 2, clave: "FOD-1005", nombre: "Botánica Forestal", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 2, clave: "FOD-1018", nombre: "Fisiología", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // ---------------- SEMESTRE 3 ----------------
  { semestre_recomendado: 3, clave: "ACF-0902", nombre: "Cálculo Integral", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "FOQ-1011", nombre: "Economía Forestal", cadena_creditos: "1-2-3", horas_teoria: 1, horas_practica: 2, creditos: 3 },
  { semestre_recomendado: 3, clave: "FOD-1013", nombre: "Estadística", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 3, clave: "AEF-1019", nombre: "Edafología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "AEF-1017", nombre: "Ecología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 3, clave: "FOH-1034", nombre: "Sociología Rural", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },

  // ---------------- SEMESTRE 4 ----------------
  { semestre_recomendado: 4, clave: "FOD-1008", nombre: "Dendrometría", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 4, clave: "FOD-1023", nombre: "Investigación de Operaciones", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 4, clave: "FOC-1027", nombre: "Muestreo y Regresión", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 4, clave: "FOC-1029", nombre: "Política y Legislación Forestal", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "FOC-1016", nombre: "Extensión y Divulgación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "FOC-1037", nombre: "Viveros Forestales", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------------- SEMESTRE 5 ----------------
  { semestre_recomendado: 5, clave: "FOC-1024", nombre: "Manejo del Fuego", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "FOC-1032", nombre: "Silvicultura", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "FOQ-1010", nombre: "Diseños Experimentales", cadena_creditos: "1-2-3", horas_teoria: 1, horas_practica: 2, creditos: 3 },
  { semestre_recomendado: 5, clave: "FOC-1031", nombre: "Sanidad Forestal", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "FOC-1028", nombre: "Plantaciones Forestales", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 5, clave: "FOC-1003", nombre: "Anatomía de la Madera", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // ---------------- SEMESTRE 6 ----------------
  { semestre_recomendado: 6, clave: "FOD-1012", nombre: "Epidometría", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "FOH-1030", nombre: "Rehabilitación de Ecosistemas Forestales", cadena_creditos: "1-3-4", horas_teoria: 1, horas_practica: 3, creditos: 4 },
  { semestre_recomendado: 6, clave: "FOC-1036", nombre: "Tecnología de la Madera", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 6, clave: "FOD-1014", nombre: "Evaluación de Recursos Forestales", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "FOD-1033", nombre: "Sistemas de Información Geográfica", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 6, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // ---------------- SEMESTRE 7 ----------------
  { semestre_recomendado: 7, clave: "FOD-1025", nombre: "Manejo Forestal", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 7, clave: "FOD-1001", nombre: "Abastecimiento Forestal", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 7, clave: "FOC-1026", nombre: "Mercadotecnia", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 7, clave: "FOD-1021", nombre: "Industrias Forestales", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 7, clave: "FOC-1020", nombre: "Hidrología", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 7, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // ---------------- SEMESTRE 8 ----------------
  { semestre_recomendado: 8, clave: "FOD-1015", nombre: "Evaluación de Impactos Ambientales", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 8, clave: "FOC-1035", nombre: "Taller de Formulación y Evaluación de Proyectos", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 8, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // ---------------- SEMESTRE 9 ----------------
  { semestre_recomendado: 9, clave: "RES-IFOR-2010-226", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 },
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

    console.log("Materias de Ingeniería Forestal IFOR-2010-226 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
