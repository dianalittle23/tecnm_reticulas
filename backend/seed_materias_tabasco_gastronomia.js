// backend/seed_materias_ITVILLAHERMOSA_gastronomia_2010.js
//
// Inserta materias de la carrera de GASTRONOMÍA GAST-2010-215
// del Instituto Tecnológico de VILLAHERMOSA en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajusta el nombre como lo tengas en tu BD
const TEC_NOMBRE = "Instituto Tecnológico de Villahermosa";
const CARRERA_NOMBRE = "Gastronomía";
const PLAN_ANIO = 2010;

// Materias extraídas de la retícula GAST-2010-215
// Semestre, clave, nombre, T-P-C
const materiasDatos = [
  // ---------------- SEMESTRE 1 ----------------
  {
    semestre_recomendado: 1,
    clave: "GSF-1022",
    nombre: "Microbiología de los Alimentos",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 1,
    clave: "GSC-1015",
    nombre: "Física en Gastronomía",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 1,
    clave: "GSX-1018",
    nombre: "Introducción a la Gastronomía",
    cadena_creditos: "1-5-6",
    horas_teoria: 1,
    horas_practica: 5,
    creditos: 6,
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
    clave: "GSC-1020",
    nombre: "Matemáticas para Gastronomía",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 1,
    clave: "AEB-1082",
    nombre: "Software de Aplicación Ejecutivo",
    cadena_creditos: "1-4-5",
    horas_teoria: 1,
    horas_practica: 4,
    creditos: 5,
  },

  // ---------------- SEMESTRE 2 ----------------
  {
    semestre_recomendado: 2,
    clave: "GSH-1017",
    nombre: "Higiene en el Manejo de Alimentos y Bebidas",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
  },
  {
    semestre_recomendado: 2,
    clave: "GSD-1009",
    nombre: "Cultura y Patrimonio Gastronómico Nacional e Internacional",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "GSX-1002",
    nombre: "Bases Culinarias",
    cadena_creditos: "1-5-6",
    horas_teoria: 1,
    horas_practica: 5,
    creditos: 6,
  },
  {
    semestre_recomendado: 2,
    clave: "GSD-1021",
    nombre: "Mercadotecnia",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "AEF-1074",
    nombre: "Fundamentos de Gestión Empresarial",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "ACA-0907",
    nombre: "Taller de Ética",
    cadena_creditos: "0-4-4",
    horas_teoria: 0,
    horas_practica: 4,
    creditos: 4,
  },

  // ---------------- SEMESTRE 3 ----------------
  {
    semestre_recomendado: 3,
    clave: "GSD-1026",
    nombre: "Química y Conservación de los Alimentos",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "GSC-1011",
    nombre: "Enología y Vitivinicultura",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 3,
    clave: "GSX-1006",
    nombre: "Cocina Mexicana",
    cadena_creditos: "1-5-6",
    horas_teoria: 1,
    horas_practica: 5,
    creditos: 6,
  },
  {
    semestre_recomendado: 3,
    clave: "AEF-1081",
    nombre: "Probabilidad y Estadística",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "AEG-1075",
    nombre: "Gestión del Capital Humano",
    cadena_creditos: "3-3-6",
    horas_teoria: 3,
    horas_practica: 3,
    creditos: 6,
  },
  {
    semestre_recomendado: 3,
    clave: "GSC-1016",
    nombre: "Fundamentos de Turismo",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },

  // ---------------- SEMESTRE 4 ----------------
  {
    semestre_recomendado: 4,
    clave: "AEM-1083",
    nombre: "Tecnología de Frutas, Hortalizas y Confitería",
    cadena_creditos: "2-4-6",
    horas_teoria: 2,
    horas_practica: 4,
    creditos: 6,
  },
  {
    semestre_recomendado: 4,
    clave: "GSH-1007",
    nombre: "Coctelería",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
  },
  {
    semestre_recomendado: 4,
    clave: "GSX-1024",
    nombre: "Panadería",
    cadena_creditos: "1-5-6",
    horas_teoria: 1,
    horas_practica: 5,
    creditos: 6,
  },
  {
    semestre_recomendado: 4,
    clave: "AEF-1071",
    nombre: "Economía Empresarial",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "AEF-1073",
    nombre: "Finanzas de las Organizaciones",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "GSR-1025",
    nombre: "Protocolo de Seguridad",
    cadena_creditos: "2-1-3",
    horas_teoria: 2,
    horas_practica: 1,
    creditos: 3,
  },

  // ---------------- SEMESTRE 5 ----------------
  {
    semestre_recomendado: 5,
    clave: "AEC-1078",
    nombre: "Marco Legal de las Organizaciones",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 5,
    clave: "GSH-1023",
    nombre: "Nutrición y Dietética",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
  },
  {
    semestre_recomendado: 5,
    clave: "GSX-1019",
    nombre: "Introducción a la Repostería",
    cadena_creditos: "1-5-6",
    horas_teoria: 1,
    horas_practica: 5,
    creditos: 6,
  },
  {
    semestre_recomendado: 5,
    clave: "AED-1069",
    nombre: "Calidad Aplicada a la Gestión Empresarial",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "AED-1035",
    nombre: "Gestión Estratégica",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "GSH-1014",
    nombre: "Estancia Técnica Nacional",
    cadena_creditos: "1-3-4",
    horas_teoria: 1,
    horas_practica: 3,
    creditos: 4,
  },

  // ---------------- SEMESTRE 6 ----------------
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
    clave: "GSC-1001",
    nombre: "Banquetes",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },

  // ---------------- SEMESTRE 7 ----------------
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
    clave: "GSB-1003",
    nombre: "Cocina Experimental",
    cadena_creditos: "1-4-5",
    horas_teoria: 1,
    horas_practica: 4,
    creditos: 5,
  },

  // ---------------- SEMESTRE 8 ----------------
  {
    semestre_recomendado: 8,
    clave: "AEF-1029",
    nombre: "Formulación y Evaluación de Proyectos",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },

  // ---------------- SEMESTRE 9 ----------------
  {
    semestre_recomendado: 9,
    clave: "RES-GAST-2010-215",
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

    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });
    if (!tec) {
      console.error("No se encontró el Tec. Créalo primero.");
      return;
    }

    const carrera = await Carrera.findOne({
      nombre: CARRERA_NOMBRE,
      tec: tec._id,
    });

    if (!carrera) {
      console.error("No se encontró la carrera. Créala primero.");
      return;
    }

    console.log("Tec:", tec.nombre);
    console.log("Carrera:", carrera.nombre);

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

    console.log("Materias de Gastronomía GAST-2010-215 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();
