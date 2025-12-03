// backend/seed_tecnm_from_web.js
//
// Script oficial para descargar todos los Tecnológicos y carreras
// desde https://www.tecnm.mx/?vista=Licenciaturas
//

const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const Tec = require("./models/Tec");
const Carrera = require("./models/Carrera");

const MONGODB_URI = "mongodb://127.0.0.1:27017/tecnm_reticulas";
const TECNM_URL = "https://www.tecnm.mx/?vista=Licenciaturas";

// Para limpiar emojis y caracteres raros
function limpiarTexto(texto) {
  return texto
    .replace(/[^\p{L}\p{N}\s\.,:;@()-]/gu, "") // quita emojis y símbolos raros
    .replace(/\s+/g, " ")
    .trim();
}

async function descargarPagina() {
  console.log(" Descargando página...");
  const res = await axios.get(TECNM_URL);
  console.log(" Página descargada");
  return res.data;
}

function parsearTecNM(html) {
  const $ = cheerio.load(html);

  const nodes = [];
  $("body *").each((i, el) => {
    const text = limpiarTexto($(el).text());
    if (text) nodes.push({ text, el });
  });

  console.log(` ${nodes.length} nodos leídos`);

  const tecs = [];
  let estadoActual = null;
  let tecActual = null;

  const estadoRegex = /^([A-ZÁÉÍÓÚÑ][\w\sÁÉÍÓÚÑáéíóúñ]+)\s+(\d+)\s+planteles$/;

  for (let i = 0; i < nodes.length; i++) {
    const line = nodes[i].text;

    // === 1) Estados ===
    const matchEstado = line.match(estadoRegex);
    if (matchEstado) {
      estadoActual = limpiarTexto(matchEstado[1]);
      tecActual = null;
      continue;
    }

    // === 2) Planteles (TEC) ===
    if (
      /Sitio del plantel/i.test(line) &&
      /Tecnologico|Tecnológico/i.test(line) &&
      line.length < 160 // evitar textos gigantes del menú
    ) {
      let nombreTec = line.replace(/Sitio del plantel/i, "").trim();

      // Eliminar basura tipo "7 carreras", espacios dobles, etc.
      nombreTec = nombreTec
        .replace(/\d+\s*carreras?/i, "")
        .replace(/\s{2,}/g, " ")
        .trim();

      nombreTec = limpiarTexto(nombreTec);

      if (nombreTec.length < 5) continue;

      const $el = $(nodes[i].el);
      const url = $el.find("a").attr("href") || null;

      // Evitar duplicados del mismo tec en el mismo estado
      const yaExiste = tecs.some(
        (t) => t.nombre === nombreTec && t.estado === estadoActual
      );
      if (yaExiste) {
        tecActual = tecs.find(
          (t) => t.nombre === nombreTec && t.estado === estadoActual
        );
        continue;
      }

      tecActual = {
        estado: estadoActual,
        nombre: nombreTec,
        url_plantel: url,
        carreras: [],
      };

      tecs.push(tecActual);
      continue;
    }

    // === 3) Carreras ===
    if (
      tecActual &&
      nodes[i + 1] &&
      nodes[i + 1].text.startsWith("Clave oficial:")
    ) {
      const nombreCarrera = limpiarTexto(line);

      // ----- NUEVA LÓGICA: separar clave / modalidad / grado -----
      let textoClaveCompleto = nodes[i + 1].text
        .replace("Clave oficial:", "")
        .trim();

      let clave_oficial = null;
      let modalidad = null;
      let grado = null;

      // Caso 1: todo viene en la MISMA línea
      // "IELE-2010-209 Modalidad: Escolarizada Grado: Licenciatura"
      if (/Modalidad:/i.test(textoClaveCompleto) || /Grado:/i.test(textoClaveCompleto)) {
        // Clave: antes de "Modalidad:"
        clave_oficial = limpiarTexto(
          textoClaveCompleto.split(/Modalidad:/i)[0] || ""
        );

        const modMatch = textoClaveCompleto.match(
          /Modalidad:\s*([^G]+?)(?:Grado:|$)/i
        );
        if (modMatch) {
          modalidad = limpiarTexto(modMatch[1]);
        }

        const gradoMatch = textoClaveCompleto.match(/Grado:\s*(.+)$/i);
        if (gradoMatch) {
          grado = limpiarTexto(gradoMatch[1]);
        }
      } else {
        // Caso 2: cada cosa viene en su propia línea
        clave_oficial = limpiarTexto(textoClaveCompleto);

        if (nodes[i + 2] && /^Modalidad:/i.test(nodes[i + 2].text)) {
          modalidad = limpiarTexto(
            nodes[i + 2].text.replace(/Modalidad:/i, "")
          );
        }

        if (nodes[i + 3] && /^Grado:/i.test(nodes[i + 3].text)) {
          grado = limpiarTexto(nodes[i + 3].text.replace(/Grado:/i, ""));
        }
      }

      // Enlaces Web/Retícula/Perfil
      const linkNode = nodes[i + 4];
      let web = null,
        reticula = null,
        perfil = null;
      if (linkNode) {
        const links = $(linkNode.el).find("a");
        if (links[0]) web = links.eq(0).attr("href");
        if (links[1]) reticula = links.eq(1).attr("href");
        if (links[2]) perfil = links.eq(2).attr("href");
      }

      tecActual.carreras.push({
        nombre: nombreCarrera,
        clave_oficial,
        modalidad,
        grado,
        web,
        reticula_pdf_url: reticula,
        perfil_pdf_url: perfil,
      });

      // Saltar las líneas de clave/modalidad/grado (aunque vengan juntas,
      // esto no rompe nada)
      i += 3;
    }
  }

  // Filtrar tecnológicos sin carreras
  const tecsLimpios = tecs.filter(
    (t) => t.carreras && t.carreras.length > 0
  );

  console.log(` TecNM parseado: ${tecsLimpios.length} tecnológicos válidos`);
  return tecsLimpios;
}

async function guardarEnMongo(tecsParsed) {
  console.log(" Guardando en MongoDB...");

  for (const t of tecsParsed) {
    if (!t.nombre) continue;

    const tecDoc = await Tec.findOneAndUpdate(
      { nombre: t.nombre },
      {
        nombre: t.nombre,
        estado: t.estado,
        ciudad: null,
        clave_interna: null,
        pagina_web: t.url_plantel,
      },
      { new: true, upsert: true }
    );

    const carrerasIds = [];

    for (const c of t.carreras) {
      const carreraDoc = await Carrera.findOneAndUpdate(
        { clave_oficial: c.clave_oficial, tec: tecDoc._id },
        {
          nombre: c.nombre,
          clave_oficial: c.clave_oficial,
          grado: c.grado || "Licenciatura",
          modalidad: c.modalidad || "Escolarizada",
          tec: tecDoc._id,
          reticula_pdf_url: c.reticula_pdf_url,
          perfil_pdf_url: c.perfil_pdf_url,
        },
        { new: true, upsert: true }
      );
      carrerasIds.push(carreraDoc._id);
    }

    tecDoc.oferta_carreras = carrerasIds;
    await tecDoc.save();

    console.log(
      `    ${t.nombre} - ${t.carreras.length} carreras registradas`
    );
  }

  console.log(" Importación finalizada.");
}

async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(" Conectado a MongoDB");

    const html = await descargarPagina();
    const tecsParsed = parsearTecNM(html);

    await guardarEnMongo(tecsParsed);
  } catch (err) {
    console.error(" Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log(" Desconectado");
  }
}

main();
