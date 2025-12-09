// backend/seed_materias_ITSCiudadConstitucion_isic.js
const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");
const Materia = require("./models/Materia");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";
const TEC_NOMBRE = "Instituto Tecnológico Superior de Ciudad Constitución";
const CARRERA_NOMBRE = "Ingeniería en Sistemas Computacionales";
const PLAN_ANIO = 2010;

const materiasDatos = [
  // Semestre 1
  { semestre: 1, clave: "ACF-0901", nombre: "Cálculo Diferencial", cadena: "3-2-5" },
  { semestre: 1, clave: "AED-1285", nombre: "Fundamentos de Programación", cadena: "2-3-5" },
  { semestre: 1, clave: "ACA-0907", nombre: "Taller de Ética", cadena: "0-4-4" },
  { semestre: 1, clave: "AEF-1041", nombre: "Matemáticas Discretas", cadena: "3-2-5" },
  { semestre: 1, clave: "SCH-1024", nombre: "Taller de Administración", cadena: "1-3-4" },
  { semestre: 1, clave: "ACC-0906", nombre: "Fundamentos de Investigación", cadena: "2-2-4" },
  // Semestre 2
  { semestre: 2, clave: "ACF-0902", nombre: "Cálculo Integral", cadena: "3-2-5" },
  { semestre: 2, clave: "AED-1286", nombre: "Programación Orientada a Objetos", cadena: "2-3-5" },
  { semestre: 2, clave: "AEC-1008", nombre: "Contabilidad Financiera", cadena: "2-2-4" },
  { semestre: 2, clave: "AEC-1058", nombre: "Química", cadena: "2-2-4" },
  { semestre: 2, clave: "ACF-0903", nombre: "Álgebra Lineal", cadena: "3-2-5" },
  { semestre: 2, clave: "AEF-1052", nombre: "Probabilidad y Estadística", cadena: "3-2-5" },
  // Semestre 3
  { semestre: 3, clave: "ACF-0904", nombre: "Cálculo Vectorial", cadena: "3-2-5" },
  { semestre: 3, clave: "AED-1026", nombre: "Estructura de Datos", cadena: "2-3-5" },
  { semestre: 3, clave: "SCC-1005", nombre: "Cultura Empresarial", cadena: "2-2-4" },
  { semestre: 3, clave: "SCC-1013", nombre: "Investigación de Operaciones", cadena: "2-2-4" },
  { semestre: 3, clave: "ACD-0908", nombre: "Desarrollo Sustentable", cadena: "2-3-5" },
  { semestre: 3, clave: "SCF-1006", nombre: "Física General", cadena: "3-2-5" },
  // Semestre 4
  { semestre: 4, clave: "ACF-0905", nombre: "Ecuaciones Diferenciales", cadena: "3-2-5" },
  { semestre: 4, clave: "SCC-1017", nombre: "Métodos Numéricos", cadena: "2-2-4" },
  { semestre: 4, clave: "SCD-1027", nombre: "Tópicos Avanzados de Programación", cadena: "2-3-5" },
  { semestre: 4, clave: "AEF-1031", nombre: "Fundamentos de Base de Datos", cadena: "3-2-5" },
  { semestre: 4, clave: "SCD-1022", nombre: "Simulación", cadena: "2-3-5" },
  { semestre: 4, clave: "SCD-1018", nombre: "Principios Eléctricos y Aplicaciones Digitales", cadena: "2-3-5" },
  // Semestre 5
  { semestre: 5, clave: "SCC-1010", nombre: "Graficación", cadena: "2-2-4" },
  { semestre: 5, clave: "AEC-1034", nombre: "Fundamentos de Telecomunicaciones", cadena: "2-2-4" },
  { semestre: 5, clave: "AEC-1061", nombre: "Sistemas Operativos", cadena: "2-2-4" },
  { semestre: 5, clave: "SCA-1025", nombre: "Taller de Base de Datos", cadena: "0-4-4" },
  { semestre: 5, clave: "SCC-1007", nombre: "Fundamentos de Ingeniería de Software", cadena: "2-2-4" },
  { semestre: 5, clave: "SCD-1003", nombre: "Arquitectura de Computadoras", cadena: "2-3-5" },
  // Semestre 6
  { semestre: 6, clave: "SCD-1015", nombre: "Lenguajes y Autómatas I", cadena: "2-3-5" },
  { semestre: 6, clave: "SCD-1021", nombre: "Redes de Computadoras", cadena: "2-3-5" },
  { semestre: 6, clave: "SCA-1026", nombre: "Taller de Sistemas Operativos", cadena: "0-4-4" },
  { semestre: 6, clave: "SCB-1001", nombre: "Administración de Base de Datos", cadena: "1-4-5" },
  { semestre: 6, clave: "SCD-1011", nombre: "Ingeniería de Software", cadena: "2-3-5" },
  { semestre: 6, clave: "SCC-1014", nombre: "Lenguajes de Interfaz", cadena: "2-2-4" },
  // Semestre 7
  { semestre: 7, clave: "SCD-1016", nombre: "Lenguajes y Autómatas II", cadena: "2-3-5" },
  { semestre: 7, clave: "SCD-1004", nombre: "Conmutación y Enrutamiento en Redes de Datos", cadena: "2-3-5" },
  { semestre: 7, clave: "ACA-0909", nombre: "Taller de Investigación I", cadena: "0-4-4" },
  { semestre: 7, clave: "SCG-1009", nombre: "Gestión de Proyectos de Software", cadena: "3-3-6" },
  { semestre: 7, clave: "SCC-1023", nombre: "Sistemas Programables", cadena: "2-2-4" },
  // Semestre 8
  { semestre: 8, clave: "SCC-1019", nombre: "Programación Lógica y Funcional", cadena: "2-2-4" },
  { semestre: 8, clave: "SCA-1002", nombre: "Administración de Redes", cadena: "0-4-4" },
  { semestre: 8, clave: "ACA-0910", nombre: "Taller de Investigación II", cadena: "0-4-4" },
  { semestre: 8, clave: "AEB-1055", nombre: "Programación Web", cadena: "1-4-5" },
  // Semestre 9
  { semestre: 9, clave: "SCC-1012", nombre: "Inteligencia Artificial", cadena: "2-2-4" },
  { semestre: 9, clave: "RES-ISIC-2010-224", nombre: "Residencia Profesional", cadena: "0-0-10" }
];

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    const tec = await Tec.findOne({ nombre: TEC_NOMBRE });
    if (!tec) { console.error(`Tec no encontrado: ${TEC_NOMBRE}`); return; }
    const carrera = await Carrera.findOne({ nombre: CARRERA_NOMBRE, tec: tec._id });
    if (!carrera) { console.error(`Carrera no encontrada: ${CARRERA_NOMBRE}`); return; }

    for (const data of materiasDatos) {
        const [ht, hp, cr] = data.cadena.split('-').map(Number);
        await Materia.findOneAndUpdate(
            { clave: data.clave, tec: tec._id, carrera: carrera._id },
            { ...data, tec: tec._id, carrera: carrera._id, horas_teoria: ht, horas_practica: hp, creditos: cr, plan_anio: PLAN_ANIO, tipo_unidad: "Curso", area_materia: "Basica" },
            { new: true, upsert: true }
        );
        console.log(`Guardada: ${data.nombre}`);
    }
    console.log("Finalizado Sistemas.");
  } catch (err) { console.error(err); } finally { await mongoose.disconnect(); }
}
main();