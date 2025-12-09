// backend/seed_materias_ITSCiudadConstitucion_iind.js
const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";
const TEC_NOMBRE = "Instituto Tecnológico Superior de Ciudad Constitución";
const CARRERA_NOMBRE = "Ingeniería Industrial";
const PLAN_ANIO = 2010;

const materiasDatos = [
  // Semestre 1
  { semestre: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena: "2-2-4" },
  { semestre: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena: "0-4-4" },
  { semestre: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena: "3-2-5" },
  { semestre: 1, clave: "INH-1029", nombre: "Taller de Herramientas Intelectuales", cadena: "1-3-4" },
  { semestre: 1, clave: "INC-1025", nombre: "Química", cadena: "2-2-4" },
  { semestre: 1, clave: "INN-1008", nombre: "Dibujo Industrial", cadena: "0-6-6" },
  // Semestre 2
  { semestre: 2, clave: "INC-1009", nombre: "Electricidad y Electrónica Industrial", cadena: "2-2-4" },
  { semestre: 2, clave: "INC-1024", nombre: "Propiedades de los Materiales", cadena: "2-2-4" },
  { semestre: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena: "3-2-5" },
  { semestre: 2, clave: "AEC-1053", nombre: "Probabilidad y Estadística", cadena: "2-2-4" },
  { semestre: 2, clave: "INQ-1006", nombre: "Análisis de la Realidad Nacional", cadena: "1-2-3" },
  { semestre: 2, clave: "INC-1030", nombre: "Taller de Liderazgo", cadena: "2-2-4" },
  // Semestre 3
  { semestre: 3, clave: "AEC-1048", nombre: "Metrología y Normalización", cadena: "2-2-4" },
  { semestre: 3, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena: "3-2-5" },
  { semestre: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena: "3-2-5" },
  { semestre: 3, clave: "AEC-1018", nombre: "Economía", cadena: "2-2-4" },
  { semestre: 3, clave: "AEF-1024", nombre: "Estadística Inferencial I", cadena: "3-2-5" },
  { semestre: 3, clave: "INJ-1011", nombre: "Estudio del Trabajo I", cadena: "4-2-6" },
  // Semestre 4
  { semestre: 4, clave: "INC-1023", nombre: "Procesos de Fabricación", cadena: "2-2-4" },
  { semestre: 4, clave: "INC-1013", nombre: "Física", cadena: "2-2-4" },
  { semestre: 4, clave: "INC-1005", nombre: "Algoritmos y Lenguajes de Programación", cadena: "2-2-4" },
  { semestre: 4, clave: "INC-1018", nombre: "Investigación de Operaciones I", cadena: "2-2-4" },
  { semestre: 4, clave: "AEF-1025", nombre: "Estadística Inferencial II", cadena: "3-2-5" },
  { semestre: 4, clave: "INJ-1012", nombre: "Estudio del Trabajo II", cadena: "4-2-6" },
  { semestre: 4, clave: "INF-1016", nombre: "Higiene y Seguridad Industrial", cadena: "3-2-5" },
  // Semestre 5
  { semestre: 5, clave: "INR-1003", nombre: "Administración de Proyectos", cadena: "2-1-3" },
  { semestre: 5, clave: "AEC-1392", nombre: "Gestión de Costos", cadena: "2-2-4" },
  { semestre: 5, clave: "INC-1001", nombre: "Administración de las Operaciones I", cadena: "2-2-4" },
  { semestre: 5, clave: "INC-1019", nombre: "Investigación de Operaciones II", cadena: "2-2-4" },
  { semestre: 5, clave: "INF-1007", nombre: "Control Estadístico de la Calidad", cadena: "3-2-5" },
  { semestre: 5, clave: "INF-1010", nombre: "Ergonomía", cadena: "3-2-5" },
  { semestre: 5, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena: "2-3-5" },
  // Semestre 6
  { semestre: 6, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena: "0-4-4" },
  { semestre: 6, clave: "AEC-1037", nombre: "Ingeniería Económica", cadena: "2-2-4" },
  { semestre: 6, clave: "INC-1002", nombre: "Administración de las Operaciones II", cadena: "2-2-4" },
  { semestre: 6, clave: "INC-1027", nombre: "Simulación", cadena: "2-2-4" },
  { semestre: 6, clave: "INC-1004", nombre: "Administración del Mantenimiento", cadena: "2-2-4" },
  { semestre: 6, clave: "AED-1044", nombre: "Mercadotecnia", cadena: "2-3-5" },
  // Semestre 7
  { semestre: 7, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena: "0-4-4" },
  { semestre: 7, clave: "INC-1021", nombre: "Planeación Financiera", cadena: "2-2-4" },
  { semestre: 7, clave: "INC-1022", nombre: "Planeación y Diseño de Instalaciones", cadena: "2-2-4" },
  { semestre: 7, clave: "INF-1028", nombre: "Sistemas de Manufactura", cadena: "3-2-5" },
  { semestre: 7, clave: "INH-1020", nombre: "Logística y Cadenas de Suministro", cadena: "1-3-4" },
  { semestre: 7, clave: "INC-1015", nombre: "Gestión de los Sistemas de Calidad", cadena: "2-2-4" },
  { semestre: 7, clave: "INR-1017", nombre: "Ingeniería de Sistemas", cadena: "2-1-3" },
  // Semestre 8
  { semestre: 8, clave: "AED-1030", nombre: "Formulación y Evaluación de Proyectos", cadena: "2-3-5" },
  { semestre: 8, clave: "INC-1026", nombre: "Relaciones Industriales", cadena: "2-2-4" },
  // Semestre 9
  { semestre: 9, clave: "RES-IIND-2010-227", nombre: "Residencia Profesional", cadena: "0-0-10" }
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
    console.log("Finalizado Industrial.");
  } catch (err) { console.error(err); } finally { await mongoose.disconnect(); }
}
main();