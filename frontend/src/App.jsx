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

// URL BASE  backend en Railway
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

  // Materias para gráfico 1
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

  // === CÁLCULO DEL GRÁFICO 1: materias compartidas entre carreras ===
  const calcularGrafico = (materiasBase) => {
    const base = materiasBase || materias;

    const nombres
