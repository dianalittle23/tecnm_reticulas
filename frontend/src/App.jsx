import React, { useEffect, useMemo, useState, useRef } from "react";
import { API_URL } from "./config";
import "./App.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// URL BASE backend en Railway
const API_BASE = `${API_URL}/api`;

// Utilidad para llamar a la API
const fetchJson = async (url, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const fullUrl = query ? `${url}?${query}` : url;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      console.error(`Error al obtener datos de ${fullUrl}: ${response.status}`);
      return [];
    }
    return response.json();
  } catch (e) {
    console.error(`Error de red al llamar a ${fullUrl}:`, e);
    return [];
  }
};

function App() {
  const [tecs, setTecs] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [materias, setMaterias] = useState([]);

  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroTec, setFiltroTec] = useState("");
  const [filtroCarrera, setFiltroCarrera] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroClave, setFiltroClave] = useState("");
  const [soloEspecialidad, setSoloEspecialidad] = useState(false);

  const [reticulaMaterias, setReticulaMaterias] = useState([]);

  // Materias para la gráfica de la opción 2
  const [grafMateria1, setGrafMateria1] = useState("");
  const [grafMateria2, setGrafMateria2] = useState("");
  const [grafMateria3, setGrafMateria3] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // 10 materias por página

  // refs para scroll
  const tablaRef = useRef(null);
  const reticulaRef = useRef(null);
  const graficaRef = useRef(null);

  // Cargar tecs al iniciar
  useEffect(() => {
    fetchJson(`${API_BASE}/tecs`).then((data) => setTecs(data));
  }, []);

  // Cargar carreras cuando cambia el Tec
  useEffect(() => {
    if (!filtroTec) {
      setCarreras([]);
      setFiltroCarrera("");
      return;
    }
    fetchJson(`${API_BASE}/carreras`, { tecId: filtroTec }).then((data) =>
      setCarreras(data)
    );
  }, [filtroTec]);

  // Buscar materias para la tabla
  const buscarMaterias = () => {
    const params = {};

    if (filtroTec) params.tecId = filtroTec;
    if (filtroCarrera) params.carreraId = filtroCarrera;
    if (filtroNombre) params.nombre = filtroNombre;
    if (filtroClave) params.clave = filtroClave;
    if (soloEspecialidad) params.soloEspecialidad = true;

    fetchJson(`${API_BASE}/materias`, params).then((data) => {
      setMaterias(data);
      setCurrentPage(1); // resetear a la primera página

      if (tablaRef.current) {
        tablaRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };

  // Limpiar filtros, resultados y gráfica
  const limpiarFiltros = () => {
    setFiltroEstado("");
    setFiltroTec("");
    setFiltroCarrera("");
    setFiltroNombre("");
    setFiltroClave("");
    setSoloEspecialidad(false);

    setGrafMateria1("");
    setGrafMateria2("");
    setGrafMateria3("");

    setMaterias([]);
    setReticulaMaterias([]);
    setCurrentPage(1);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cargar TODAS las materias de la carrera seleccionada (retícula)
  useEffect(() => {
    if (!filtroCarrera) {
      setReticulaMaterias([]);
      return;
    }

    const params = { carreraId: filtroCarrera };
    if (filtroTec) params.tecId = filtroTec;

    fetchJson(`${API_BASE}/materias`, params).then((data) => {
      setReticulaMaterias(data);
    });
  }, [filtroCarrera, filtroTec]);

  // Lista de estados
  const estados = useMemo(
    () =>
      Array.from(new Set(tecs.map((t) => t.estado).filter(Boolean))).sort(),
    [tecs]
  );

  // Tec filtrados por estado
  const tecsFiltrados = useMemo(
    () => tecs.filter((t) => !filtroEstado || t.estado === filtroEstado),
    [tecs, filtroEstado]
  );

  // Carrera seleccionada
  const carreraSeleccionada = useMemo(
    () => carreras.find((c) => c._id === filtroCarrera) || null,
    [carreras, filtroCarrera]
  );

  // Materias por semestre (tronco común) para retícula
  const materiasPorSemestre = useMemo(() => {
    const grupos = {};
    reticulaMaterias
      .filter((m) => !m.es_modulo_especialidad)
      .forEach((m) => {
        const sem = m.semestre_recomendado || 0;
        if (!grupos[sem]) grupos[sem] = [];
        grupos[sem].push(m);
      });
    return grupos;
  }, [reticulaMaterias]);

  // Materias de especialidad
  const materiasEspecialidad = useMemo(
    () => reticulaMaterias.filter((m) => m.es_modulo_especialidad),
    [reticulaMaterias]
  );

  // Agrupar especialidad por nombre_especialidad
  const especialidades = useMemo(() => {
    const map = {};
    materiasEspecialidad.forEach((m) => {
      const nombreEsp = m.nombre_especialidad || "Módulo de especialidad";
      if (!map[nombreEsp]) map[nombreEsp] = [];
      map[nombreEsp].push(m);
    });
    return map;
  }, [materiasEspecialidad]);

  // ==== DATOS DE LA GRÁFICA PRINCIPAL (OPCIÓN 2) ====
  const datosDistribucionMaterias = useMemo(() => {
    if (!materias.length) return [];

    const nombresBuscados = [grafMateria1, grafMateria2, grafMateria3]
      .map((n) => n.trim())
      .filter(Boolean);

    if (!nombresBuscados.length) return [];

    // Todas las carreras distintas que aparecen en LOS RESULTADOS
    const carrerasTotales = new Set(
      materias.map((m) => m.carrera?.nombre).filter(Boolean)
    );
    const totalCarreras = carrerasTotales.size || 1;

    return nombresBuscados.map((nombreMateria) => {
      const carrerasConEsaMateria = new Set();

      materias.forEach((m) => {
        const nombre = (m.nombre || "").toLowerCase();
        const buscado = nombreMateria.toLowerCase();

        if (nombre.includes(buscado) && m.carrera?.nombre) {
          carrerasConEsaMateria.add(m.carrera.nombre);
        }
      });

      const cantidadCarreras = carrerasConEsaMateria.size;
      const porcentaje = ((cantidadCarreras / totalCarreras) * 100).toFixed(1);

      return {
        materia: nombreMateria,
        carreras: cantidadCarreras,
        porcentaje: Number(porcentaje),
      };
    });
  }, [materias, grafMateria1, grafMateria2, grafMateria3]);

  // Scroll a especialidad cuando se marca la casilla
  useEffect(() => {
    if (soloEspecialidad) {
      setTimeout(() => {
        const el = document.getElementById("seccion-especialidad");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [soloEspecialidad]);

  // ==== PAGINACIÓN: materias de la página actual ====
  const totalPages = Math.max(1, Math.ceil(materias.length / pageSize));
  const inicio = (currentPage - 1) * pageSize;
  const fin = Math.min(inicio + pageSize, materias.length);
  const materiasPaginaActual = materias.slice(inicio, fin);

  // Si cambia el número total de páginas y la actual se sale del rango
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const irAPagina = (value) => {
    if (!value) return;
    const num = Number(value);
    if (Number.isNaN(num)) return;
    const safe = Math.min(Math.max(1, num), totalPages);
    setCurrentPage(safe);
  };

  const irAGrafica = () => {
    if (graficaRef.current) {
      graficaRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="app">
      {/* ENCABEZADO */}
      <header className="app-header">
        <div className="header-title">
          <h1>Retículas TecNM</h1>
          <p>Consulta de planes de estudio por estado, plantel y carrera</p>
        </div>
      </header>

      {/* FILTROS DE BÚSQUEDA */}
      <section className="filters-card">
        <h2 className="section-title">
          Filtros de búsqueda
        </h2>
        <div className="filters-grid">
          {/* ESTADO */}
          <div className="field">
            <label>
              <strong>Estado</strong>
            </label>
            <select
              value={filtroEstado}
              onChange={(e) => {
                const nuevoEstado = e.target.value;
                setFiltroEstado(nuevoEstado);
                setFiltroTec("");
                setFiltroCarrera("");
              }}
            >
              <option value="">Todos</option>
              {estados.map((est) => (
                <option key={est} value={est}>
                  {est}
                </option>
              ))}
            </select>
          </div>

          {/* TECNOLÓGICO */}
          <div className="field">
            <label>
              <strong>Tecnológico</strong>
            </label>
            <select
              value={filtroTec}
              onChange={(e) => {
                setFiltroTec(e.target.value);
                setFiltroCarrera("");
              }}
            >
              <option value="">Todos</option>
              {tecsFiltrados.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* CARRERA */}
          <div className="field">
            <label>
              <strong>Carrera</strong>
            </label>
            <select
              value={filtroCarrera}
              onChange={(e) => setFiltroCarrera(e.target.value)}
            >
              <option value="">Todas</option>
              {carreras.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* NOMBRE DE MATERIA */}
          <div className="field">
            <label>
              <strong>Nombre de materia</strong>
            </label>
            <input
              type="text"
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
              placeholder="Ej. Cálculo, Programación..."
            />
          </div>

          {/* CLAVE */}
          <div className="field">
            <label>
              <strong>Clave</strong>
            </label>
            <input
              type="text"
              value={filtroClave}
              onChange={(e) => setFiltroClave(e.target.value)}
              placeholder="Ej. ACF-0901"
            />
          </div>

          {/* SOLO ESPECIALIDAD */}
          <div className="field field-checkbox">
            <label>
              <strong>Solo especialidad</strong>
            </label>
            <div className="checkbox-row">
              <input
                type="checkbox"
                checked={soloEspecialidad}
                onChange={(e) => setSoloEspecialidad(e.target.checked)}
              />
              <span>Mostrar solo módulos de especialidad</span>
            </div>
          </div>

          {/* MATERIAS PARA LA GRÁFICA (OPCIÓN 2) */}
          <div className="field campos-grafico">
            <label>
              <strong>Materias a analizar</strong>
            </label>
            <input
              type="text"
              value={grafMateria1}
              onChange={(e) => setGrafMateria1(e.target.value)}
              placeholder='Materia 1 (ej. "Álgebra Lineal")'
            />
            <input
              type="text"
              value={grafMateria2}
              onChange={(e) => setGrafMateria2(e.target.value)}
              placeholder='Materia 2 (ej. "Cálculo Integral")'
            />
            <input
              type="text"
              value={grafMateria3}
              onChange={(e) => setGrafMateria3(e.target.value)}
              placeholder="Materia 3 (opcional)"
            />
          </div>

          {/* BOTONES */}
          <div className="field-button botones-filtros">
            <button className="primary-button" onClick={buscarMaterias}>
              Buscar
            </button>

            <button
              className="primary-button secondary-button"
              type="button"
              onClick={() => {
                if (!filtroCarrera) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  return;
                }
                if (reticulaRef.current) {
                  reticulaRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              Ver retícula
            </button>

            <button
              className="primary-button secondary-button"
              type="button"
              onClick={limpiarFiltros}
            >
              Limpiar
            </button>

            <button
              className="primary-button secondary-button"
              type="button"
              onClick={irAGrafica}
            >
              Ver gráfica
            </button>
          </div>
        </div>
      </section>

      {/* RESULTADOS DE LA BÚSQUEDA (justo debajo de filtros) */}
      <section className="tabla-section" ref={tablaRef}>
        <h2 className="section-title">Resultados de la búsqueda</h2>
        <div className="tabla-wrapper">
          <table className="result-table">
            <thead>
              <tr>
                <th>Clave</th>
                <th>Nombre de materia</th>
                <th>Créditos</th>
                <th>Semestre</th>
                <th>Especialidad</th>
                <th>Prerrequisitos</th>
                <th>Estado</th>
                <th>Tec</th>
                <th>Carrera</th>
              </tr>
            </thead>
            <tbody>
              {materiasPaginaActual.map((m) => {
                const estadoTec =
                  tecs.find((t) => t._id === m.tec?._id)?.estado || "—";

                return (
                  <tr key={m._id}>
                    <td>{m.clave}</td>
                    <td>{m.nombre}</td>
                    <td>{m.creditos}</td>
                    <td>{m.semestre_recomendado}</td>
                    <td>{m.es_modulo_especialidad ? "Sí" : "No"}</td>
                    <td>
                      {m.prerrequisitos?.length > 0
                        ? m.prerrequisitos.map((p) => p.clave).join(", ")
                        : "—"}
                    </td>
                    <td>{estadoTec}</td>
                    <td>{m.tec?.nombre}</td>
                    <td>{m.carrera?.nombre}</td>
                  </tr>
                );
              })}
              {materias.length === 0 && (
                <tr>
                  <td colSpan="9" className="empty-text">
                    Usa los filtros de arriba y presiona <b>Buscar</b> para ver
                    materias.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PIE DE TABLA CON PAGINACIÓN */}
        {materias.length > 0 && (
          <div className="tabla-footer">
            <span>
              Mostrando <b>{inicio + 1}</b> – <b>{fin}</b> de{" "}
              <b>{materias.length}</b> materias
            </span>

            <div className="pagination">
              <button
                className="pagination-button"
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.max(1, prev - 1))
                }
                disabled={currentPage === 1}
              >
                Anterior
              </button>

              <span className="pagination-page">
                Página{" "}
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => irAPagina(e.target.value)}
                />{" "}
                de {totalPages}
              </span>

              <button
                className="pagination-button"
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </section>

      {/* RETÍCULA (debajo de resultados) */}
      {filtroCarrera && (
        <section className="reticula-section" ref={reticulaRef}>
          {carreraSeleccionada && (
            <div className="career-summary-card">
              <h2>{carreraSeleccionada.nombre}</h2>
              <div className="career-summary-tags">
                <span>
                  <strong>Modalidad:</strong>{" "}
                  {carreraSeleccionada.modalidad || "—"}
                </span>
                <span>
                  <strong>Grado:</strong> {carreraSeleccionada.grado || "—"}
                </span>
                {carreraSeleccionada.clave_oficial && (
                  <span>
                    <strong>Clave oficial:</strong>{" "}
                    {carreraSeleccionada.clave_oficial}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Retícula por semestre */}
          <div className="reticula-header-row">
            <h3 className="section-title">Retícula por semestre</h3>
          </div>

          {Object.keys(materiasPorSemestre).length === 0 ? (
            <p className="empty-text">
              No hay materias registradas para esta carrera.
            </p>
          ) : (
            <div className="semestres-grid">
              {Object.entries(materiasPorSemestre)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([semestre, mats]) => (
                  <div key={semestre} className="semestre-card">
                    <h4 className="semestre-title">Semestre {semestre}</h4>
                    <ul className="materias-list">
                      {mats.map((m) => (
                        <li key={m._id} className="materia-item">
                          <div className="materia-header">
                            <span className="materia-clave">{m.clave}</span>
                            <span className="materia-nombre">{m.nombre}</span>
                          </div>
                          <div className="materia-detalles">
                            Teoría: {m.horas_teoria ?? 0} h · Práctica:{" "}
                            {m.horas_practica ?? 0} h · Créditos:{" "}
                            {m.creditos ?? 0}
                          </div>
                          <div className="materia-prerreq">
                            Prerrequisitos:{" "}
                            {m.prerrequisitos?.length
                              ? m.prerrequisitos.map((p) => p.clave).join(", ")
                              : "Ninguno"}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}

          {/* Especialidad */}
          {soloEspecialidad && materiasEspecialidad.length > 0 && (
            <div id="seccion-especialidad" className="especialidad-section">
              <h3 className="section-title">Módulos de especialidad</h3>
              {Object.entries(especialidades).map(([nombreEsp, mats]) => (
                <div key={nombreEsp} className="especialidad-bloque">
                  <h4 className="especialidad-title">{nombreEsp}</h4>
                  <ul className="materias-list">
                    {mats.map((m) => (
                      <li key={m._id} className="materia-item">
                        <div className="materia-header">
                          <span className="materia-clave">{m.clave}</span>
                          <span className="materia-nombre">{m.nombre}</span>
                        </div>
                        <div className="materia-detalles">
                          Teoría: {m.horas_teoria ?? 0} h · Práctica:{" "}
                          {m.horas_practica ?? 0} h · Créditos:{" "}
                          {m.creditos ?? 0}
                        </div>
                        <div className="materia-prerreq">
                          Prerrequisitos:{" "}
                          {m.prerrequisitos?.length
                            ? m.prerrequisitos.map((p) => p.clave).join(", ")
                            : "Ninguno"}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* GRÁFICA PRINCIPAL – A TODO EL ANCHO */}
      <section className="grafica-section grafica-full" ref={graficaRef}>
        <h2 className="section-title">Análisis de materias</h2>

        {materias.length === 0 ? (
          <p className="empty-text">
            Realiza una búsqueda para ver la gráfica basada en los resultados.
          </p>
        ) : datosDistribucionMaterias.length === 0 ? (
          <p className="empty-text">
            Escribe al menos una materia en los campos{" "}
            <b>"Materias a analizar"</b> para ver el porcentaje de carreras
            donde aparece.
          </p>
        ) : (
          <div className="chart-card">
            <h3>Porcentaje de carreras donde aparece cada materia</h3>
            <p className="chart-subtitle">
              Sobre el total de carreras que aparecen en los resultados de la
              búsqueda actual.
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={datosDistribucionMaterias}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 80, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.25)"
                />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: "#f8f7ff" }}
                  stroke="#f8f7ff"
                  label={{
                    value: "Porcentaje de carreras (%)",
                    position: "insideBottom",
                    offset: -5,
                    fontSize: 12,
                    fill: "#f8f7ff",
                  }}
                />
                <YAxis
                  dataKey="materia"
                  type="category"
                  tick={{ fontSize: 12, fill: "#f8f7ff" }}
                  stroke="#f8f7ff"
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "porcentaje") {
                      return [`${value}%`, "Porcentaje"];
                    }
                    if (name === "carreras") {
                      return [`${value} carreras`, "Carreras"];
                    }
                    return [value, name];
                  }}
                  labelFormatter={(label, payload) => {
                    const row = payload && payload[0] && payload[0].payload;
                    if (!row) return label;
                    return `${row.materia} – ${row.carreras} carreras (${row.porcentaje}%)`;
                  }}
                  contentStyle={{
                    background: "#050716",
                    border: "1px solid #832eb4",
                    borderRadius: 8,
                    color: "#f8f7ff",
                  }}
                />
                <Bar
                  dataKey="porcentaje"
                  name="Porcentaje"
                  fill="#7dd3fc" // azul claro
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
