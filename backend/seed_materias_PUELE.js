// backend/seed_materias_ITPuebla_iele_cue_2024.js
//
// Inserta materias de Ingeniería Eléctrica (Especialidad: Calidad y Uso Eficiente de la Energía Eléctrica)
// del Instituto Tecnológico de Puebla en MongoDB.

const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";

// Ajusta estos nombres a como los tengas guardados en tu BD
const TEC_NOMBRE = "Instituto Tecnológico de Puebla";
const CARRERA_NOMBRE = "Ingeniería Eléctrica";
const PLAN_ANIO = 2010; // Plan base
const ESPECIALIDAD_NOMBRE = "Calidad y Uso Eficiente de la Energía Eléctrica";

// Materias extraídas de la retícula IELE-2010-209 + Especialidad IELE-CUE-2024-01
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
    clave: "AEC-1058",
    nombre: "Química",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 1,
    clave: "AEE-1051",
    nombre: "Probabilidad y Estadística",
    cadena_creditos: "3-1-4",
    horas_teoria: 3,
    horas_practica: 1,
    creditos: 4,
  },
  {
    semestre_recomendado: 1,
    clave: "ELO-1008",
    nombre: "Desarrollo Humano Integral",
    cadena_creditos: "0-3-3",
    horas_teoria: 0,
    horas_practica: 3,
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
    clave: "ACH-2307", // Actualización de Taller de Ética
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
    clave: "AEF-1042",
    nombre: "Mecánica Clásica",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "ELD-1018",
    nombre: "Mediciones Eléctricas",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 2,
    clave: "ELO-1004",
    nombre: "Comunicación Humana",
    cadena_creditos: "0-3-3",
    horas_teoria: 0,
    horas_practica: 3,
    creditos: 3,
  },
  {
    semestre_recomendado: 2,
    clave: "AEA-1013",
    nombre: "Dibujo Asistido por Computadora",
    cadena_creditos: "0-4-4",
    horas_teoria: 0,
    horas_practica: 4,
    creditos: 4,
  },
  {
    semestre_recomendado: 2,
    clave: "ELQ-1025",
    nombre: "Tecnología de los Materiales",
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
    clave: "ELJ-1002",
    nombre: "Circuitos Eléctricos I",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
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
    clave: "ELF-1017",
    nombre: "Mecánica de Fluidos y Termodinámica",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 3,
    clave: "ELC-1022",
    nombre: "Programación",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
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
    clave: "ELR-1011",
    nombre: "Física Moderna",
    cadena_creditos: "2-1-3",
    horas_teoria: 2,
    horas_practica: 1,
    creditos: 3,
  },
  {
    semestre_recomendado: 4,
    clave: "ELJ-1003",
    nombre: "Circuitos Eléctricos II",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
  },
  {
    semestre_recomendado: 4,
    clave: "AEF-1021",
    nombre: "Electrónica Analógica",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 4,
    clave: "ELE-1026",
    nombre: "Teoría Electromagnética",
    cadena_creditos: "3-1-4",
    horas_teoria: 3,
    horas_practica: 1,
    creditos: 4,
  },
  {
    semestre_recomendado: 4,
    clave: "ELC-1019",
    nombre: "Métodos Numéricos",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },

  // ---------- Semestre 5 ----------
  {
    semestre_recomendado: 5,
    clave: "AEF-1009",
    nombre: "Control I",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "ELE-1010",
    nombre: "Equipos Mecánicos",
    cadena_creditos: "3-1-4",
    horas_teoria: 3,
    horas_practica: 1,
    creditos: 4,
  },
  {
    semestre_recomendado: 5,
    clave: "ELF-1027",
    nombre: "Transformadores",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 5,
    clave: "AEC-1022",
    nombre: "Electrónica Digital",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 5,
    clave: "ELC-1013",
    nombre: "Instalaciones Eléctricas",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
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

  // ---------- Semestre 6 ----------
  {
    semestre_recomendado: 6,
    clave: "AEF-1010",
    nombre: "Control II",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "ELD-1009",
    nombre: "Electrónica Industrial",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "ELF-1016",
    nombre: "Máquinas Sincrónicas y de CD",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "ELF-1021",
    nombre: "Motores de Inducción y Especiales",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 6,
    clave: "ELF-1014",
    nombre: "Instalaciones Eléctricas Industriales",
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
    clave: "ELF-1005",
    nombre: "Control de Máquinas Eléctricas",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 7,
    clave: "ELE-1001",
    nombre: "Centrales Eléctricas",
    cadena_creditos: "3-1-4",
    horas_teoria: 3,
    horas_practica: 1,
    creditos: 4,
  },
  {
    semestre_recomendado: 7,
    clave: "ELF-1020",
    nombre: "Modelado de Sistemas Eléctricos de Potencia",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 7,
    clave: "ELP-1015",
    nombre: "Legislación en Materia Eléctrica",
    cadena_creditos: "3-0-3",
    horas_teoria: 3,
    horas_practica: 0,
    creditos: 3,
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

  // ---------- Semestre 8 ----------
  {
    semestre_recomendado: 8,
    clave: "ELF-1006",
    nombre: "Controlador Lógico Programable",
    cadena_creditos: "2-3-5",
    horas_teoria: 2,
    horas_practica: 3,
    creditos: 5,
  },
  // MATERIA DE ESPECIALIDAD (Semestre 8)
  {
    semestre_recomendado: 8,
    clave: "CUI-2408", // Clave hipotética basada en el PDF (CUI2408)
    nombre: "Calidad del Voltaje",
    cadena_creditos: "4-0-4",
    horas_teoria: 4,
    horas_practica: 0,
    creditos: 4,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  {
    semestre_recomendado: 8,
    clave: "ELC-1007",
    nombre: "Costos y Presupuesto de Proyectos Eléctricos",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },
  {
    semestre_recomendado: 8,
    clave: "ELF-1023",
    nombre: "Pruebas y Mantenimiento Eléctrico",
    cadena_creditos: "3-2-5",
    horas_teoria: 3,
    horas_practica: 2,
    creditos: 5,
  },
  {
    semestre_recomendado: 8,
    clave: "ELC-1024",
    nombre: "Sistemas de Iluminación",
    cadena_creditos: "2-2-4",
    horas_teoria: 2,
    horas_practica: 2,
    creditos: 4,
  },

  // ---------- Semestre 9 ----------
  // MATERIA DE ESPECIALIDAD (Semestre 9 - Optativa 1)
  {
    semestre_recomendado: 9,
    clave: "CUJ-2402", // Clave hipotética (CUJ2402)
    nombre: "Sistemas Fotovoltaicos y Eólicos",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD (Semestre 9 - Optativa 2)
  {
    semestre_recomendado: 9,
    clave: "CUI-2405", // Clave hipotética (CUI2405)
    nombre: "Calidad de la Corriente",
    cadena_creditos: "4-0-4",
    horas_teoria: 4,
    horas_practica: 0,
    creditos: 4,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD (Semestre 9 - Optativa 3)
  {
    semestre_recomendado: 9,
    clave: "CUJ-2403", // Clave hipotética (CUJ2403)
    nombre: "Protección de Sistemas Eléctricos de Potencia",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD (Semestre 9)
  {
    semestre_recomendado: 9,
    clave: "CUI-2401", // Clave hipotética (CUI2401)
    nombre: "Uso Eficiente de la Energía Eléctrica",
    cadena_creditos: "4-0-4",
    horas_teoria: 4,
    horas_practica: 0,
    creditos: 4,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  // MATERIA DE ESPECIALIDAD (Semestre 9 - Optativa 4)
  {
    semestre_recomendado: 9,
    clave: "CUJ-2406", // Clave hipotética (CUJ2406)
    nombre: "Sistemas Eléctricos de Distribución",
    cadena_creditos: "4-2-6",
    horas_teoria: 4,
    horas_practica: 2,
    creditos: 6,
    es_modulo_especialidad: true,
    area_materia: "Especialidad",
  },
  {
    semestre_recomendado: 9,
    clave: "ELQ-1012",
    nombre: "Gestión Empresarial y Liderazgo",
    cadena_creditos: "1-2-3",
    horas_teoria: 1,
    horas_practica: 2,
    creditos: 3,
  },
  {
    semestre_recomendado: 9,
    clave: "RES-IELE-2010-209",
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

    console.log("Materias de Ingeniería Eléctrica IELE-2010-209 (con especialidad CUE) guardadas.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

main();