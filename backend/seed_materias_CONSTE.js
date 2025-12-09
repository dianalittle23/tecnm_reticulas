// backend/seed_materias_ITSCiudadConstitucion_ieme.js
const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";
const TEC_NOMBRE = "Instituto Tecnológico Superior de Ciudad Constitución";
const CARRERA_NOMBRE = "Ingeniería Electromecánica";
const PLAN_ANIO = 2010;

const materiasDatos = [
  // Semestre 1
  { semestre: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena: "0-4-4" },
  { semestre: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena: "3-2-5" },
  { semestre: 1, clave: "EMH-1016", nombre: "Introducción a la Programación", cadena: "1-3-4" },
  { semestre: 1, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena: "2-3-5" },
  { semestre: 1, clave: "AEC-1058", nombre: "Química", cadena: "2-2-4" },
  { semestre: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena: "2-2-4" },
  // Semestre 2
  { semestre: 2, clave: "EME-1012", nombre: "Estática", cadena: "3-1-4" },
  { semestre: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena: "3-2-5" },
  { semestre: 2, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena: "3-2-5" },
  { semestre: 2, clave: "AEC-1047", nombre: "Metrología y Normalización", cadena: "2-2-4" },
  { semestre: 2, clave: "EME-1028", nombre: "Tecnología de los Materiales", cadena: "3-1-4" },
  { semestre: 2, clave: "AEF-1390", nombre: "Dibujo Electromecánico", cadena: "3-2-5" },
  // Semestre 3
  { semestre: 3, clave: "EME-1008", nombre: "Dinámica", cadena: "3-1-4" },
  { semestre: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena: "3-2-5" },
  { semestre: 3, clave: "EMC-1022", nombre: "Procesos de Manufactura", cadena: "2-2-4" },
  { semestre: 3, clave: "EMC-1011", nombre: "Electricidad y Magnetismo", cadena: "2-2-4" },
  { semestre: 3, clave: "EMJ-1021", nombre: "Mecánica de Materiales", cadena: "4-2-6" },
  { semestre: 3, clave: "AEE-1051", nombre: "Probabilidad y Estadística", cadena: "3-1-4" },
  // Semestre 4
  { semestre: 4, clave: "EME-1005", nombre: "Análisis y Síntesis de Mecanismos", cadena: "3-1-4" },
  { semestre: 4, clave: "ACF-0905", nombre: "Ecuaciones Diferenciales", cadena: "3-2-5" },
  { semestre: 4, clave: "EME-1029", nombre: "Termodinámica", cadena: "3-1-4" },
  { semestre: 4, clave: "EMF-1004", nombre: "Análisis de Circuitos Eléctricos de CD", cadena: "3-2-5" },
  { semestre: 4, clave: "EME-1020", nombre: "Mecánica de Fluidos", cadena: "3-1-4" },
  { semestre: 4, clave: "AEF-1021", nombre: "Electrónica Analógica", cadena: "3-2-5" },
  // Semestre 5
  { semestre: 5, clave: "EMF-1009", nombre: "Diseño de Elementos de Máquinas", cadena: "3-2-5" },
  { semestre: 5, clave: "EMC-1010", nombre: "Diseño e Ingeniería Asistidos por Computadora", cadena: "2-2-4" },
  { semestre: 5, clave: "EME-1030", nombre: "Transferencia de Calor", cadena: "3-1-4" },
  { semestre: 5, clave: "EMF-1003", nombre: "Análisis de Circuitos Eléctricos de CA", cadena: "3-2-5" },
  { semestre: 5, clave: "EMJ-1026", nombre: "Sistemas y Máquinas de Fluidos", cadena: "4-2-6" },
  { semestre: 5, clave: "AEC-1022", nombre: "Electrónica Digital", cadena: "2-2-4" },
  // Semestre 6
  { semestre: 6, clave: "EMC-1018", nombre: "Máquinas y Equipos Térmicos I", cadena: "2-2-4" },
  { semestre: 6, clave: "EMJ-1002", nombre: "Ahorro de Energía", cadena: "4-2-6" },
  { semestre: 6, clave: "EMF-1015", nombre: "Instalaciones Eléctricas", cadena: "3-2-5" },
  { semestre: 6, clave: "EMJ-1017", nombre: "Máquinas Eléctricas", cadena: "4-2-6" },
  { semestre: 6, clave: "EMJ-1001", nombre: "Administración y Técnicas de Mantenimiento", cadena: "4-2-6" },
  { semestre: 6, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena: "0-4-4" },
  // Semestre 7
  { semestre: 7, clave: "EMC-1019", nombre: "Máquinas y Equipos Térmicos II", cadena: "2-2-4" },
  { semestre: 7, clave: "EMF-1024", nombre: "Sistemas Eléctricos de Potencia", cadena: "3-2-5" },
  { semestre: 7, clave: "EMF-1006", nombre: "Controles Eléctricos", cadena: "3-2-5" },
  { semestre: 7, clave: "EMJ-1014", nombre: "Ingeniería de Control Clásico", cadena: "4-2-6" },
  { semestre: 7, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena: "0-4-4" },
  // Semestre 8
  { semestre: 8, clave: "EMF-1023", nombre: "Refrigeración y Aire Acondicionado", cadena: "3-2-5" },
  { semestre: 8, clave: "EMF-1027", nombre: "Subestaciones Eléctricas", cadena: "3-2-5" },
  { semestre: 8, clave: "EMJ-1025", nombre: "Sistemas Hidráulicos y Neumáticos de Potencia", cadena: "4-2-6" },
  { semestre: 8, clave: "EMC-1013", nombre: "Formulación y Evaluación de Proyectos", cadena: "2-2-4" },
  // Semestre 9
  { semestre: 9, clave: "RES-IEME-2010-210", nombre: "Residencia Profesional", cadena: "0-0-10" }
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
    console.log("Finalizado Electromecánica.");
  } catch (err) { console.error(err); } finally { await mongoose.disconnect(); }
}
main();