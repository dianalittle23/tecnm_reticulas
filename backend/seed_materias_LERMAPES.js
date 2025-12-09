// backend/seed_materias_ITLerma_ipes_2010_223.js
const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";
const TEC_NOMBRE = "Instituto Tecnológico de Lerma";
const CARRERA_NOMBRE = "Ingeniería en Pesquerías";
const PLAN_ANIO = 2010;

const materiasDatos = [
  // Semestre 1
  { semestre: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena: "3-2-5" },
  { semestre: 1, clave: "PSD-1031", nombre: "Química I", cadena: "2-3-5" },
  { semestre: 1, clave: "PSD-1003", nombre: "Biología Acuática", cadena: "2-3-5" },
  { semestre: 1, clave: "PSC-1037", nombre: "Tecnologías de la Información", cadena: "2-2-4" },
  { semestre: 1, clave: "PSC-1029", nombre: "Problemática Acuícola y Pesquera", cadena: "2-2-4" },
  { semestre: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena: "0-4-4" },
  { semestre: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena: "2-2-4" },
  // Semestre 2
  { semestre: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena: "3-2-5" },
  { semestre: 2, clave: "PSD-1032", nombre: "Química II", cadena: "2-3-5" },
  { semestre: 2, clave: "PSC-1007", nombre: "Ecología", cadena: "2-2-4" },
  { semestre: 2, clave: "PSC-1006", nombre: "Dibujo Industrial", cadena: "2-2-4" },
  { semestre: 2, clave: "PSC-1035", nombre: "Seguridad e Higiene Industrial", cadena: "2-2-4" },
  { semestre: 2, clave: "PSC-1033", nombre: "Recursos Pesqueros y Acuícolas", cadena: "2-2-4" },
  { semestre: 2, clave: "PSC-1012", nombre: "Física I", cadena: "2-2-4" },
  // Semestre 3
  { semestre: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena: "3-2-5" },
  { semestre: 3, clave: "PSD-1004", nombre: "Bioquímica", cadena: "2-3-5" },
  { semestre: 3, clave: "PSC-1005", nombre: "Ciencia y Tecnología de los Materiales Pesqueros", cadena: "2-2-4" },
  { semestre: 3, clave: "PSH-1024", nombre: "Natación y Buceo", cadena: "1-3-4" },
  { semestre: 3, clave: "PSC-1026", nombre: "Oceanografía General", cadena: "2-2-4" },
  { semestre: 3, clave: "PSC-1030", nombre: "Proceso Administrativo y Calidad", cadena: "2-2-4" },
  { semestre: 3, clave: "PSH-1019", nombre: "Introducción a los Sistemas de Producción Acuícola", cadena: "1-3-4" },
  // Semestre 4
  { semestre: 4, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena: "3-2-5" },
  { semestre: 4, clave: "PSC-1028", nombre: "Probabilidad y Estadística", cadena: "2-2-4" },
  { semestre: 4, clave: "PSD-1018", nombre: "Introducción a la Tecnología Pesquera", cadena: "2-3-5" },
  { semestre: 4, clave: "PSC-1013", nombre: "Física II", cadena: "2-2-4" },
  { semestre: 4, clave: "PSH-1027", nombre: "Oceanografía Pesquera y Meteorología", cadena: "1-3-4" },
  { semestre: 4, clave: "PSC-1008", nombre: "Economía", cadena: "2-2-4" },
  // Semestre 5
  { semestre: 5, clave: "PSD-1021", nombre: "Mecánica de Fluidos", cadena: "2-3-5" },
  { semestre: 5, clave: "PSH-1011", nombre: "Estadística Aplicada", cadena: "1-3-4" },
  { semestre: 5, clave: "PSH-1002", nombre: "Artes de Pesca Menores", cadena: "1-3-4" },
  { semestre: 5, clave: "PSC-1009", nombre: "Electricidad y Magnetismo", cadena: "2-2-4" },
  { semestre: 5, clave: "PSC-1034", nombre: "Resistencia de Materiales", cadena: "2-2-4" },
  { semestre: 5, clave: "PSM-1023", nombre: "Microbiología", cadena: "2-4-6" },
  { semestre: 5, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena: "2-3-5" },
  // Semestre 6
  { semestre: 6, clave: "PSD-1010", nombre: "Equipo Electrónico de Apoyo a la Pesca y Acuicultura", cadena: "2-3-5" },
  { semestre: 6, clave: "PSC-1015", nombre: "Fundamentos de Dinámica Poblacional", cadena: "2-2-4" },
  { semestre: 6, clave: "PSC-1001", nombre: "Administración y Control de la Producción", cadena: "2-2-4" },
  { semestre: 6, clave: "PSC-1022", nombre: "Métodos Numéricos", cadena: "2-2-4" },
  { semestre: 6, clave: "PSC-1020", nombre: "Manejo y Conservación de Productos Pesqueros y Acuícolas", cadena: "2-2-4" },
  { semestre: 6, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena: "0-4-4" },
  // Semestre 7
  { semestre: 7, clave: "PSH-1036", nombre: "Sistemas de Información Geográfica y Sensores Remotos", cadena: "1-3-4" },
  { semestre: 7, clave: "PSC-1025", nombre: "Normatividad Pesquera y Acuícola", cadena: "2-2-4" },
  { semestre: 7, clave: "PSC-1016", nombre: "Ingeniería Económica", cadena: "2-2-4" },
  { semestre: 7, clave: "PSC-1017", nombre: "Ingeniería Sanitaria", cadena: "2-2-4" },
  { semestre: 7, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena: "0-4-4" },
  // Semestre 8
  { semestre: 8, clave: "PSM-1014", nombre: "Formulación e Investigación de Proyectos", cadena: "2-4-6" },
  // Semestre 9
  { semestre: 9, clave: "RES-IPES-2010-223", nombre: "Residencia Profesional", cadena: "0-0-10" }
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
    console.log("Finalizado Pesquerías.");
  } catch (err) { console.error(err); } finally { await mongoose.disconnect(); }
}
main();