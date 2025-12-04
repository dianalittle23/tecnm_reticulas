import React, { useEffect, useMemo, useState, useRef } from "react";
import { API_URL } from "./config";


// === CONFIGURACIÓN Y UTILIDADES CONSOLIDADAS ===

// URL BASE (se asume una URL mock para la compilación, debe ser reemplazada por tu API real)
const API_BASE = `${API_URL}/api`;

// Función para reemplazar axios.get con fetch nativo.
// Nota: Esta función hará llamadas reales a 'API_BASE'. Sin un backend funcional, las listas aparecerán vacías.
const fetchJson = async (url, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const fullUrl = query ? `${url}?${query}` : url;
  
  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      console.error(`Error al obtener datos de ${fullUrl}: ${response.status}`);
      return []; // Devuelve array vacío en caso de error HTTP
    }
    return response.json();
  } catch (e) {
    console.error(`Error de red al llamar a ${fullUrl}:`, e);
    return []; // Devuelve array vacío en caso de error de red
  }
};

// Estilos consolidados (Tailwind y CSS básico)
const styles = `
.app {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.app-header {
  background: linear-gradient(135deg, #0f172a, #1e3a8a);
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.header-title h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}
.header-title p {
  opacity: 0.9;
  font-size: 1.1rem;
}

.filters-card, .reticula-section, .tabla-section, .grafica-section {
  background-color: #f8fafc;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 25px;
  border: 1px solid #e2e8f0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e3a8a;
  border-bottom: 2px solid #93c5fd;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.field label {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #475569;
}
.field select, .field input[type="text"] {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  transition: border-color 0.3s;
}
.field select:focus, .field input[type="text"]:focus {
  border-color: #3b82f6;
  outline: none;
}
.field-checkbox .checkbox-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.field-checkbox input[type="checkbox"] {
  width: auto;
}

.campos-grafico input {
  margin-top: 5px;
}

.botones-filtros {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.primary-button {
  padding: 10px 15px;
  background-color: #1e3a8a;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.1s;
}
.primary-button:hover {
  background-color: #254b9d;
}
.primary-button:active {
  transform: scale(0.98);
}

/* RESUMEN CARRERA */
.career-summary-card {
  background-color: #e0f2fe;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 25px;
  border-left: 5px solid #3b82f6;
}
.career-summary-card h2 {
  font-size: 1.8rem;
  color: #1e3a8a;
  margin-top: 0;
  margin-bottom: 10px;
}
.career-summary-tags {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
}
.career-summary-tags strong {
  color: #1e3a8a;
}

/* RETÍCULA */
.reticula-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.semestres-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.semestre-card {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}
.semestre-title {
  font-size: 1.25rem;
  color: #1e40af;
  margin-top: 0;
  border-bottom: 1px dashed #bfdbfe;
  padding-bottom: 8px;
  margin-bottom: 10px;
  font-weight: 600;
}
.materias-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.materia-item {
  border-bottom: 1px dotted #e5e7eb;
  padding: 10px 0;
}
.materia-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.materia-header {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}
.materia-clave {
  color: #475569;
  font-size: 0.8rem;
}
.materia-nombre {
  color: #1e3a8a;
  font-size: 0.95rem;
}
.materia-detalles {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 3px;
}
.materia-prerreq {
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 3px;
}
.especialidad-section {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #bfdbfe;
}
.especialidad-title {
  font-size: 1.1rem;
  color: #1e40af;
  margin-top: 15px;
  margin-bottom: 10px;
  padding-left: 10px;
  border-left: 4px solid #3b82f6;
}

/* TABLA */
.tabla-wrapper {
  overflow-x: auto;
}
.result-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}
.result-table th, .result-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}
.result-table th {
  background-color: #e2e8f0;
  color: #1e3a8a;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
}
.result-table tr:hover {
  background-color: #f1f5f9;
}
.empty-text {
  text-align: center;
  padding: 20px;
  color: #64748b;
  font-style: italic;
}

/* GRÁFICA */
.grafica-barras {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
}
.barra-row {
  display: flex;
  align-items: center;
  gap: 15px;
}
.barra-label {
  width: 120px; /* Ancho fijo para las etiquetas */
  font-weight: 500;
  font-size: 0.9rem;
  color: #1e3a8a;
}
.barra-track {
  flex-grow: 1;
  background-color: #e0f2fe;
  height: 25px;
  border-radius: 4px;
  overflow: hidden;
}
.barra-fill {
  background-color: #3b82f6;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  transition: width 0.5s ease-out;
}
`;
// =============================================================


function App() {
  // Se ha importado useRef, useMemo, useState, y useEffect arriba.
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
    // Usamos fetchJson en lugar de axios.get
    fetchJson(`${API_BASE}/tecs`).then((data) => setTecs(data));
  }, []);

  // Cargar carreras cuando cambia el Tec
  useEffect(() => {
    if (!filtroTec) {
      setCarreras([]);
      setFiltroCarrera("");
      return;
    }
    // Usamos fetchJson en lugar de axios.get
    fetchJson(`${API_BASE}/carreras`, { tecId: filtroTec }).then((data) => setCarreras(data));
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

    // conjunto de carreras distintas en los resultados actuales
    const carrerasSet = new Set(
      base.map((m) => m.carrera?.nombre).filter(Boolean)
    );
    const totalCarreras = carrerasSet.size || 1;

    const datos = nombres.map((nom) => {
      const carrerasConMateria = new Set(
        base
          .filter((m) =>
            (m.nombre || "").toLowerCase().includes(nom.toLowerCase())
          )
          .map((m) => m.carrera?.nombre)
          .filter(Boolean)
      );

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

    // Usamos fetchJson en lugar de axios.get
    fetchJson(`${API_BASE}/materias`, params).then((data) => {
      setMaterias(data);

      // recalcula gráfico con la nueva búsqueda
      calcularGrafico(data);

      // scroll hacia la tabla
      if (tablaRef.current) {
        tablaRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };

  const handleVerGrafico = () => {
    // recalcula con los nombres actuales (por si los cambiaste)
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

    // Usamos fetchJson en lugar de axios.get
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

  // Materias por semestre (tronco común)
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
    // Estilos CSS inyectados para que la aplicación se vea correctamente
    <>
      <style>{styles}</style> 
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
          </section>
        )}

        {/* TABLA DE RESULTADOS (consulta por filtros) */}
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

        {/* GRÁFICA DE BARRAS */}
        <section className="grafica-section" ref={graficoRef}>
          <h2 className="section-title">
            Distribución de materias en carreras (gráfico)
          </h2>

          {graficoDatos.length === 0 ? (
            <p className="empty-text">
              Escribe hasta tres materias en “Materias para gráfico”, pulsa{" "}
              <b>Buscar</b> para traer las materias y luego haz clic en{" "}
              <b>Ver gráfico</b>. La gráfica usa las carreras de la búsqueda
              actual.
            </p>
          ) : (
            <div className="grafica-barras">
              {graficoDatos.map((d) => (
                <div key={d.nombre} className="barra-row">
                  <span className="barra-label">{d.nombre}</span>
                  <div className="barra-track">
                    <div
                      className="barra-fill"
                      style={{
                        width: `${Math.max(d.porcentaje, 5)}%`,
                      }}
                    >
                      <span className="barra-value">
                        {d.count} carreras ({d.porcentaje.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
