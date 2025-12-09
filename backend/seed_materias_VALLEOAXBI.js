// backend/seed_materias_ITValleOaxaca_lbio_2010_233.js
const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";
const TEC_NOMBRE = "Instituto Tecnológico del Valle de Oaxaca";
const CARRERA_NOMBRE = "Licenciatura en Biología";
const PLAN_ANIO = 2010;

const materiasDatos = [
  // Semestre 1 [cite: 4938-4993]
  { semestre: 1, clave: "AEF-1019", nombre: "Edafología", cadena: "3-2-5" },
  { semestre: 1, clave: "LBG-1030", nombre: "Química", cadena: "3-3-6" },
  { semestre: 1, clave: "LBE-1008", nombre: "Biología I", cadena: "3-1-4" },
  { semestre: 1, clave: "LBS-1025", nombre: "Matemáticas", cadena: "5-0-5" },
  { semestre: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena: "0-4-4" },
  { semestre: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena: "2-2-4" },
  // Semestre 2 [cite: 4946-4996]
  { semestre: 2, clave: "LBD-1002", nombre: "Bioestadística I", cadena: "2-3-5" },
  { semestre: 2, clave: "LBC-1029", nombre: "Protozoología", cadena: "2-2-4" },
  { semestre: 2, clave: "LBG-1009", nombre: "Biología II", cadena: "3-3-6" },
  { semestre: 2, clave: "LBF-1004", nombre: "Biofísica", cadena: "3-2-5" },
  { semestre: 2, clave: "LBG-1010", nombre: "Bioquímica", cadena: "3-3-6" },
  // Semestre 3 [cite: 4952-4999]
  { semestre: 3, clave: "LBD-1003", nombre: "Bioestadística II", cadena: "2-3-5" },
  { semestre: 3, clave: "LBG-1024", nombre: "Invertebrados no Artrópodos", cadena: "3-3-6" },
  { semestre: 3, clave: "LBG-1012", nombre: "Botánica Estructural", cadena: "3-3-6" },
  { semestre: 3, clave: "LBF-1026", nombre: "Meteorología y Climatología", cadena: "3-2-5" },
  { semestre: 3, clave: "LBG-1027", nombre: "Micología", cadena: "3-3-6" },
  { semestre: 3, clave: "LBG-1006", nombre: "Biología Celular", cadena: "3-3-6" },
  // Semestre 4 [cite: 4960-5004]
  { semestre: 4, clave: "LBG-1007", nombre: "Biología del Desarrollo Animal", cadena: "3-3-6" },
  { semestre: 4, clave: "LBG-1001", nombre: "Artrópodos no Insectos", cadena: "3-3-6" },
  { semestre: 4, clave: "LBM-1011", nombre: "Botánica Criptogámica", cadena: "2-4-6" },
  { semestre: 4, clave: "LBG-1028", nombre: "Microbiología", cadena: "3-3-6" },
  { semestre: 4, clave: "LBC-1022", nombre: "Genética", cadena: "2-2-4" },
  // Semestre 5 [cite: 4966-5011]
  { semestre: 5, clave: "LBG-1021", nombre: "Fisiología Vegetal", cadena: "3-3-6" },
  { semestre: 5, clave: "LBG-1018", nombre: "Entomología", cadena: "3-3-6" },
  { semestre: 5, clave: "LBM-1013", nombre: "Botánica Fanerogámica", cadena: "2-4-6" },
  { semestre: 5, clave: "LBG-1023", nombre: "Genética Molecular", cadena: "3-3-6" },
  { semestre: 5, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena: "2-3-5" },
  { semestre: 5, clave: "LBG-1016", nombre: "Ecología", cadena: "3-3-6" },
  // Semestre 6 [cite: 4972-5016]
  { semestre: 6, clave: "LBG-1020", nombre: "Fisiología Animal", cadena: "3-3-6" },
  { semestre: 6, clave: "LBG-1015", nombre: "Cordados", cadena: "3-3-6" },
  { semestre: 6, clave: "LBA-1031", nombre: "Taller de Divulgación Científica y Educación Ambiental", cadena: "0-4-4" },
  { semestre: 6, clave: "LBG-1014", nombre: "Contaminación e Impacto Ambiental", cadena: "3-3-6" },
  { semestre: 6, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena: "0-4-4" },
  { semestre: 6, clave: "LBG-1017", nombre: "Ecología II", cadena: "3-3-6" },
  // Semestre 7 [cite: 4979-5019]
  { semestre: 7, clave: "LBE-1019", nombre: "Evolución", cadena: "3-1-4" },
  { semestre: 7, clave: "LBL-1005", nombre: "Biogeografía", cadena: "4-1-5" },
  { semestre: 7, clave: "LBA-1032", nombre: "Taller de Desarrollo Empresarial", cadena: "0-4-4" },
  { semestre: 7, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena: "0-4-4" },
  // Semestre 9
  { semestre: 9, clave: "RES-LBIO-2010-233", nombre: "Residencia Profesional", cadena: "0-0-10" }
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });
    if (!tec) { console.error(`Tec no encontrado: ${TEC_NOMBRE}`); return; }
    
    let carrera = await Carrera.findOne({ nombre: CARRERA_NOMBRE, tec: tec._id });
    if (!carrera) { carrera = await Carrera.create({ nombre: CARRERA_NOMBRE, tec: tec._id }); }

    for (const data of materiasDatos) {
        const [ht, hp, cr] = data.cadena.split('-').map(Number);
        await Materia.findOneAndUpdate(
            { clave: data.clave, tec: tec._id, carrera: carrera._id },
            { ...data, tec: tec._id, carrera: carrera._id, horas_teoria: ht, horas_practica: hp, creditos: cr, plan_anio: PLAN_ANIO, tipo_unidad: "Curso", area_materia: "Basica" },
            { new: true, upsert: true }
        );
        console.log(`Guardada: ${data.nombre}`);
    }
    console.log("Finalizado Biología.");
  } catch (err) { console.error(err); } finally { await mongoose.disconnect(); }
}
main();