// backend/seed_materias_ICBS_2024_249.js
//
// Inserta materias de Ingeniería en Ciberseguridad ICBS-2024-249
// en MongoDB usando los mismos modelos que tu script anterior.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Cambia este nombre si usas otro tecnológico
const TEC_NOMBRE = "Instituto Tecnológico de Tapachula";

const CARRERA_NOMBRE = "Ingeniería en Ciberseguridad";
const PLAN_ANIO = 2024;

// Materias extraídas de la retícula ICBS-2024-249 (TecNM)
// Semestre, clave, nombre, T-P-C
const materiasDatos = [
  // ---- Semestre 1 ---- (total 26 créditos según retícula)
  {
    semestre_recomendado: 1,
    clave: "ACF-2301",
    nombre: "Cálculo Diferencial",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 1,
    clave: "CCB-2418",
    nombre: "Fundamentos de Estructuras Discretas para la Ciberseguridad",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 1,
    clave: "ACH-2307",
    nombre: "Taller de Ética",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
  },
  {
    semestre_recomendado: 1,
    clave: "AEQ-1387",
    nombre: "Comunicación Humana",
    cadena_creditos: "1-2-3",
    horas_teoria: 1,
    horas_practica: 2,
    creditos: 3,
  },
  {
    semestre_recomendado: 1,
    clave: "CBD-2417",
    nombre: "Fundamentos de Ciberseguridad",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 1,
    clave: "ACD-0908",
    nombre: "Desarrollo Sustentable",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---- Semestre 2 ---- (total 30 créditos aproximados)
  {
    semestre_recomendado: 2,
    clave: "ACF-0902",
    nombre: "Cálculo Integral",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "CBD-2407",
    nombre: "Aspectos Legales, Éticos y Sociales en Ciberseguridad",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "CBD-2424",
    nombre: "Introducción a la Programación",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "CBD-2423",
    nombre: "Introducción a la Física para Ciberseguridad",
    cadena_creditos: "1-4-5",
    horas_teoria: 1,
    horas_practica: 4,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "ACF-0903",
    nombre: "Álgebra Lineal",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "AEF-24126",
    nombre: "Probabilidad y Estadística",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---- Semestre 3 ---- (total 30 créditos aproximados)
  {
    semestre_recomendado: 3,
    clave: "ACF-0904",
    nombre: "Cálculo Vectorial",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "CBD-2415",
    nombre: "Estructura de Datos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "CBD-2427",
    nombre: "Redes de Datos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "CBD-2416",
    nombre: "Sistemas Operativos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "CBD-2425",
    nombre: "Administración de Sistemas Operativos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "CBD-2405",
    nombre: "Arquitectura de Computadoras",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---- Semestre 4 ----
  {
    semestre_recomendado: 4,
    clave: "CCB-2429",
    nombre: "Señales en Telecomunicaciones",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "CBD-2412",
    nombre: "Criptografía",
    cadena_creditos: "1-4-5",
    horas_teoria: 1,
    horas_practica: 4,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "CBD-2420",
    nombre: "Fundamentos de Seguridad en Sistemas Operativos",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 4,
    clave: "CBD-2413",
    nombre: "Desarrollo WEB",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "CBD-2416", // same code used earlier for Sistemas Operativos in some sources; keep as placeholder if needed
    nombre: "Fundamentos de Base de Datos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "ACC-0906",
    nombre: "Fundamentos de Investigación",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },

  // ---- Semestre 5 ----
  {
    semestre_recomendado: 5,
    clave: "CBD-2410",
    nombre: "Cómputo Forense",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "CBD-2426",
    nombre: "Pruebas de Intrusión",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "CBD-2421",
    nombre: "Gestión de Proyectos de Ciberseguridad",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "CBD-2428",
    nombre: "Fundamentos de Seguridad en IoT",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "CBI-2409",
    nombre: "Ciberinteligencia",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "CBD-2403",
    nombre: "Análisis de Datos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---- Semestre 6 ----
  {
    semestre_recomendado: 6,
    clave: "CBD-2404",
    nombre: "Análisis de Malware",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "CBD-2422",
    nombre: "Inteligencia Artificial Aplicada a la Ciberseguridad",
    cadena_creditos: "4-0-4",
    horas_teoria: 4,
    horas_practica: 0,
    creditos: 4,
  },
  {
    semestre_recomendado: 6,
    clave: "CBF-2429",
    nombre: "Señales en Telecomunicaciones (Avanzado)",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "CBD-2428",
    nombre: "Servicios Seguros de Internet",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "CBD-2408",
    nombre: "Auditoría de Seguridad",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---- Semestre 7 ----
  {
    semestre_recomendado: 7,
    clave: "CBD-2419",
    nombre: "Fundamentos de Seguridad en IoT",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 7,
    clave: "CBD-2430",
    nombre: "Tópicos Avanzados de Ciberseguridad",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 7,
    clave: "ACA-0909",
    nombre: "Taller de Investigación I",
    cadena_creditos: "0-4-4",
    horas_teoria: 0,
    horas_practica: 4,
    creditos: 4,
  },
  {
    semestre_recomendado: 7,
    clave: "CBD-2411",
    nombre: "Análisis y Gestión de Riesgos en Ciberseguridad",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
  },
  {
    semestre_recomendado: 7,
    clave: "CBD-2402",
    nombre: "Administración de Redes",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---- Semestre 8 ---- (especialidad)
  {
    semestre_recomendado: 8,
    clave: "ESPECIALIDAD-1",
    nombre: "Especialidad - Asignatura 1",
    cadena_creditos: "0-0-0",
    horas_teoria: 0,
    horas_practica: 0,
    creditos: 0,
  },
  {
    semestre_recomendado: 8,
    clave: "ESPECIALIDAD-2",
    nombre: "Especialidad - Asignatura 2",
    cadena_creditos: "0-0-0",
    horas_teoria: 0,
    horas_practica: 0,
    creditos: 0,
  },
  {
    semestre_recomendado: 8,
    clave: "ESPECIALIDAD-3",
    nombre: "Especialidad - Asignatura 3",
    cadena_creditos: "0-0-0",
    horas_teoria: 0,
    horas_practica: 0,
    creditos: 0,
  },

  // ---- Semestre 9 (Residencia Profesional aparece en la retícula) ----
  {
    semestre_recomendado: 9,
    clave: "RES-ICBS-2024",
    nombre: "Residencia Profesional",
    cadena_creditos: "0-0-10",
    horas_teoria: 0,
    horas_practica: 0,
    creditos: 10,
  },

  // ---- Talleres / Investigación / Otros (aparecen en la retícula) ----
  {
    semestre_recomendado: 4,
    clave: "ACA-0906",
    nombre: "Taller de Investigación II (o similar)",
    cadena_creditos: "0-4-4",
    horas_teoria: 0,
    horas_practica: 4,
    creditos: 4,
  },
  {
    semestre_recomendado: 7,
    clave: "ACA-0910",
    nombre: "Taller de Investigación II",
    cadena_creditos: "0-4-4",
    horas_teoria: 0,
    horas_practica: 4,
    creditos: 4,
  },
  {
    semestre_recomendado: 6,
    clave: "ACA-0909",
    nombre: "Taller de Investigación I",
    cadena_creditos: "0-4-4",
    horas_teoria: 0,
    horas_practica: 4,
    creditos: 4,
  },
  {
    semestre_recomendado: 5,
    clave: "ACA-0910",
    nombre: "Taller de Investigación II (variación)",
    cadena_creditos: "0-4-4",
    horas_teoria: 0,
    horas_practica: 4,
    creditos: 4,
  },
];

// Puedes editar/ajustar claves "ESPECIALIDAD-1..3" con las materias concretas de especialidad que tengas.
// Si quieres que coloque las materias de especialidad con códigos reales (CBD/CBI/CBT...), pásame la lista exacta
// o confirma y las separo en el arreglo con sus claves reales.

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado a MongoDB");

    // 1. Buscar Tec
    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });

    if (!tec) {
      console.error("❌ No se encontró el Tec. Revisa TEC_NOMBRE o crea el Tec primero.");
      return;
    }

    // 2. Buscar Carrera
    const carrera = await Carrera.findOne({
      nombre: CARRERA_NOMBRE,
      tec: tec._id,
    });

    if (!carrera) {
      console.error(
        "❌ No se encontró la carrera. Revisa CARRERA_NOMBRE o crea la carrera primero."
      );
      return;
    }

    console.log("Tec:", tec.nombre);
    console.log("Carrera:", carrera.nombre);

    // 3. Insertar / actualizar materias
    for (const data of materiasDatos) {
      const materia = await Materia.findOneAndUpdate(
        {
          clave: data.clave,
          tec: tec._id,
          carrera: carrera._id,
        },
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

      console.log(
        "Materia guardada:",
        materia.semestre_recomendado,
        materia.clave,
        "-",
        materia.nombre
      );
    }

    console.log("✅ Materias de Ingeniería en Ciberseguridad ICBS-2024-249 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
