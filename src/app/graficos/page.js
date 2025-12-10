"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  CartesianGrid, XAxis, YAxis, Tooltip
} from "recharts";

import styles from "./page_graficos.module.css";

export default function PaginaGraficos() {
  
  const [carrosMaisAlugados, setCarrosMaisAlugados] = useState([]);
  const [categoriasMaisAlugadas, setCategoriasMaisAlugadas] = useState([]);

  const cores = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F", "#8884d8"];

  useEffect(() => {

    async function carregarCarros() {
      const res = await fetch("http://localhost:8086/relatorios/carros-mais-alugados", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const dados = await res.json();
      setCarrosMaisAlugados(dados);
    }

    async function carregarCategorias() {
      const res = await fetch("http://localhost:8086/relatorios/categorias-mais-alugadas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const dados = await res.json();
      setCategoriasMaisAlugadas(dados);
    }

    carregarCarros();
    carregarCategorias();

  }, []);

  return (
    <div className={styles.container}>

      <h1 className={styles.titulo}>📊 Dashboard — Relatórios da Locadora SansCar</h1>

      <Link href="/">
        <button className={styles.botaoVoltar}>⬅️ Voltar</button>
      </Link>

      <div className={styles.grid}>

        <div className={styles.card}>
          <h2 className={styles.subtitulo}>Categorias Mais Alugadas</h2>
          <PieChart width={400} height={250}>
            <Pie
              data={categoriasMaisAlugadas}
              dataKey="total"
              nameKey="categoria"
              outerRadius={100}
              label
            >
              {categoriasMaisAlugadas.map((_, i) => (
                <Cell key={i} fill={cores[i % cores.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className={styles.card}>
          <h2 className={styles.subtitulo}>Carros Mais Alugados</h2>
          <BarChart width={400} height={250} data={carrosMaisAlugados}>
            <CartesianGrid stroke="#333" />
            <XAxis dataKey="modelo" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </div>

      </div>
    </div>
  );
}
