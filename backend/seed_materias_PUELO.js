// backend/seed_materias_ITPuebla_ilog_per_2025.js
//
// Inserta materias de Ingeniería en Logística (Especialidad: Planificación Estratégica de Redes Logísticas)
// del Instituto Tecnológico de Puebla en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajusta estos nombres a como los tengas guardados en tu BD
const TEC_NOMBRE = "Instituto Tecnológico de Puebla";
const CARRERA_NOMBRE = "Ingeniería en Logística";
const PLAN_ANIO = 2009; // Plan base
const ESPECIALIDAD_NOMBRE = "Planificación Estratégica de Redes Logísticas";

// Materias extraídas de la retícula ILOG-2009-202 + Especialidad ILOE-PER-2025-02
// Semestre, clave, nombre, T-P-C
const materiasDatos = [
  // ---------- Semestre 1 ----------
  {
    semestre_recomendado: 1,
    clave: "LOC-0919",
    nombre: "Introducción a la Ingeniería en Logística",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
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
    clave: "ACH-2307", // Actualización de Taller de Ética
    nombre: "Taller de Ética",
    cadena_creditos: "0-4-4",
    horas_teoria: 0,
    horas_practica: 4,
    creditos: 4,
  },
  {
    semestre_recomendado: 1,
    clave: "LOC-0913",
    nombre: "Fundamentos de Administración",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
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
    clave: "AEC-1018",
    nombre: "Economía",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },

  // ---------- Semestre 2 ----------
  {
    semestre_recomendado: 2,
    clave: "LOC-0903",
    nombre: "Cadena de Suministro",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
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
    clave: "LOH-0909",
    nombre: "Dibujo Asistido por Computadora",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
  },
  {
    semestre_recomendado: 2,
    clave: "LOC-0914",
    nombre: "Fundamentos de Derecho",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 2,
    clave: "LOC-0927",
    nombre: "Química",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 2,
    clave: "LOH-0902",
    nombre: "Bases de Datos",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
  },

  // ---------- Semestre 3 ----------
  {
    semestre_recomendado: 3,
    clave: "LOC-0905",
    nombre: "Compras",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
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
    clave: "AEC-1053",
    nombre: "Probabilidad y Estadística",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 3,
    clave: "LOC-0911",
    nombre: "Entorno Económico",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 3,
    clave: "AEF-1042",
    nombre: "Mecánica Clásica",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "AED-1044",
    nombre: "Mercadotecnia",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---------- Semestre 4 ----------
  {
    semestre_recomendado: 4,
    clave: "LOE-0920",
    nombre: "Inventarios",
    cadena_creditos: "3-1-4",
    horas_teoria: 3,
    horas_practica: 1,
    creditos: 4,
  },
  {
    semestre_recomendado: 4,
    clave: "LOC-0928",
    nombre: "Servicio al Cliente",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 4,
    clave: "AEF-1024",
    nombre: "Estadística Inferencial I",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "LOD-0923",
    nombre: "Legislación Aduanera",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "LOF-0930",
    nombre: "Tópicos de Ingeniería Mecánica",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "LOJ-0917",
    nombre: "Higiene y Seguridad",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
  },

  // ---------- Semestre 5 ----------
  {
    semestre_recomendado: 5,
    clave: "LOF-0901",
    nombre: "Almacenes",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "LOE-0921",
    nombre: "Investigación de Operaciones I",
    cadena_creditos: "3-1-4",
    horas_teoria: 3,
    horas_practica: 1,
    creditos: 4,
  },
  {
    semestre_recomendado: 5,
    clave: "AEF-1025",
    nombre: "Estadística Inferencial II",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "LOC-0929",
    nombre: "Tipología del Producto",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 5,
    clave: "LOC-0908",
    nombre: "Desarrollo Humano y Organizacional",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 5,
    clave: "LOD-0906",
    nombre: "Contabilidad y Costos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },

  // ---------- Semestre 6 ----------
  {
    semestre_recomendado: 6,
    clave: "LOF-0931",
    nombre: "Tráfico y Transporte",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "LOE-0922",
    nombre: "Investigación de Operaciones II",
    cadena_creditos: "3-1-4",
    horas_teoria: 3,
    horas_practica: 1,
    creditos: 4,
  },
  {
    semestre_recomendado: 6,
    clave: "LOC-0910",
    nombre: "Empaque, Envase y Embalaje",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 6,
    clave: "AEC-1037",
    nombre: "Ingeniería Económica",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
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
    semestre_recomendado: 6,
    clave: "LOF-0912",
    nombre: "Finanzas",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },

  // ---------- Semestre 7 ----------
  {
    semestre_recomendado: 7,
    clave: "LOC-0925",
    nombre: "Procesos de Fabricación y Manejo de Materiales",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 7,
    clave: "LOC-0924",
    nombre: "Modelos de Simulación y Logística",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 7,
    clave: "LOD-0915",
    nombre: "Geografía para el Transporte",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 7,
    clave: "LOE-0904",
    nombre: "Comercio Internacional",
    cadena_creditos: "3-1-4",
    horas_teoria: 3,
    horas_practica: 1,
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
    clave: "LOC-0926",
    nombre: "Programación de Procesos Productivos",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },

  // ---------- Semestre 8 ----------
  {
    semestre_recomendado: 8,
    clave: "LOF-0918",
    nombre: "Innovación",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 8,
    clave: "LOC-0907",
    nombre: "Cultura de Calidad",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 8,
    clave: "AED-1030",
    nombre: "Formulación y Evaluación de Proyectos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 8,
    clave: "ACD-0908",
    nombre: "Desarrollo Sustentable",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  // MATERIA DE ESPECIALIDAD (Semestre 8)
  {
    semestre_recomendado: 8,
    clave: "PEC-2503",
    nombre: "Logística y Manufactura Esbelta",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },

  // ---------- Semestre 9 ----------
  {
    semestre_recomendado: 9,
    clave: "LOC-0916",
    nombre: "Gestión de Proyectos",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  // MATERIA DE ESPECIALIDAD (Semestre 9)
  {
    semestre_recomendado: 9,
    clave: "PED-2505",
    nombre: "Sistemas Digitales Aplicados a la Logística",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD (Semestre 9)
  {
    semestre_recomendado: 9,
    clave: "PED-2506",
    nombre: "Abastecimiento y Distribución Logística",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD (Semestre 9)
  {
    semestre_recomendado: 9,
    clave: "PED-2501",
    nombre: "Gestión de Flotillas",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD (Semestre 9)
  {
    semestre_recomendado: 9,
    clave: "PED-2502",
    nombre: "Gestión de Bases de Datos en la Logística",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD (Semestre 9)
  {
    semestre_recomendado: 9,
    clave: "PEC-2504",
    nombre: "Procesos Logísticos Internacionales",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  {
    semestre_recomendado: 9,
    clave: "RES-ILOG-2009-202",
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

    console.log("Materias de Ingeniería en Logística ILOG-2009-202 (con especialidad PER) guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();