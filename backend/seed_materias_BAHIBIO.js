// backend/seed_materias_biologia_LBIO_2010_233.js
//
// Inserta materias de Licenciatura en Biología LBIO-2010-233
// del Instituto Tecnológico Bahía de Banderas en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajusta estos nombres a como los tengas guardados en tu BD
const TEC_NOMBRE = "Instituto Tecnológico Bahía de Banderas";
const CARRERA_NOMBRE = "Licenciatura en Biología";
const PLAN_ANIO = 2010;

// Materias extraídas de la retícula LBIO-2010-233
// Semestre, clave, nombre, T-P-C
const materiasDatos = [
  // -------- SEMESTRE 1 --------
  { semestre_recomendado: 1, clave: "AEF-1019", nombre: "Edafología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 1, clave: "LBG-1030", nombre: "Química", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 1, clave: "LBE-1008", nombre: "Biología I", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 1, clave: "LBS-1025", nombre: "Matemáticas", cadena_creditos: "5-0-5", horas_teoria: 5, horas_practica: 0, creditos: 5 },
  { semestre_recomendado: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },

  // -------- SEMESTRE 2 --------
  { semestre_recomendado: 2, clave: "LBD-1002", nombre: "Bioestadística I", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 2, clave: "LBC-1029", nombre: "Protozoología", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 2, clave: "LBG-1009", nombre: "Biología II", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 2, clave: "LBF-1004", nombre: "Biofísica", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },
  { semestre_recomendado: 2, clave: "LBG-1010", nombre: "Bioquímica", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 2, clave: "LBF-1026", nombre: "Meteorología y Climatología", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // -------- SEMESTRE 3 --------
  { semestre_recomendado: 3, clave: "LBD-1003", nombre: "Bioestadística II", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },
  { semestre_recomendado: 3, clave: "LBG-1024", nombre: "Invertebrados no Artrópodos", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 3, clave: "LBG-1012", nombre: "Botánica Estructural", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 3, clave: "LBG-1027", nombre: "Micología", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 3, clave: "LBG-1006", nombre: "Biología Celular", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 3, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // -------- SEMESTRE 4 --------
  { semestre_recomendado: 4, clave: "LBG-1007", nombre: "Biología del Desarrollo Animal", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 4, clave: "LBG-1001", nombre: "Artrópodos no Insectos", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 4, clave: "LBM-1011", nombre: "Botánica Criptogámica", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 4, clave: "LBG-1028", nombre: "Microbiología", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 4, clave: "LBC-1022", nombre: "Genética", cadena_creditos: "2-2-4", horas_teoria: 2, horas_practica: 2, creditos: 4 },
  { semestre_recomendado: 4, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena_creditos: "2-3-5", horas_teoria: 2, horas_practica: 3, creditos: 5 },

  // -------- SEMESTRE 5 --------
  { semestre_recomendado: 5, clave: "LBG-1021", nombre: "Fisiología Vegetal", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 5, clave: "LBG-1018", nombre: "Entomología", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 5, clave: "LBM-1013", nombre: "Botánica Fanerogámica", cadena_creditos: "2-4-6", horas_teoria: 2, horas_practica: 4, creditos: 6 },
  { semestre_recomendado: 5, clave: "LBG-1023", nombre: "Genética Molecular", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 5, clave: "LBG-1014", nombre: "Contaminación e Impacto Ambiental", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 5, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },

  // -------- SEMESTRE 6 --------
  { semestre_recomendado: 6, clave: "LBG-1020", nombre: "Fisiología Animal", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 6, clave: "LBG-1015", nombre: "Cordados", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 6, clave: "LBA-1031", nombre: "Taller de Divulgación Científica y Educación Ambiental", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 6, clave: "LBG-1016", nombre: "Ecología I", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },
  { semestre_recomendado: 6, clave: "AMC-1016", nombre: "Toxicología Ambiental", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // -------- SEMESTRE 7 --------
  { semestre_recomendado: 7, clave: "LBE-1019", nombre: "Evolución", cadena_creditos: "3-1-4", horas_teoria: 3, horas_practica: 1, creditos: 4 },
  { semestre_recomendado: 7, clave: "LBL-1005", nombre: "Biogeografía", cadena_creditos: "4-1-5", horas_teoria: 4, horas_practica: 1, creditos: 5 },
  { semestre_recomendado: 7, clave: "LBA-1032", nombre: "Taller de Desarrollo Empresarial", cadena_creditos: "0-4-4", horas_teoria: 0, horas_practica: 4, creditos: 4 },
  { semestre_recomendado: 7, clave: "LBG-1017", nombre: "Ecología II", cadena_creditos: "3-3-6", horas_teoria: 3, horas_practica: 3, creditos: 6 },

  // -------- SEMESTRE 8 --------
  { semestre_recomendado: 8, clave: "AEF-1029", nombre: "Ingeniería de Proyectos", cadena_creditos: "3-2-5", horas_teoria: 3, horas_practica: 2, creditos: 5 },

  // -------- SEMESTRE 9 (RESIDENCIA) --------
  { semestre_recomendado: 9, clave: "RES-LBIO-2010-233", nombre: "Residencia Profesional", cadena_creditos: "0-0-10", horas_teoria: 0, horas_practica: 0, creditos: 10 }
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

      console.log("Materia guardada:", materia.semestre_recomendado, materia.clave, "-", materia.nombre);
    }

    console.log("Materias LBIO-2010-233 guardadas correctamente.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
