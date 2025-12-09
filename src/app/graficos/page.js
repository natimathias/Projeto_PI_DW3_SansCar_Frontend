"use client";

import Link from "next/link";
import {
  LineChart, Line,
  CartesianGrid, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";

import styles from "./page_graficos.module.css";

export default function PaginaGraficos() {
    const faturamento = [
        { mes: "Jan", valor: 12000 },
        { mes: "Fev", valor: 15000 },
        { mes: "Mar", valor: 18000 },
        { mes: "Abr", valor: 22000 },
        { mes: "Mai", valor: 26000 },
        { mes: "Jun", valor: 30000 },
    ];

    const categorias = [
        { name: "Econômico", value: 45 },
        { name: "SUV", value: 25 },
        { name: "Luxo", value: 15 },
        { name: "Pick-up", value: 15 }
    ];

    const funcionarios = [
        { nome: "Ana", alugueis: 20 },
        { nome: "Carlos", alugueis: 14 },
        { nome: "Pedro", alugueis: 30 },
        { nome: "Julia", alugueis: 25 }
    ];

    const cores = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];

    return (
        <div className={styles.container}>

            <h1 className={styles.titulo}>
                📊 Dashboard — Relatórios da Locadora SansCar
            </h1>

            <Link href="/">
                <button className={styles.botaoVoltar}>
                    ⬅️ Voltar
                </button>
            </Link>

            <div className={styles.grid}>

                {/* Gráfico de Linha */}
                <div className={styles.card}>
                    <h2 className={styles.subtitulo}>Faturamento Mensal</h2>
                    <LineChart width={400} height={250} data={faturamento}>
                        <Line type="monotone" dataKey="valor" stroke="#00C49F" strokeWidth={3} />
                        <CartesianGrid stroke="#333" />
                        <XAxis dataKey="mes" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                    </LineChart>
                </div>

                {/* Gráfico de Pizza */}
                <div className={styles.card}>
                    <h2 className={styles.subtitulo}>Categorias Mais Alugadas</h2>
                    <PieChart width={400} height={250}>
                        <Pie
                            data={categorias}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={100}
                            label
                        >
                            {categorias.map((e, i) => (
                                <Cell key={i} fill={cores[i % cores.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>

                {/* Gráfico de Barras */}
                <div className={styles.card}>
                    <h2 className={styles.subtitulo}>Atendimento por Funcionário</h2>
                    <BarChart width={400} height={250} data={funcionarios}>
                        <CartesianGrid stroke="#333" />
                        <XAxis dataKey="nome" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <Bar dataKey="alugueis" fill="#8884d8" />
                    </BarChart>
                </div>

            </div>
        </div>
    );
}