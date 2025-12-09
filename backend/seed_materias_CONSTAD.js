// backend/seed_materias_ITSCiudadConstitucion_ladm.js
const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";
const TEC_NOMBRE = "Instituto Tecnológico Superior de Ciudad Constitución";
const CARRERA_NOMBRE = "Licenciatura en Administración";
const PLAN_ANIO = 2010;

const materiasDatos = [
  // Semestre 1
  { semestre: 1, clave: "LAC-1035", nombre: "Teoría General de la Administración", cadena: "2-2-4" },
  { semestre: 1, clave: "LAV-1025", nombre: "Informática para la Administración", cadena: "0-5-5" },
  { semestre: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena: "0-4-4" },
  { semestre: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena: "2-2-4" },
  { semestre: 1, clave: "LAD-1027", nombre: "Matemáticas Aplicadas a la Administración", cadena: "2-3-5" },
  { semestre: 1, clave: "LAD-1006", nombre: "Contabilidad General", cadena: "2-3-5" },
  // Semestre 2
  { semestre: 2, clave: "LAF-1019", nombre: "Función Administrativa I", cadena: "3-2-5" },
  { semestre: 2, clave: "LAD-1016", nombre: "Estadística para la Administración I", cadena: "2-3-5" },
  { semestre: 2, clave: "LAF-1010", nombre: "Derecho Laboral y Seguridad Social", cadena: "3-2-5" },
  { semestre: 2, clave: "LAC-1004", nombre: "Comunicación Corporativa", cadena: "2-2-4" },
  { semestre: 2, clave: "LAC-1034", nombre: "Taller de Desarrollo Humano", cadena: "2-2-4" },
  { semestre: 2, clave: "LAD-1008", nombre: "Costos de Manufactura", cadena: "2-3-5" },
  // Semestre 3
  { semestre: 3, clave: "LAD-1020", nombre: "Función Administrativa II", cadena: "2-3-5" },
  { semestre: 3, clave: "LAD-1017", nombre: "Estadística para la Administración II", cadena: "2-3-5" },
  { semestre: 3, clave: "LAD-1009", nombre: "Derecho Empresarial", cadena: "2-3-5" },
  { semestre: 3, clave: "LAD-1003", nombre: "Comportamiento Organizacional", cadena: "2-3-5" },
  { semestre: 3, clave: "LAC-1013", nombre: "Dinámica Social", cadena: "2-2-4" },
  { semestre: 3, clave: "LAD-1007", nombre: "Contabilidad Gerencial", cadena: "2-3-5" },
  // Semestre 4
  { semestre: 4, clave: "LAD-1023", nombre: "Gestión Estratégica del Capital Humano I", cadena: "2-3-5" },
  { semestre: 4, clave: "LAD-1031", nombre: "Procesos Estructurales", cadena: "2-3-5" },
  { semestre: 4, clave: "LAD-1028", nombre: "Métodos Cuantitativos para la Administración", cadena: "2-3-5" },
  { semestre: 4, clave: "LAF-1021", nombre: "Fundamentos de Mercadotecnia", cadena: "3-2-5" },
  { semestre: 4, clave: "LAD-1014", nombre: "Economía Empresarial", cadena: "2-3-5" },
  { semestre: 4, clave: "AEF-1079", nombre: "Matemáticas Financieras", cadena: "2-2-4" },
  // Semestre 5
  { semestre: 5, clave: "LAD-1024", nombre: "Gestión Estratégica del Capital Humano II", cadena: "2-3-5" },
  { semestre: 5, clave: "AEC-1070", nombre: "Derecho Fiscal", cadena: "2-2-4" },
  { semestre: 5, clave: "AEC-1080", nombre: "Mezcla de Mercadotecnia", cadena: "2-2-4" },
  { semestre: 5, clave: "AEC-1077", nombre: "Macroeconomía", cadena: "2-2-4" },
  { semestre: 5, clave: "AED-1068", nombre: "Administración Financiera I", cadena: "2-3-5" },
  { semestre: 5, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena: "2-3-5" },
  // Semestre 6
  { semestre: 6, clave: "LAM-1022", nombre: "Gestión de la Retribución", cadena: "2-4-6" },
  { semestre: 6, clave: "LAF-1032", nombre: "Producción", cadena: "3-2-5" },
  { semestre: 6, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena: "0-4-4" },
  { semestre: 6, clave: "LAD-1033", nombre: "Sistemas de Información de Mercadotecnia", cadena: "2-3-5" },
  { semestre: 6, clave: "LAA-1026", nombre: "Innovación y Emprendedurismo", cadena: "0-4-4" },
  { semestre: 6, clave: "LAD-1002", nombre: "Administración Financiera II", cadena: "2-3-5" },
  // Semestre 7
  { semestre: 7, clave: "LAB-1029", nombre: "Plan de Negocios", cadena: "1-4-5" },
  { semestre: 7, clave: "LAC-1030", nombre: "Procesos de Dirección", cadena: "2-2-4" },
  { semestre: 7, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena: "0-4-4" },
  { semestre: 7, clave: "LAD-1001", nombre: "Administración de la Calidad", cadena: "2-3-5" },
  { semestre: 7, clave: "LAC-1015", nombre: "Economía Internacional", cadena: "2-2-4" },
  { semestre: 7, clave: "LAD-1012", nombre: "Diagnóstico y Evaluación Empresarial", cadena: "2-3-5" },
  // Semestre 8
  { semestre: 8, clave: "LAC-1005", nombre: "Consultoría Empresarial", cadena: "2-2-4" },
  { semestre: 8, clave: "LAD-1018", nombre: "Formulación y Evaluación de Proyectos", cadena: "2-3-5" },
  { semestre: 8, clave: "LAD-1011", nombre: "Desarrollo Organizacional", cadena: "2-3-5" },
  // Semestre 9
  { semestre: 9, clave: "RES-LADM-2010-234", nombre: "Residencia Profesional", cadena: "0-0-10" }
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });
    if (!tec) { console.error(`Tec no encontrado: ${TEC_NOMBRE}`); return; }
    const carrera = await Carrera.findOne({ nombre: CARRERA_NOMBRE, tec: tec._id });
    if (!carrera) { console.error(`Carrera no encontrada: ${CARRERA_NOMBRE}`); return; }

    for (const data of materiasDatos) {
        const [ht, hp, cr] = data.cadena.split('-').map(Number);
        await Materia.findOneAndUpdate(
            { clave: data.clave, tec: tec._id, carrera: carrera._id },
            { ...data, tec: tec._id, carrera: carrera._id, horas_teoria: ht, horas_practica: hp, creditos: cr, plan_anio: PLAN_ANIO, tipo_unidad: "Curso", area_materia: "Basica" },
            { new: true, upsert: true }
        );
        console.log(`Guardada: ${data.nombre}`);
    }
    console.log("Finalizado Administración.");
  } catch (err) { console.error(err); } finally { await mongoose.disconnect(); }
}
main();