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
  Legend,
} from "recharts";

// URL BASE del backend en Railway
const API_BASE = `${API_URL}/api`;

// Helper para fetch
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

  // Materias para gráfico
  const [graficoMateria1, setGraficoMateria1] = useState("");
  const [graficoMateria2, setGraficoMateria2] = useState("");
  const [graficoMateria3, setGraficoMateria3] = useState("");
  const [graficoDatos, setGraficoDatos] = useState([]);

  // refs para scroll
  const tablaRef = useRef(null);
  const reticulaRef = useRef(null);
  const graficoRef = useRef(null);

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

  // === CÁLCULO DEL GRÁFICO (usa las materias ya buscadas) ===
  const calcularGrafico = (materiasBase) => {
    const base = materiasBase || materias;

    const nombres = [graficoMateria1, graficoMateria2, graficoMateria3]
      .map((n) => n.trim())
      .filter(Boolean);

    if (nombres.length === 0 || base.length === 0) {
      setGraficoDatos([]);
      return;
    }

    // Carreras distintas presentes en los resultados actuales
    const carrerasTotales = new Set(
      base.map((m) => m.carrera?.nombre).filter(Boolean)
    );
    const totalCarreras = carrerasTotales.size || 1;

    const datos = nombres.map((nom) => {
      const carrerasConMateria = new Set();
      const textoBuscado = nom.toLowerCase().trim();

      base.forEach((m) => {
        const nombreMateria = (m.nombre || "").toLowerCase();

        // "contiene" por nombre de materia
        if (nombreMateria.includes(textoBuscado)) {
          if (m.carrera?.nombre) {
            carrerasConMateria.add(m.carrera.nombre);
          }
        }
      });

      const count = carrerasConMateria.size;
      const porcentaje = (count / totalCarreras) * 100;

      return {
        nombre: nom,
        count,
        porcentaje,
      };
    });

    setGraficoDatos(datos);
  };

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
      calcularGrafico(data);

      if (tablaRef.current) {
        tablaRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };

  const handleVerGrafico = () => {
    calcularGrafico();
    if (graficoRef.current) {
      graficoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
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

  // Carrera seleccionada (para mostrar modalidad, grado, etc.)
  const carreraSeleccionada = useMemo(
    () => carreras.find((c) => c._id === filtroCarrera) || null,
    [carreras, filtroCarrera]
  );

  // Materias por semestre (tronco común, para retícula)
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

  // === Datos para las gráficas de retícula ===

  // Materias por semestre (para gráfica)
  const datosMateriasPorSemestre = useMemo(() => {
    const conteo = {};
    reticulaMaterias.forEach((m) => {
      const sem = m.semestre_recomendado || 0;
      conteo[sem] = (conteo[sem] || 0) + 1;
    });

    return Object.entries(conteo)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([semestre, total]) => ({
        semestre: `Sem ${semestre}`,
        total,
      }));
  }, [reticulaMaterias]);

  // Créditos por semestre
  const datosCreditosPorSemestre = useMemo(() => {
    const suma = {};
    reticulaMaterias.forEach((m) => {
      const sem = m.semestre_recomendado || 0;
      const creditos = Number(m.creditos || 0);
      suma[sem] = (suma[sem] || 0) + creditos;
    });

    return Object.entries(suma)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([semestre, creditos]) => ({
        semestre: `Sem ${semestre}`,
        creditos,
      }));
  }, [reticulaMaterias]);

  // Scroll a especialidad cuando se marca la casilla
  useEffect(() => {
    if (soloEspecialidad) {
      setTimeout(() => {
        const el = document.getElementById("seccion-especialidad");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [soloEspecialidad]);

  return (
    <div className="app">
      {/* ENCABEZADO */}
      <header className="app-header">
        <div className="header-title">
          <h1>Retículas TecNM</h1>
          <p>Consulta de planes de estudio por estado, plantel y carrera</p>
        </div>
      </header>

      {/* TARJETA DE FILTROS */}
      <section className="filters-card">
        <h2 className="section-title">Filtros de búsqueda</h2>
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

          {/* MATERIAS PARA GRÁFICO */}
          <div className="campos-grafico">
            <label>
              <strong>Materias para gráfico</strong>
            </label>
            <input
              type="text"
              value={graficoMateria1}
              onChange={(e) => setGraficoMateria1(e.target.value)}
              placeholder="Materia 1 (obligatoria)"
            />
            <input
              type="text"
              value={graficoMateria2}
              onChange={(e) => setGraficoMateria2(e.target.value)}
              placeholder="Materia 2 (obligatoria)"
            />
            <input
              type="text"
              value={graficoMateria3}
              onChange={(e) => setGraficoMateria3(e.target.value)}
              placeholder="Materia 3 (opcional)"
            />
          </div>

          {/* BOTONES */}
          <div className="field-button botones-filtros">
            <button className="primary-button" onClick={buscarMaterias}>
              Buscar
            </button>

            <button
              className="primary-button"
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
              className="primary-button"
              type="button"
              onClick={handleVerGrafico}
            >
              Ver gráfico
            </button>
          </div>
        </div>
      </section>

      {/* RESUMEN CARRERA + RETÍCULA */}
      {filtroCarrera && (
        <section className="reticula-section" ref={reticulaRef}>
          {/* Resumen de la carrera */}
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
                              ? m.prerrequisitos
                                  .map((p) => p.clave)
                                  .join(", ")
                              : "Ninguno"}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}

          {/* Especialidad (abajo) */}
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

      {/* TABLA DE RESULTADOS */}
      <section className="tabla-section" ref={tablaRef}>
        <h2 className="section-title">Resultados de la búsqueda</h2>
        <div className="tabla-wrapper">
          <table className="result-table">
            <thead>
              <tr>
                <th>Clave</th>
                <th>Nombre</th>
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
              {materias.map((m) => (
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
                  <td>{m.tec?.estado}</td>
                  <td>{m.tec?.nombre}</td>
                  <td>{m.carrera?.nombre}</td>
                </tr>
              ))}
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
      </section>

      {/* DASHBOARD DE GRÁFICAS */}
      <section className="grafica-section" ref={graficoRef}>
        <h2 className="section-title">Análisis visual de materias</h2>

        <div className="charts-grid">
          {/* Gráfica 1: carreras que comparten la materia (por nombre) */}
          <div className="chart-card">
            <h3>Materias vs número de carreras</h3>
            <p className="chart-subtitle">
              Basado en &quot;Materias para gráfico&quot; y en las carreras de la
              búsqueda actual.
            </p>

            {graficoDatos.length === 0 ? (
              <p className="empty-text">
                Escribe una o más materias en &quot;Materias para gráfico&quot;,
                pulsa <b>Buscar</b> y luego <b>Ver gráfico</b>.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={graficoDatos}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="nombre" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Carreras" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Gráfica 2: número de materias por semestre */}
          <div className="chart-card">
            <h3>Materias por semestre (retícula)</h3>
            <p className="chart-subtitle">
              Se actualiza al seleccionar una carrera y cargar su retícula.
            </p>

            {datosMateriasPorSemestre.length === 0 ? (
              <p className="empty-text">
                Selecciona una carrera y espera a que se cargue la retícula para
                ver esta gráfica.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={datosMateriasPorSemestre}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="semestre" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" name="Materias" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Gráfica 3: créditos por semestre */}
          <div className="chart-card">
            <h3>Créditos por semestre</h3>
            <p className="chart-subtitle">
              Muestra la carga total de créditos por semestre en la retícula
              actual.
            </p>

            {datosCreditosPorSemestre.length === 0 ? (
              <p className="empty-text">
                Selecciona una carrera para ver la distribución de créditos.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={datosCreditosPorSemestre}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="semestre" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="creditos" name="Créditos" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
