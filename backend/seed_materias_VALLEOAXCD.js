// backend/seed_materias_ITValleOaxaca_icda_2024_247.js
const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";
const TEC_NOMBRE = "Instituto Tecnológico del Valle de Oaxaca";
const CARRERA_NOMBRE = "Ingeniería en Ciencia de Datos";
const PLAN_ANIO = 2024;

const materiasDatos = [
  // Semestre 1
  { semestre: 1, clave: "ACF-2301", nombre: "Cálculo Diferencial", cadena: "3-2-5" },
  { semestre: 1, clave: "CDD-2421", nombre: "Fundamentos de Programación", cadena: "2-3-5" },
  { semestre: 1, clave: "AEC-1058", nombre: "Química", cadena: "2-2-4" },
  { semestre: 1, clave: "CDF-2416", nombre: "Matemáticas Discretas", cadena: "3-2-5" },
  { semestre: 1, clave: "ACH-2307", nombre: "Taller de Ética", cadena: "0-4-4" },
  { semestre: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena: "2-2-4" },
  { semestre: 1, clave: "CDI-2413", nombre: "Introducción a la Ingeniería en Ciencia de Datos", cadena: "4-0-4" }, // Ajustado créditos según tabla
  // Semestre 2
  { semestre: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena: "3-2-5" },
  { semestre: 2, clave: "CDD-2407", nombre: "Programación Orientada a Objetos", cadena: "2-3-5" },
  { semestre: 2, clave: "CDF-2418", nombre: "Principios Eléctricos y Aplicaciones Digitales", cadena: "3-2-5" },
  { semestre: 2, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena: "3-2-5" },
  { semestre: 2, clave: "AEE-24123", nombre: "Arquitectura de Computadoras", cadena: "3-2-5" }, // Clave inferida/ajustada
  { semestre: 2, clave: "AEF-24126", nombre: "Probabilidad y Estadística", cadena: "3-2-5" },
  // Semestre 3
  { semestre: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena: "3-2-5" },
  { semestre: 3, clave: "AEC-24128", nombre: "Estructura de Datos", cadena: "2-2-4" },
  { semestre: 3, clave: "CDB-2408", nombre: "Fundamentos de Telecomunicaciones", cadena: "1-4-5" }, // Ajustado
  { semestre: 3, clave: "CDJ-2409", nombre: "Fundamentos de Redes", cadena: "4-2-6" }, // Ajustado
  { semestre: 3, clave: "CDC-2420", nombre: "Programación Avanzada para Ciencia de Datos", cadena: "2-2-4" },
  { semestre: 3, clave: "AEF-24124", nombre: "Fundamentos de Bases de Datos", cadena: "3-2-5" },
  { semestre: 3, clave: "AEC-24130", nombre: "Física General", cadena: "2-2-4" },
  // Semestre 4
  { semestre: 4, clave: "ACF-0905", nombre: "Ecuaciones Diferenciales", cadena: "3-2-5" },
  { semestre: 4, clave: "CDC-2411", nombre: "Métodos Numéricos", cadena: "2-2-4" },
  { semestre: 4, clave: "CDH-2405", nombre: "Ciberseguridad", cadena: "1-3-4" },
  { semestre: 4, clave: "CDD-2401", nombre: "Adquisición de Datos", cadena: "2-3-5" },
  { semestre: 4, clave: "AEC-24125", nombre: "Bases de Datos No Relacionales", cadena: "2-2-4" },
  { semestre: 4, clave: "AEF-24129", nombre: "Estadística Inferencial", cadena: "3-2-5" },
  // Semestre 5
  { semestre: 5, clave: "CDD-2415", nombre: "Lenguajes y Autómatas", cadena: "2-3-5" },
  { semestre: 5, clave: "CDD-2414", nombre: "Inteligencia Artificial", cadena: "2-3-5" },
  { semestre: 5, clave: "CDF-2402", nombre: "Visualización de Datos", cadena: "3-2-5" },
  { semestre: 5, clave: "AED-24122", nombre: "Internet de las Cosas", cadena: "2-3-5" },
  { semestre: 5, clave: "CDC-2410", nombre: "Ingeniería de Software", cadena: "2-2-4" },
  { semestre: 5, clave: "AEF-24121", nombre: "Estadística para Ciencia de Datos", cadena: "3-2-5" },
  // Semestre 6
  { semestre: 6, clave: "CDC-2412", nombre: "Inteligencia de Negocios", cadena: "2-2-4" },
  { semestre: 6, clave: "CDF-2424", nombre: "Investigación de Operaciones", cadena: "3-2-5" },
  { semestre: 6, clave: "CDF-2419", nombre: "Aprendizaje Automático", cadena: "3-2-5" },
  { semestre: 6, clave: "CDD-2422", nombre: "Taller de Desarrollo Ágil", cadena: "2-3-5" },
  { semestre: 6, clave: "CDC-2403", nombre: "Arquitectura de Datos en la Nube", cadena: "2-2-4" },
  { semestre: 6, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena: "0-4-4" },
  // Semestre 7
  { semestre: 7, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena: "0-4-4" },
  { semestre: 7, clave: "CDD-2404", nombre: "Visión Artificial", cadena: "2-3-5" },
  { semestre: 7, clave: "CDF-2425", nombre: "Procesamiento de Lenguaje Natural", cadena: "3-2-5" },
  { semestre: 7, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena: "2-3-5" },
  { semestre: 7, clave: "CDD-2406", nombre: "Taller de Liderazgo", cadena: "2-3-5" }, // Ajustado
  // Semestre 8
  { semestre: 8, clave: "CDA-2423", nombre: "Big Data", cadena: "0-4-4" }, // Ajustado
  { semestre: 8, clave: "CDH-2417", nombre: "Metodologías para Proyectos en Ciencia de Datos", cadena: "1-3-4" },
  // Semestre 9
  { semestre: 9, clave: "RES-ICDA-2024-247", nombre: "Residencia Profesional", cadena: "0-0-10" }
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
    console.log("Finalizado Ciencia de Datos.");
  } catch (err) { console.error(err); } finally { await mongoose.disconnect(); }
}
main();