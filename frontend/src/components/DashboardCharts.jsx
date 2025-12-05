import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#22c55e", "#06b6d4", "#f97316", "#ef4444", "#a855f7", "#eab308"];

export default function DashboardCharts({ graficoDatos, datosCreditosPorSemestre, datosMateriasPorEstado }) {
  return (
    <div className="charts-grid">

      {/* === GRAFICA 1 === */}
      {graficoDatos.length > 0 && (
        <div className="chart-card">
          <h3>Materias compartidas entre carreras</h3>
          <p className="chart-subtitle">Ranking por carreras que contienen cada materia.</p>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={graficoDatos}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 255, 0.3)" />
              <XAxis dataKey="nombre" stroke="#e5e7ff" tick={{ fill: "#e5e7ff" }} />
              <YAxis stroke="#e5e7ff" tick={{ fill: "#e5e7ff" }} />
              <Tooltip />
              <Bar dataKey="count" fill="#a855f7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* === GRAFICA 2 === */}
      {datosCreditosPorSemestre.length > 0 && (
        <div className="chart-card">
          <h3>Créditos por semestre</h3>
          <p className="chart-subtitle">Suma total de créditos encontrados en cada semestre.</p>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={datosCreditosPorSemestre}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 255, 0.3)" />
              <XAxis dataKey="semestre" stroke="#e5e7ff" />
              <YAxis stroke="#e5e7ff" />
              <Tooltip />
              <Bar dataKey="totalCreditos" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* === GRAFICA 3 === */}
      {datosMateriasPorEstado.length > 0 && (
        <div className="chart-card">
          <h3>Materias encontradas por estado</h3>
          <p className="chart-subtitle">Comparación por estado.</p>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={datosMateriasPorEstado}
                dataKey="totalMaterias"
                nameKey="estado"
                cx="50%" cy="50%"
                outerRadius={100}
                label
              >
                {datosMateriasPorEstado.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

    </div>
  );
}
