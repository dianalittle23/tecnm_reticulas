// backend/seed_materias_ITMexicali_isem_2023_244.js
//
// Inserta materias de Ingeniería en Semiconductores ISEM-2023-244
// del Instituto Tecnológico de Mexicali en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajusta estos nombres a como los tengas guardados en tu BD
const TEC_NOMBRE = "Instituto Tecnológico de Mexicali";
const CARRERA_NOMBRE = "Ingeniería en Semiconductores";
const PLAN_ANIO = 2023; // Plan Reciente

// Materias extraídas de la retícula ISEM-2023-244
// Semestre, clave, nombre, T-P-C
const materiasDatos = [
  // ---------- Semestre 1 ----------
  {
    semestre_recomendado: 1,
    clave: "ACF-0901",
    nombre: "Cálculo Diferencial",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 1,
    clave: "SEE-2330",
    nombre: "Tópicos Selectos de Física",
    cadena_creditos: "3-1-4",
    horas_teoria: 3,
    horas_practica: 1,
    creditos: 4,
  },
  {
    semestre_recomendado: 1,
    clave: "SEE-2321",
    nombre: "Química I",
    cadena_creditos: "3-1-4",
    horas_teoria: 3,
    horas_practica: 1,
    creditos: 4,
  },
  {
    semestre_recomendado: 1,
    clave: "ACA-0907",
    nombre: "Taller de Ética",
    cadena_creditos: "0-4-4",
    horas_teoria: 0,
    horas_practica: 4,
    creditos: 4,
  },
  {
    semestre_recomendado: 1,
    clave: "SER-2315",
    nombre: "Introducción a la Ingeniería de Semiconductores",
    cadena_creditos: "2-1-3",
    horas_teoria: 2,
    horas_practica: 1,
    creditos: 3,
  },
  {
    semestre_recomendado: 1,
    clave: "SED-2319",
    nombre: "Programación Estructurada",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---------- Semestre 2 ----------
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
    clave: "AEE-1051",
    nombre: "Probabilidad y Estadística",
    cadena_creditos: "3-1-4",
    horas_teoria: 3,
    horas_practica: 1,
    creditos: 4,
  },
  {
    semestre_recomendado: 2,
    clave: "AER-23110",
    nombre: "Física Moderna",
    cadena_creditos: "2-1-3",
    horas_teoria: 2,
    horas_practica: 1,
    creditos: 3,
  },
  {
    semestre_recomendado: 2,
    clave: "AED-23111",
    nombre: "Mediciones Eléctricas",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "SED-2320",
    nombre: "Programación Visual",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "ACD-0908",
    nombre: "Desarrollo Sustentable",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---------- Semestre 3 ----------
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
    clave: "AEF-1020",
    nombre: "Electromagnetismo",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "SEF-2322",
    nombre: "Química II",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "ACF-0903",
    nombre: "Álgebra Lineal",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "SEC-2305",
    nombre: "Desarrollo Humano y Fortalecimiento Profesional",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 3,
    clave: "SER-2309",
    nombre: "Economía",
    cadena_creditos: "2-1-3",
    horas_teoria: 2,
    horas_practica: 1,
    creditos: 3,
  },

  // ---------- Semestre 4 ----------
  {
    semestre_recomendado: 4,
    clave: "ACF-0905",
    nombre: "Ecuaciones Diferenciales",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "SEF-2303",
    nombre: "Circuitos Eléctricos",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "SEF-2310",
    nombre: "Física de Semiconductores",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "SEC-2301",
    nombre: "Análisis Numérico",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 4,
    clave: "SEF-2308",
    nombre: "Diseño Digital con HDL",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "SEO-2314",
    nombre: "Taller de Fabricación de Circuitos Electrónicos",
    cadena_creditos: "0-3-3",
    horas_teoria: 0,
    horas_practica: 3,
    creditos: 3,
  },

  // ---------- Semestre 5 ----------
  {
    semestre_recomendado: 5,
    clave: "SEF-2311",
    nombre: "Física del Estado Sólido",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "SEF-2306",
    nombre: "Diodos y Transistores",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "AEF-23113",
    nombre: "Teoría Electromagnética",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "AED-23118",
    nombre: "Innovación y Gestión del Conocimiento",
    cadena_creditos: "0-3-3",
    horas_teoria: 0,
    horas_practica: 3,
    creditos: 3,
  },
  {
    semestre_recomendado: 5,
    clave: "AED-23112",
    nombre: "Microcontroladores",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---------- Semestre 6 ----------
  {
    semestre_recomendado: 6,
    clave: "SEH-2317",
    nombre: "Logística y Cadena de Suministro",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
  },
  {
    semestre_recomendado: 6,
    clave: "SEF-2307",
    nombre: "Diseño con Transistores",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "SEE-2316",
    nombre: "Tecnología de Semiconductores",
    cadena_creditos: "3-1-4",
    horas_teoria: 3,
    horas_practica: 1,
    creditos: 4,
  },
  {
    semestre_recomendado: 6,
    clave: "SEF-2304",
    nombre: "Comunicaciones Digitales",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "SEC-2325",
    nombre: "Taller de Investigación I",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },

  // ---------- Semestre 7 ----------
  {
    semestre_recomendado: 7,
    clave: "AEF-1038",
    nombre: "Instrumentación",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 7,
    clave: "AEF-23108",
    nombre: "Amplificadores Operacionales",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 7,
    clave: "SEH-2328",
    nombre: "Caracterización Óptica y Eléctrica",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
  },
  {
    semestre_recomendado: 7,
    clave: "SEF-2318",
    nombre: "Optoelectrónica",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 7,
    clave: "SEH-2326",
    nombre: "Taller de Investigación II",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
  },
  {
    semestre_recomendado: 7,
    clave: "SEF-2329",
    nombre: "Temas Selectos de Fabricación de Semiconductores",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },

  // ---------- Semestre 8 ----------
  {
    semestre_recomendado: 8,
    clave: "SEF-2323",
    nombre: "Sistemas de Calidad en la Industria Electrónica",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 8,
    clave: "SEF-2324",
    nombre: "Sistemas MEMs y NEMs",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 8,
    clave: "AEF-23109",
    nombre: "Electrónica de Potencia",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 8,
    clave: "SEC-2302",
    nombre: "Caracterización Estructural",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 8,
    clave: "SEH-2312",
    nombre: "Gestión de Proyectos",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
  },

  // ---------- Semestre 9 ----------
  {
    semestre_recomendado: 9,
    clave: "SEO-2327",
    nombre: "Taller de Liderazgo Gerencial",
    cadena_creditos: "0-3-3",
    horas_teoria: 0,
    horas_practica: 3,
    creditos: 3,
  },
  {
    semestre_recomendado: 9,
    clave: "RES-ISEM-2023-244",
    nombre: "Residencia Profesional",
    cadena_creditos: "0-0-10",
    horas_teoria: 0,
    horas_practica: 0,
    creditos: 10,
  },
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado a MongoDB");

    // 1. Buscar Tec
    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });

    if (!tec) {
      console.error("No se encontró el Tec. Verifica el nombre o créalo primero.");
      return;
    }

    // 2. Buscar Carrera (Crear si no existe, al ser carrera nueva)
    let carrera = await Carrera.findOne({
      nombre: CARRERA_NOMBRE,
      tec: tec._id,
    });

    if (!carrera) {
      console.log("La carrera no existe. Creándola automáticamente...");
      carrera = await Carrera.create({
        nombre: CARRERA_NOMBRE,
        tec: tec._id,
      });
      console.log("Carrera creada con ID:", carrera._id);
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
          area_materia: "Basica", // Ajustar si es especialidad
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

    console.log("Materias de Ingeniería en Semiconductores ISEM-2023-244 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();