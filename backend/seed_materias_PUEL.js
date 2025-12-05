// backend/seed_materias_ITPuebla_ielc_cee_2026.js
//
// Inserta materias de Ingeniería Electrónica (Especialidad: Comunicaciones Espaciales y Electromovilidad)
// del Instituto Tecnológico de Puebla en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajusta estos nombres a como los tengas guardados en tu BD
const TEC_NOMBRE = "Instituto Tecnológico de Puebla";
const CARRERA_NOMBRE = "Ingeniería Electrónica";
const PLAN_ANIO = 2010; // Plan base
const ESPECIALIDAD_NOMBRE = "Comunicaciones Espaciales y Electromovilidad";

// Materias extraídas de la retícula IELC-2010-211 + Especialidad IELE-CEE-2026-01
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
    clave: "AEF-1042",
    nombre: "Mecánica Clásica",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 1,
    clave: "AEC-1058",
    nombre: "Química",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 1,
    clave: "AEQ-1387", // Actualización de ETQ-1006
    nombre: "Comunicación Humana",
    cadena_creditos: "1-2-3",
    horas_teoria: 1,
    horas_practica: 2,
    creditos: 3,
  },
  {
    semestre_recomendado: 1,
    clave: "ACC-0906",
    nombre: "Fundamentos de Investigación",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
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
    clave: "ACD-0908",
    nombre: "Desarrollo Sustentable",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "ETP-1020",
    nombre: "Marco Legal de la Empresa",
    cadena_creditos: "3-0-3",
    horas_teoria: 3,
    horas_practica: 0,
    creditos: 3,
  },
  {
    semestre_recomendado: 2,
    clave: "ETF-1027",
    nombre: "Tópicos Selectos de Física",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "ETQ-1009",
    nombre: "Desarrollo Humano",
    cadena_creditos: "1-2-3",
    horas_teoria: 1,
    horas_practica: 2,
    creditos: 3,
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
    clave: "ETD-1021",
    nombre: "Mediciones Eléctricas",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
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
    clave: "ETF-1017",
    nombre: "Física de Semiconductores",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "ETD-1024",
    nombre: "Programación Estructurada",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
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
    clave: "ETF-1026",
    nombre: "Teoría Electromagnética",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "ETF-1004",
    nombre: "Circuitos Eléctricos I",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "ETF-1003",
    nombre: "Análisis Numérico",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "ETF-1014",
    nombre: "Diseño Digital",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "ETD-1025",
    nombre: "Programación Visual",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---------- Semestre 5 ----------
  {
    semestre_recomendado: 5,
    clave: "ETF-1005",
    nombre: "Circuitos Eléctricos II",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "ETF-1012",
    nombre: "Diodos y Transistores",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "ETD-1022",
    nombre: "Microcontroladores",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "AEF-1040",
    nombre: "Máquinas Eléctricas",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "ETF-1008",
    nombre: "Controladores Lógicos Programables",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "ETF-1015",
    nombre: "Diseño Digital con VHDL",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "AEO-1388",
    nombre: "Desarrollo Profesional",
    cadena_creditos: "0-3-3",
    horas_teoria: 0,
    horas_practica: 3,
    creditos: 3,
  },

  // ---------- Semestre 6 ----------
  {
    semestre_recomendado: 6,
    clave: "AEF-1009",
    nombre: "Control I",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "ETF-1013",
    nombre: "Diseño con Transistores",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "ETF-1019",
    nombre: "Introducción a las Telecomunicaciones",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "ETF-1023",
    nombre: "Optoelectrónica",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
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
    semestre_recomendado: 6,
    clave: "ETF-1018",
    nombre: "Fundamentos Financieros",
    cadena_creditos: "3-0-3",
    horas_teoria: 3,
    horas_practica: 0,
    creditos: 3,
  },

  // ---------- Semestre 7 ----------
  {
    semestre_recomendado: 7,
    clave: "AEF-1010",
    nombre: "Control II",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 7,
    clave: "ETF-1002",
    nombre: "Amplificadores Operacionales",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
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
    clave: "ACA-0910",
    nombre: "Taller de Investigación II",
    cadena_creditos: "0-4-4",
    horas_teoria: 0,
    horas_practica: 4,
    creditos: 4,
  },
  {
    semestre_recomendado: 7,
    clave: "AEO-1389",
    nombre: "Desarrollo y Evaluación de Proyectos",
    cadena_creditos: "0-3-3",
    horas_teoria: 0,
    horas_practica: 3,
    creditos: 3,
  },

  // ---------- Semestre 8 (Incluye Especialidad) ----------
  {
    semestre_recomendado: 8,
    clave: "ETF-1016",
    nombre: "Electrónica de Potencia",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  // ESPECIALIDAD: Gestión de una Misión Espacial
  {
    semestre_recomendado: 8,
    clave: "CEF-2601",
    nombre: "Gestión de una Misión Espacial",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // ESPECIALIDAD: Comunicaciones Espaciales y Antenas
  {
    semestre_recomendado: 8,
    clave: "CEF-2602",
    nombre: "Comunicaciones Espaciales y Antenas",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  {
    semestre_recomendado: 8,
    clave: "ETF-1007",
    nombre: "Control Digital",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  // ESPECIALIDAD: Mecánica Orbital
  {
    semestre_recomendado: 8,
    clave: "CEL-2603",
    nombre: "Mecánica Orbital",
    cadena_creditos: "4-1-5",
    horas_teoria: 4,
    horas_practica: 1,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },

  // ---------- Semestre 9 (Incluye Especialidad) ----------
  {
    semestre_recomendado: 9,
    clave: "ETR-1001",
    nombre: "Administración Gerencial",
    cadena_creditos: "2-1-3",
    horas_teoria: 2,
    horas_practica: 1,
    creditos: 3,
  },
  // ESPECIALIDAD: Sistemas Embebidos Aplicados a Comunicaciones Móviles
  {
    semestre_recomendado: 9,
    clave: "CEF-2604",
    nombre: "Sistemas Embebidos Aplicados a Comunicaciones Móviles",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // ESPECIALIDAD: Comunicaciones Móviles (Optativa 1)
  {
    semestre_recomendado: 9,
    clave: "CEF-2605",
    nombre: "Comunicaciones Móviles",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // ESPECIALIDAD: Ciencia de Datos (Optativa 2)
  {
    semestre_recomendado: 9,
    clave: "CED-2606",
    nombre: "Ciencia de Datos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // ESPECIALIDAD: Percepción Remota (Optativa 3)
  {
    semestre_recomendado: 9,
    clave: "CEF-2607",
    nombre: "Percepción Remota",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  {
    semestre_recomendado: 9,
    clave: "RES-IELC-2010-211",
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

    // 2. Buscar Carrera
    const carrera = await Carrera.findOne({
      nombre: CARRERA_NOMBRE,
      tec: tec._id,
    });

    if (!carrera) {
      console.error("No se encontró la carrera. Verifica el nombre o créala primero."
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
          // Si ya viene definido como especialidad, respetar, si no, es básica
          es_modulo_especialidad: data.es_modulo_especialidad || false,
          area_materia: data.area_materia || "Basica",
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

    console.log("Materias de Ingeniería Electrónica IELC-2010-211 (con especialidad CEE) guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();