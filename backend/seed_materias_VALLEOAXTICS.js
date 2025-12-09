// backend/seed_materias_ITValleOaxaca_itic_2010_225.js
const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";
const TEC_NOMBRE = "Instituto Tecnológico del Valle de Oaxaca";
const CARRERA_NOMBRE = "Ingeniería en Tecnologías de la Información y Comunicaciones";
const PLAN_ANIO = 2010;

const materiasDatos = [
  // Semestre 1 [cite: 5-17]
  { semestre: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena: "3-2-5" },
  { semestre: 1, clave: "AEF-1032", nombre: "Fundamentos de Programación", cadena: "3-2-5" },
  { semestre: 1, clave: "TIF-1019", nombre: "Matemáticas Discretas I", cadena: "3-2-5" },
  { semestre: 1, clave: "TIP-1017", nombre: "Introducción a las TIC's", cadena: "3-0-3" },
  { semestre: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena: "0-4-4" },
  { semestre: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena: "2-2-4" },
 // Semestre 2 [cite: 20-29]
  { semestre: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena: "3-2-5" },
  { semestre: 2, clave: "AEB-1054", nombre: "Programación Orientada a Objetos", cadena: "1-4-5" },
  { semestre: 2, clave: "TIF-1020", nombre: "Matemáticas Discretas II", cadena: "3-2-5" },
  { semestre: 2, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena: "3-2-5" },
  { semestre: 2, clave: "AEF-1052", nombre: "Probabilidad y Estadística", cadena: "3-2-5" },
  { semestre: 2, clave: "TIF-1009", nombre: "Contabilidad y Costos", cadena: "3-2-5" },
  // Semestre 3 [cite: 33-40]
  { semestre: 3, clave: "TID-1012", nombre: "Estructuras y Organización de Datos", cadena: "2-3-5" },
  { semestre: 3, clave: "TIF-1021", nombre: "Matemáticas para la Toma de Decisiones", cadena: "3-2-5" },
  { semestre: 3, clave: "AEF-1031", nombre: "Fundamentos de Base de Datos", cadena: "3-2-5" },
  { semestre: 3, clave: "TIC-1011", nombre: "Electricidad y Magnetismo", cadena: "2-2-4" },
  { semestre: 3, clave: "TIC-1002", nombre: "Administración Gerencial", cadena: "2-2-4" },
 // Semestre 4 [cite: 41-49]
  { semestre: 4, clave: "TIE-1018", nombre: "Matemáticas Aplicadas a Comunicaciones", cadena: "3-1-4" },
  { semestre: 4, clave: "TIB-1024", nombre: "Programación II", cadena: "1-4-5" },
  { semestre: 4, clave: "TIF-1013", nombre: "Fundamentos de Redes", cadena: "3-2-5" },
  { semestre: 4, clave: "AEA-1063", nombre: "Taller de Base de Datos", cadena: "0-4-4" },
  { semestre: 4, clave: "TID-1008", nombre: "Circuitos Eléctricos y Electrónicos", cadena: "2-3-5" },
  { semestre: 4, clave: "TIC-1014", nombre: "Ingeniería de Software", cadena: "2-2-4" },
  // Semestre 5 [cite: 53-61]
  { semestre: 5, clave: "TID-1004", nombre: "Análisis de Señales y Sistemas de Comunicación", cadena: "2-3-5" },
  { semestre: 5, clave: "TIF-1001", nombre: "Administración de Proyectos", cadena: "3-2-5" },
  { semestre: 5, clave: "TIF-1025", nombre: "Redes de Computadoras", cadena: "3-2-5" },
  { semestre: 5, clave: "TIF-1007", nombre: "Base de Datos Distribuidas", cadena: "3-2-5" },
  { semestre: 5, clave: "TIC-1005", nombre: "Arquitectura de Computadoras", cadena: "2-2-4" },
  { semestre: 5, clave: "TIC-1027", nombre: "Taller de Ingeniería de Software", cadena: "2-2-4" },
 // Semestre 6 [cite: 66-74]
  { semestre: 6, clave: "TIF-1029", nombre: "Telecomunicaciones", cadena: "3-2-5" },
  { semestre: 6, clave: "AEB-1055", nombre: "Programación Web", cadena: "1-4-5" },
  { semestre: 6, clave: "TID-1010", nombre: "Desarrollo de Emprendedores", cadena: "2-3-5" },
  { semestre: 6, clave: "AEC-1061", nombre: "Sistemas Operativos I", cadena: "2-2-4" },
  { semestre: 6, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena: "2-3-5" },
  { semestre: 6, clave: "TIC-1028", nombre: "Tecnologías Inalámbricas", cadena: "2-2-4" },
  { semestre: 6, clave: "TIF-1026", nombre: "Redes Emergentes", cadena: "3-2-5" },
  // Semestre 7 [cite: 77-82]
  { semestre: 7, clave: "AEB-1011", nombre: "Desarrollo de Aplicaciones para Dispositivos Móviles", cadena: "1-4-5" },
  { semestre: 7, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena: "0-4-4" },
  { semestre: 7, clave: "AED-1062", nombre: "Sistemas Operativos II", cadena: "2-3-5" },
  { semestre: 7, clave: "TIC-1022", nombre: "Negocios Electrónicos I", cadena: "2-2-4" },
  { semestre: 7, clave: "TIH-1016", nombre: "Interacción Humano Computadora", cadena: "1-3-4" },
 // Semestre 8 [cite: 84-90]
  { semestre: 8, clave: "TIB-1003", nombre: "Administración y Seguridad de Redes", cadena: "1-4-5" },
  { semestre: 8, clave: "TIC-1006", nombre: "Auditoría en Tecnologías de la Información", cadena: "2-2-4" },
  { semestre: 8, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena: "0-4-4" },
  { semestre: 8, clave: "TIC-1015", nombre: "Ingeniería del Conocimiento", cadena: "2-2-4" },
  { semestre: 8, clave: "TIC-1023", nombre: "Negocios Electrónicos II", cadena: "2-2-4" },
  // Semestre 9
  { semestre: 9, clave: "RES-ITIC-2010-225", nombre: "Residencia Profesional", cadena: "0-0-10" }
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
    console.log("Finalizado ITIC.");
  } catch (err) { console.error(err); } finally { await mongoose.disconnect(); }
}
main();