// backend/seed_materias_ITPiedrasNegras_copu_2010_205.js
const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";
const TEC_NOMBRE = "Instituto Tecnológico de Piedras Negras";
const CARRERA_NOMBRE = "Contador Público";
const PLAN_ANIO = 2010;

const materiasDatos = [
  // Semestre 1 [cite: 3608-3618]
  { semestre: 1, clave: "CPM-1030", nombre: "Introducción a la Contabilidad Financiera", cadena: "2-4-6" },
  { semestre: 1, clave: "CPC-1001", nombre: "Administración", cadena: "2-2-4" },
  { semestre: 1, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena: "3-2-5" },
  { semestre: 1, clave: "CPC-1025", nombre: "Fundamentos de Derecho", cadena: "2-2-4" },
  { semestre: 1, clave: "CPC-1018", nombre: "Desarrollo Humano", cadena: "2-2-4" },
  { semestre: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena: "2-2-4" },
  // Semestre 2 [cite: 3619-3627]
  { semestre: 2, clave: "CPM-1012", nombre: "Contabilidad Financiera I", cadena: "2-4-6" },
  { semestre: 2, clave: "ACA-0907", nombre: "Taller de Ética", cadena: "0-4-4" },
  { semestre: 2, clave: "CPD-1008", nombre: "Cálculo Diferencial e Integral", cadena: "2-3-5" },
  { semestre: 2, clave: "CPC-1016", nombre: "Derecho Mercantil", cadena: "2-2-4" },
  { semestre: 2, clave: "CPC-1019", nombre: "Dinámica Social", cadena: "2-2-4" },
  { semestre: 2, clave: "CPC-1022", nombre: "Estadística Administrativa I", cadena: "2-2-4" },
  { semestre: 2, clave: "CPC-1009", nombre: "Comunicación Humana", cadena: "2-2-4" },
  // Semestre 3 [cite: 3629-3637]
  { semestre: 3, clave: "CPM-1013", nombre: "Contabilidad Financiera II", cadena: "2-4-6" },
  { semestre: 3, clave: "CPC-1033", nombre: "Mercadotecnia", cadena: "2-2-4" },
  { semestre: 3, clave: "CPC-1032", nombre: "Matemáticas Financieras", cadena: "2-2-4" },
  { semestre: 3, clave: "CPC-1015", nombre: "Derecho Laboral y Seguridad Social", cadena: "2-2-4" },
  { semestre: 3, clave: "CPC-1026", nombre: "Gestión del Talento Humano", cadena: "2-2-4" },
  { semestre: 3, clave: "CPC-1023", nombre: "Estadística Administrativa II", cadena: "2-2-4" },
  { semestre: 3, clave: "CPC-1040", nombre: "Taller de Informática I", cadena: "2-2-4" },
  // Semestre 4 [cite: 3640-3650]
  { semestre: 4, clave: "CPD-1011", nombre: "Contabilidad de Sociedades", cadena: "2-3-5" },
  { semestre: 4, clave: "CPD-1038", nombre: "Sistemas de Costos Históricos", cadena: "2-3-5" },
  { semestre: 4, clave: "CPC-1034", nombre: "Microeconomía", cadena: "2-2-4" },
  { semestre: 4, clave: "CPC-1017", nombre: "Derecho Tributario", cadena: "2-2-4" },
  { semestre: 4, clave: "CPC-1005", nombre: "Análisis e Interpretación de Estados Financieros", cadena: "2-2-4" },
  { semestre: 4, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena: "0-4-4" },
  { semestre: 4, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena: "2-3-5" },
  // Semestre 5 [cite: 3652-3660]
  { semestre: 5, clave: "CPD-1010", nombre: "Contabilidad Avanzada", cadena: "2-3-5" },
  { semestre: 5, clave: "CPD-1039", nombre: "Sistemas de Costos Predeterminados", cadena: "2-3-5" },
  { semestre: 5, clave: "CPC-1031", nombre: "Macroeconomía", cadena: "2-2-4" },
  { semestre: 5, clave: "CPJ-1028", nombre: "Impuestos Personas Morales", cadena: "4-2-6" },
  { semestre: 5, clave: "CPC-1024", nombre: "Fundamentos de Auditoría", cadena: "2-2-4" },
  { semestre: 5, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena: "0-4-4" },
  { semestre: 5, clave: "CPC-1003", nombre: "Administración de la Producción y de las Operaciones", cadena: "2-2-4" },
  // Semestre 6 [cite: 3662-3669]
  { semestre: 6, clave: "CPD-1014", nombre: "Contabilidad Internacional", cadena: "2-3-5" },
  { semestre: 6, clave: "CPF-1027", nombre: "Gestión y Toma de Decisiones", cadena: "3-2-5" },
  { semestre: 6, clave: "CPC-1002", nombre: "Administración Estratégica", cadena: "2-2-4" },
  { semestre: 6, clave: "CPJ-1029", nombre: "Impuestos Personas Físicas", cadena: "4-2-6" },
  { semestre: 6, clave: "CPD-1006", nombre: "Auditoría para Efectos Financieros", cadena: "2-3-5" },
  { semestre: 6, clave: "CPC-1020", nombre: "Economía Internacional", cadena: "2-2-4" },
  { semestre: 6, clave: "CPC-1036", nombre: "Planeación Financiera", cadena: "2-2-4" },
  // Semestre 7 [cite: 3671-3679]
  { semestre: 7, clave: "CPO-1037", nombre: "Seminario de Contaduría", cadena: "0-3-3" },
  { semestre: 7, clave: "CPH-1021", nombre: "Elaboración y Evaluación de Proyectos de Inversión", cadena: "1-3-4" },
  { semestre: 7, clave: "CPJ-1035", nombre: "Otros Impuestos y Contribuciones", cadena: "4-2-6" },
  { semestre: 7, clave: "CPD-1007", nombre: "Auditoría para Efectos Fiscales", cadena: "2-3-5" },
  { semestre: 7, clave: "CPA-1041", nombre: "Taller de Informática II", cadena: "0-4-4" },
  { semestre: 7, clave: "CPC-1004", nombre: "Alternativas de Inversión y Financiamiento", cadena: "2-2-4" },
  // Semestre 9
  { semestre: 9, clave: "RES-COPU-2010-205", nombre: "Residencia Profesional", cadena: "0-0-10" }
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });
    if (!tec) { console.error(`Tec no encontrado: ${TEC_NOMBRE}`); return; }
    
    // Crear carrera si no existe
    let carrera = await Carrera.findOne({ nombre: CARRERA_NOMBRE, tec: tec._id });
    if (!carrera) { 
        carrera = await Carrera.create({ nombre: CARRERA_NOMBRE, tec: tec._id });
        console.log(`Carrera creada: ${CARRERA_NOMBRE}`);
    }

    for (const data of materiasDatos) {
        const [ht, hp, cr] = data.cadena.split('-').map(Number);
        await Materia.findOneAndUpdate(
            { clave: data.clave, tec: tec._id, carrera: carrera._id },
            { ...data, tec: tec._id, carrera: carrera._id, horas_teoria: ht, horas_practica: hp, creditos: cr, plan_anio: PLAN_ANIO, tipo_unidad: "Curso", area_materia: "Basica" },
            { new: true, upsert: true }
        );
        console.log(`Guardada: ${data.nombre}`);
    }
    console.log("Finalizado Contador Público.");
  } catch (err) { console.error(err); } finally { await mongoose.disconnect(); }
}
main();