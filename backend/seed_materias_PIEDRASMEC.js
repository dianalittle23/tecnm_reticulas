// backend/seed_materias_ITPiedrasNegras_imct_2010_229.js
const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";
const TEC_NOMBRE = "Instituto Tecnológico de Piedras Negras";
const CARRERA_NOMBRE = "Ingeniería Mecatrónica";
const PLAN_ANIO = 2010;

const materiasDatos = [
  // Semestre 1 [cite: 5592-5603]
  { semestre: 1, clave: "AEC-1058", nombre: "Química", cadena: "2-2-4" },
  { semestre: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena: "3-2-5" },
  { semestre: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena: "0-4-4" },
  { semestre: 1, clave: "AEA-1013", nombre: "Dibujo Asistido por Computadora", cadena: "0-4-4" },
  { semestre: 1, clave: "AEC-1047", nombre: "Metrología y Normalización", cadena: "2-2-4" },
  { semestre: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena: "2-2-4" },
  // Semestre 2 [cite: 5606-5614]
  { semestre: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena: "3-2-5" },
  { semestre: 2, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena: "3-2-5" },
  { semestre: 2, clave: "MTF-1004", nombre: "Ciencia e Ingeniería de Materiales", cadena: "3-2-5" },
  { semestre: 2, clave: "MTD-1024", nombre: "Programación Básica", cadena: "2-3-5" },
  { semestre: 2, clave: "MTC-1014", nombre: "Estadística y Control de Calidad", cadena: "2-2-4" },
  { semestre: 2, clave: "MTC-1001", nombre: "Administración y Contabilidad", cadena: "2-2-4" },
  // Semestre 3 [cite: 5616-5626]
  { semestre: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena: "3-2-5" },
  { semestre: 3, clave: "MTC-1022", nombre: "Procesos de Fabricación", cadena: "2-2-4" },
  { semestre: 3, clave: "AEF-1020", nombre: "Electromagnetismo", cadena: "3-2-5" },
  { semestre: 3, clave: "MTC-1015", nombre: "Estática", cadena: "2-2-4" },
  { semestre: 3, clave: "AEC-1046", nombre: "Métodos Numéricos", cadena: "2-2-4" },
  { semestre: 3, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena: "2-3-5" },
  // Semestre 4 [cite: 5630-5637]
  { semestre: 4, clave: "ACF-0905", nombre: "Ecuaciones Diferenciales", cadena: "3-2-5" },
  { semestre: 4, clave: "MTC-1017", nombre: "Fundamentos de Termodinámica", cadena: "2-2-4" },
  { semestre: 4, clave: "MTJ-1020", nombre: "Mecánica de Materiales", cadena: "4-2-6" },
  { semestre: 4, clave: "MTC-1008", nombre: "Dinámica", cadena: "2-2-4" },
  { semestre: 4, clave: "MTJ-1002", nombre: "Análisis de Circuitos Eléctricos", cadena: "4-2-6" },
  // Semestre 5 [cite: 5641-5647]
  { semestre: 5, clave: "AEF-1040", nombre: "Máquinas Eléctricas", cadena: "3-2-5" },
  { semestre: 5, clave: "MTJ-1011", nombre: "Electrónica Analógica", cadena: "4-2-6" },
  { semestre: 5, clave: "AED-1043", nombre: "Mecanismos", cadena: "2-3-5" },
  { semestre: 5, clave: "MTC-1003", nombre: "Análisis de Fluidos", cadena: "2-2-4" },
  { semestre: 5, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena: "0-4-4" },
  // Semestre 6 [cite: 5649-5656]
  { semestre: 6, clave: "MTJ-1012", nombre: "Electrónica de Potencia Aplicada", cadena: "4-2-6" },
  { semestre: 6, clave: "AEF-1038", nombre: "Instrumentación", cadena: "3-2-5" },
  { semestre: 6, clave: "MTF-1010", nombre: "Diseño de Elementos Mecánicos", cadena: "3-2-5" },
  { semestre: 6, clave: "MTF-1013", nombre: "Electrónica Digital", cadena: "3-2-5" },
  { semestre: 6, clave: "AED-1067", nombre: "Vibraciones Mecánicas", cadena: "2-3-5" },
  { semestre: 6, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena: "0-4-4" },
  // Semestre 7 [cite: 5658-5668]
  { semestre: 7, clave: "MTF-1009", nombre: "Dinámica de Sistemas", cadena: "3-2-5" },
  { semestre: 7, clave: "MTD-1019", nombre: "Manufactura Avanzada", cadena: "2-3-5" },
  { semestre: 7, clave: "MTG-1005", nombre: "Circuitos Hidráulicos y Neumáticos", cadena: "3-3-6" },
  { semestre: 7, clave: "MTF-1018", nombre: "Mantenimiento", cadena: "3-2-5" },
  { semestre: 7, clave: "MTF-1021", nombre: "Microcontroladores", cadena: "3-2-5" },
  { semestre: 7, clave: "MTG-1023", nombre: "Programación Avanzada", cadena: "3-3-6" },
  // Semestre 8 [cite: 5671-5673]
  { semestre: 8, clave: "MTJ-1006", nombre: "Control", cadena: "4-2-6" },
  { semestre: 8, clave: "MTO-1016", nombre: "Formulación y Evaluación de Proyectos", cadena: "0-3-3" },
  { semestre: 8, clave: "MTD-1007", nombre: "Controladores Lógicos Programables", cadena: "2-3-5" },
  // Semestre 9 [cite: 5675-5676]
  { semestre: 9, clave: "MTF-1025", nombre: "Robótica", cadena: "3-2-5" },
  { semestre: 9, clave: "RES-IMCT-2010-229", nombre: "Residencia Profesional", cadena: "0-0-10" }
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });
    if (!tec) { console.error(`Tec no encontrado: ${TEC_NOMBRE}`); return; }
    
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
    console.log("Finalizado Mecatrónica.");
  } catch (err) { console.error(err); } finally { await mongoose.disconnect(); }
}
main();