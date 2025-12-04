// backend/seed_materias_ITMexicali_ibqa_2010_207.js
//
// Inserta materias de Ingeniería Bioquímica IBQA-2010-207
// del Instituto Tecnológico de Mexicali en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajusta estos nombres a como los tengas guardados en tu BD
const TEC_NOMBRE = "Instituto Tecnológico de Mexicali";
const CARRERA_NOMBRE = "Ingeniería Bioquímica";
const PLAN_ANIO = 2010;

// Materias extraídas de la retícula IBQA-2010-207
// Semestre, clave, nombre, T-P-C
const materiasDatos = [
  // ---------- Semestre 1 ----------
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
    clave: "ACF-0901",
    nombre: "Cálculo Diferencial",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 1,
    clave: "AEF-1057",
    nombre: "Química",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
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
    clave: "BQW-1006",
    nombre: "Comportamiento Organizacional",
    cadena_creditos: "2-0-2",
    horas_teoria: 2,
    horas_practica: 0,
    creditos: 2,
  },
  {
    semestre_recomendado: 1,
    clave: "AEO-1012",
    nombre: "Dibujo Asistido por Computadora",
    cadena_creditos: "0-3-3",
    horas_teoria: 0,
    horas_practica: 3,
    creditos: 3,
  },

  // ---------- Semestre 2 ----------
  {
    semestre_recomendado: 2,
    clave: "BQP-1001",
    nombre: "Administración y Legislación de Empresas",
    cadena_creditos: "3-0-3",
    horas_teoria: 3,
    horas_practica: 0,
    creditos: 3,
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
    clave: "BQF-1022",
    nombre: "Química Orgánica I",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "AEF-1005",
    nombre: "Biología",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "BQG-1021",
    nombre: "Química Analítica",
    cadena_creditos: "3-3-6",
    horas_teoria: 3,
    horas_practica: 3,
    creditos: 6,
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
    clave: "ACF-0905",
    nombre: "Ecuaciones Diferenciales",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "BQF-1023",
    nombre: "Química Orgánica II",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "AEF-1065",
    nombre: "Termodinámica",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "BQF-1010",
    nombre: "Física",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "BQF-1007",
    nombre: "Estadística",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },

  // ---------- Semestre 4 ----------
  {
    semestre_recomendado: 4,
    clave: "BQF-1020",
    nombre: "Programación y Métodos Numéricos",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "AEF-1020",
    nombre: "Electromagnetismo",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "AEJ-1007",
    nombre: "Bioquímica",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
  },
  {
    semestre_recomendado: 4,
    clave: "AEF-1004",
    nombre: "Balance de Materia y Energía",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "BQF-1002",
    nombre: "Análisis Instrumental",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "BQQ-1003",
    nombre: "Aseguramiento de la Calidad",
    cadena_creditos: "1-2-3",
    horas_teoria: 1,
    horas_practica: 2,
    creditos: 3,
  },

  // ---------- Semestre 5 ----------
  {
    semestre_recomendado: 5,
    clave: "BQP-1015",
    nombre: "Ingeniería Económica",
    cadena_creditos: "3-0-3",
    horas_teoria: 3,
    horas_practica: 0,
    creditos: 3,
  },
  {
    semestre_recomendado: 5,
    clave: "BQJ-1008",
    nombre: "Fenómenos de Transporte I",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
  },
  {
    semestre_recomendado: 5,
    clave: "BQJ-1004",
    nombre: "Bioquímica del Nitrógeno y Regulación Genética",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
  },
  {
    semestre_recomendado: 5,
    clave: "BQF-1011",
    nombre: "Fisicoquímica",
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
    clave: "AEF-1039",
    nombre: "Instrumentación y Control",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },

  // ---------- Semestre 6 ----------
  {
    semestre_recomendado: 6,
    clave: "BQJ-1017",
    nombre: "Operaciones Unitarias I",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
  },
  {
    semestre_recomendado: 6,
    clave: "BQJ-1009",
    nombre: "Fenómenos de Transporte II",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
  },
  {
    semestre_recomendado: 6,
    clave: "AEM-1050",
    nombre: "Microbiología",
    cadena_creditos: "2-4-6",
    horas_teoria: 2,
    horas_practica: 4,
    creditos: 6,
  },
  {
    semestre_recomendado: 6,
    clave: "BQW-1024",
    nombre: "Seguridad e Higiene",
    cadena_creditos: "2-0-2",
    horas_teoria: 2,
    horas_practica: 0,
    creditos: 2,
  },
  {
    semestre_recomendado: 6,
    clave: "BQF-1005",
    nombre: "Cinética Química y Biológica",
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

  // ---------- Semestre 7 ----------
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
    clave: "BQJ-1019",
    nombre: "Operaciones Unitarias III",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
  },
  {
    semestre_recomendado: 7,
    clave: "BQJ-1018",
    nombre: "Operaciones Unitarias II",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
  },
  {
    semestre_recomendado: 7,
    clave: "BQF-1012",
    nombre: "Ingeniería de Biorreactores",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },

  // ---------- Semestre 8 ----------
  {
    semestre_recomendado: 8,
    clave: "BQC-1014",
    nombre: "Ingeniería de Proyectos",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 8,
    clave: "BQF-1016",
    nombre: "Ingeniería y Gestión Ambiental",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 8,
    clave: "BQF-1013",
    nombre: "Ingeniería de Procesos",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },

  // ---------- Semestre 9 ----------
  {
    semestre_recomendado: 9,
    clave: "AEF-1029",
    nombre: "Formulación y Evaluación de Proyectos",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },

  // ---------- Semestre 10 (Residencia) ----------
  {
    semestre_recomendado: 10,
    clave: "RES-IBQA-2010-207",
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

    console.log("Materias de Ingeniería Bioquímica IBQA-2010-207 guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();