// backend/seed_materias_ITPuebla_itic_add_2025.js
//
// Inserta materias de Ingeniería en TICs (Especialidad: Análisis de Datos)
// del Instituto Tecnológico de Puebla en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajusta estos nombres a como los tengas guardados en tu BD
const TEC_NOMBRE = "Instituto Tecnológico de Puebla";
const CARRERA_NOMBRE = "Ingeniería en Tecnologías de la Información y Comunicaciones";
const PLAN_ANIO = 2010; // Plan base
const ESPECIALIDAD_NOMBRE = "Análisis de Datos";

// Materias extraídas de la retícula ITIC-2010-225 + Especialidad Análisis de Datos
// Semestre, clave, nombre, T-P-C
const materiasDatos = [
  // ---------- Semestre 1 ----------
  {
    semestre_recomendado: 1,
    clave: "ACF-2301", // Actualización de Cálculo Diferencial
    nombre: "Cálculo Diferencial",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 1,
    clave: "AEF-1032",
    nombre: "Fundamentos de Programación",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 1,
    clave: "TIF-1019",
    nombre: "Matemáticas Discretas I",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 1,
    clave: "TIP-1017",
    nombre: "Introducción a las TIC's",
    cadena_creditos: "3-0-3",
    horas_teoria: 3,
    horas_practica: 0,
    creditos: 3,
  },
  {
    semestre_recomendado: 1,
    clave: "ACH-2307", // Actualización de Taller de Ética
    nombre: "Taller de Ética",
    cadena_creditos: "0-4-4",
    horas_teoria: 0,
    horas_practica: 4,
    creditos: 4,
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
    clave: "AEB-1054",
    nombre: "Programación Orientada a Objetos",
    cadena_creditos: "1-4-5",
    horas_teoria: 1,
    horas_practica: 4,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "TIF-1020",
    nombre: "Matemáticas Discretas II",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
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
    clave: "TIF-1009",
    nombre: "Contabilidad y Costos",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "AEF-1052",
    nombre: "Probabilidad y Estadística",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },

  // ---------- Semestre 3 ----------
  {
    semestre_recomendado: 3,
    clave: "TIE-1018",
    nombre: "Matemáticas Aplicadas a Comunicaciones",
    cadena_creditos: "3-1-4",
    horas_teoria: 3,
    horas_practica: 1,
    creditos: 4,
  },
  {
    semestre_recomendado: 3,
    clave: "TID-1012",
    nombre: "Estructuras y Organización de Datos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "TIF-1021",
    nombre: "Matemáticas para la Toma de Decisiones",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "ACD-0908",
    nombre: "Desarrollo Sustentable",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "TIC-1011",
    nombre: "Electricidad y Magnetismo",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 3,
    clave: "TIF-1013",
    nombre: "Fundamentos de Redes",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },

  // ---------- Semestre 4 ----------
  {
    semestre_recomendado: 4,
    clave: "TID-1004",
    nombre: "Análisis de Señales y Sistemas de Comunicación",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "AEF-1031",
    nombre: "Fundamentos de Base de Datos",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "AEC-1061",
    nombre: "Sistemas Operativos I",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 4,
    clave: "TID-1010",
    nombre: "Desarrollo de Emprendedores",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "TID-1008",
    nombre: "Circuitos Eléctricos y Electrónicos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "TIF-1025",
    nombre: "Redes de Computadoras",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },

  // ---------- Semestre 5 ----------
  {
    semestre_recomendado: 5,
    clave: "TIF-1029",
    nombre: "Telecomunicaciones",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "AEH-1063",
    nombre: "Taller de Base de Datos",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
  },
  {
    semestre_recomendado: 5,
    clave: "TIB-1024",
    nombre: "Programación II",
    cadena_creditos: "1-4-5",
    horas_teoria: 1,
    horas_practica: 4,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "AED-1062",
    nombre: "Sistemas Operativos II",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "TIC-1005",
    nombre: "Arquitectura de Computadoras",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 5,
    clave: "TIF-1026",
    nombre: "Redes Emergentes",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },

  // ---------- Semestre 6 ----------
  {
    semestre_recomendado: 6,
    clave: "TIC-1028",
    nombre: "Tecnologías Inalámbricas",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 6,
    clave: "TIF-1007",
    nombre: "Base de Datos Distribuidas",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "AEB-1055",
    nombre: "Programación Web",
    cadena_creditos: "1-4-5",
    horas_teoria: 1,
    horas_practica: 4,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "TIC-1014",
    nombre: "Ingeniería de Software",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 6,
    clave: "TIH-1016",
    nombre: "Interacción Humano Computadora",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
  },
  {
    semestre_recomendado: 6,
    clave: "TIF-1003",
    nombre: "Administración y Seguridad de Redes",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },

  // ---------- Semestre 7 ----------
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
    clave: "TIC-1022",
    nombre: "Negocios Electrónicos I",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 7,
    clave: "AEB-1011",
    nombre: "Desarrollo de Aplicaciones para Dispositivos Móviles",
    cadena_creditos: "1-4-5",
    horas_teoria: 1,
    horas_practica: 4,
    creditos: 5,
  },
  {
    semestre_recomendado: 7,
    clave: "TIC-1027",
    nombre: "Taller de Ingeniería de Software",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 7,
    clave: "TIC-1002",
    nombre: "Administración Gerencial",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  // MATERIA DE ESPECIALIDAD
  {
    semestre_recomendado: 7,
    clave: "ADD-2505",
    nombre: "SQL para exploración de datos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },

  // ---------- Semestre 8 ----------
  {
    semestre_recomendado: 8,
    clave: "ACA-0910",
    nombre: "Taller de Investigación II",
    cadena_creditos: "0-4-4",
    horas_teoria: 0,
    horas_practica: 4,
    creditos: 4,
  },
  {
    semestre_recomendado: 8,
    clave: "TIC-1023",
    nombre: "Negocios Electrónicos II",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 8,
    clave: "TIC-1006",
    nombre: "Auditoría en Tecnologías de la Información",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 8,
    clave: "TIC-1015",
    nombre: "Ingeniería del Conocimiento",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 8,
    clave: "TIF-1001",
    nombre: "Administración de Proyectos",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  // MATERIA DE ESPECIALIDAD
  {
    semestre_recomendado: 8,
    clave: "ADD-2507",
    nombre: "Introducción al aprendizaje automático",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },

  // ---------- Semestre 9 (Incluye bloque de Especialidad) ----------
  // MATERIA DE ESPECIALIDAD
  {
    semestre_recomendado: 9,
    clave: "ADD-2501",
    nombre: "Estadística para análisis de datos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD
  {
    semestre_recomendado: 9,
    clave: "ADV-2502",
    nombre: "Herramientas avanzadas para el análisis de datos",
    cadena_creditos: "0-5-5",
    horas_teoria: 0,
    horas_practica: 5,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD
  {
    semestre_recomendado: 9,
    clave: "ADV-2503",
    nombre: "Programación para análisis de datos",
    cadena_creditos: "0-5-5",
    horas_teoria: 0,
    horas_practica: 5,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD
  {
    semestre_recomendado: 9,
    clave: "ADB-2504",
    nombre: "Ciberseguridad",
    cadena_creditos: "1-4-5",
    horas_teoria: 1,
    horas_practica: 4,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD
  {
    semestre_recomendado: 9,
    clave: "ADD-2506",
    nombre: "Exploración de bases de datos no relacionales",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  {
    semestre_recomendado: 9,
    clave: "RES0001",
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
      console.error("No se encontró la carrera . Verifica el nombre o créala primero."
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
          // Si ya viene con es_modulo_especialidad en data, úsalo; si no, false
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

    console.log("Materias de Ingeniería en TICs ITIC-2010-225 (con especialidad Análisis de Datos) guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();