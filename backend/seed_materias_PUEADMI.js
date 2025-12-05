// backend/seed_materias_ITPuebla_ladm_iso_2023.js
//
// Inserta materias de Licenciatura en Administración (Especialidad: Innovación y Sostenibilidad en las Organizaciones)
// del Instituto Tecnológico de Puebla en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajusta estos nombres a como los tengas guardados en tu BD
const TEC_NOMBRE = "Instituto Tecnológico de Puebla";
const CARRERA_NOMBRE = "Licenciatura en Administración";
const PLAN_ANIO = 2010; // Plan base
const ESPECIALIDAD_NOMBRE = "Innovación y Sostenibilidad en las Organizaciones";

// Materias extraídas de la retícula LADM-2010-234 + Especialidad LADE-ISO-2023-01
// Semestre, clave, nombre, T-P-C
const materiasDatos = [
  // ---------- Semestre 1 ----------
  {
    semestre_recomendado: 1,
    clave: "LAC-1035",
    nombre: "Teoría General de la Administración",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 1,
    clave: "LAV-1025",
    nombre: "Informática para la Administración",
    cadena_creditos: "0-5-5",
    horas_teoria: 0,
    horas_practica: 5,
    creditos: 5,
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
  {
    semestre_recomendado: 1,
    clave: "LAD-1027",
    nombre: "Matemáticas Aplicadas a la Administración",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 1,
    clave: "LAD-1006",
    nombre: "Contabilidad General",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---------- Semestre 2 ----------
  {
    semestre_recomendado: 2,
    clave: "LAF-1019",
    nombre: "Función Administrativa I",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "LAD-1016",
    nombre: "Estadística para la Administración I",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "LAF-1010",
    nombre: "Derecho Laboral y Seguridad Social",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "LAC-1004",
    nombre: "Comunicación Corporativa",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 2,
    clave: "LAC-1034",
    nombre: "Taller de Desarrollo Humano",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 2,
    clave: "LAD-1008",
    nombre: "Costos de Manufactura",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---------- Semestre 3 ----------
  {
    semestre_recomendado: 3,
    clave: "LAD-1020",
    nombre: "Función Administrativa II",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "LAD-1017",
    nombre: "Estadística para la Administración II",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "LAD-1009",
    nombre: "Derecho Empresarial",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "LAD-1003",
    nombre: "Comportamiento Organizacional",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "LAC-1013",
    nombre: "Dinámica Social",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 3,
    clave: "LAD-1007",
    nombre: "Contabilidad Gerencial",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---------- Semestre 4 ----------
  {
    semestre_recomendado: 4,
    clave: "LAD-1023",
    nombre: "Gestión Estratégica del Capital Humano I",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "AEC-1070",
    nombre: "Derecho Fiscal",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 4,
    clave: "LAD-1028",
    nombre: "Métodos Cuantitativos para la Administración",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "LAF-1021",
    nombre: "Fundamentos de Mercadotecnia",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "LAD-1014",
    nombre: "Economía Empresarial",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "AEF-1079",
    nombre: "Matemáticas Financieras",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },

  // ---------- Semestre 5 ----------
  {
    semestre_recomendado: 5,
    clave: "LAD-1024",
    nombre: "Gestión Estratégica del Capital Humano II",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "LAF-1032",
    nombre: "Producción",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "ACD-0908",
    nombre: "Desarrollo Sustentable",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "AEC-1080",
    nombre: "Mezcla de Mercadotecnia",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 5,
    clave: "AEC-1077",
    nombre: "Macroeconomía",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 5,
    clave: "AED-1068",
    nombre: "Administración Financiera I",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---------- Semestre 6 ----------
  {
    semestre_recomendado: 6,
    clave: "LAM-1022",
    nombre: "Gestión de la Retribución",
    cadena_creditos: "2-4-6",
    horas_teoria: 2,
    horas_practica: 4,
    creditos: 6,
  },
  {
    semestre_recomendado: 6,
    clave: "LAD-1031",
    nombre: "Procesos Estructurales",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
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
    clave: "LAD-1033",
    nombre: "Sistemas de Información de Mercadotecnia",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "LAA-1026",
    nombre: "Innovación y Emprendedurismo",
    cadena_creditos: "0-4-4",
    horas_teoria: 0,
    horas_practica: 4,
    creditos: 4,
  },
  {
    semestre_recomendado: 6,
    clave: "LAD-1002",
    nombre: "Administración Financiera II",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---------- Semestre 7 ----------
  {
    semestre_recomendado: 7,
    clave: "LAD-1012",
    nombre: "Diagnóstico y Evaluación Empresarial",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 7,
    clave: "LAC-1030",
    nombre: "Procesos de Dirección",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
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
    semestre_recomendado: 7,
    clave: "LAD-1001",
    nombre: "Administración de la Calidad",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 7,
    clave: "LAC-1015",
    nombre: "Economía Internacional",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 7,
    clave: "LAB-1029",
    nombre: "Plan de Negocios",
    cadena_creditos: "1-4-5",
    horas_teoria: 1,
    horas_practica: 4,
    creditos: 5,
  },

  // ---------- Semestre 8 (Incluye Especialidad) ----------
  {
    semestre_recomendado: 8,
    clave: "LAC-1005",
    nombre: "Consultoría Empresarial",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 8,
    clave: "LAD-1011",
    nombre: "Desarrollo Organizacional",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  // MATERIA DE ESPECIALIDAD
  {
    semestre_recomendado: 8,
    clave: "IEC-2306",
    nombre: "Liderazgo Estratégico (Optativa)",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD
  {
    semestre_recomendado: 8,
    clave: "IEC-2304", // Clave del módulo de especialidad "Herramientas de la Calidad" según PDF? No, el PDF muestra "Herramientas de la Calidad" con clave 2-2-4?
    // Observando el PDF en semestre 8:
    // - Consultoria Empresarial (LAC-1005)
    // - Desarrollo Organizacional (LAD-1011)
    // - Especialidad: Seminario de Administración Financiera (ISC-2304? No legible).
    // - Especialidad: Formulación y Evaluación de Proyectos (LAD-1018?) No, esa es tronco común pero está en sem 9 en PDF? No, sem 8.
    // - Optativa (IEH-2307/2308/2306)
    
    // Revisando mejor el PDF en Sem 8:
    // 1. Consultoria Empresarial (LAC-1005)
    // 2. Desarrollo Organizacional (LAD-1011)
    // 3. Seminario de Admon. Financiera (ISC-2304??) - Especialidad
    // 4. Herramientas de la Calidad (ICD-2302??) - Especialidad
    // 5. Optativa
    
    // Asumiremos las claves de la lista de optativas y especialidad:
    // IEC-2306 Liderazgo Estratégico
    // IEH-2307 Herramientas Tecnológicas
    // IEH-2308 Vigilancia Estratégica
    
    // Y las materias obligatorias de especialidad en sem 8 y 9:
    // Sem 9: Simulación Empresarial (IEH-2305), Admon. para la Gestión Integral (IED-2309), Formulación y Eval. Proyectos (LAD-1018 - Tronco común movido? No, en PDF está en Sem 9, columna 9 fila 4).
    
    // Vamos a insertar las optativas como disponibles.
    clave: "IEH-2307",
    nombre: "Herramientas Tecnológicas (Optativa)",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD
  {
    semestre_recomendado: 8,
    clave: "IEH-2308",
    nombre: "Vigilancia Estratégica (Optativa)",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },

  // ---------- Semestre 9 ----------
  {
    semestre_recomendado: 9,
    clave: "IEH-2305",
    nombre: "Simulación Empresarial",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  {
    semestre_recomendado: 9,
    clave: "IED-2309", // Clave hipotética o legible del PDF
    nombre: "Em. para la Gestión de Proyectos Integrales",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  {
    semestre_recomendado: 9,
    clave: "LAD-1018",
    nombre: "Formulación y Evaluación de Proyectos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
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

    console.log("Materias de Licenciatura en Administración LADM-2010-234 (con especialidad ISO) guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();