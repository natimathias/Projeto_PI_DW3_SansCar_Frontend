"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function ReservaPage() {
    const router = useRouter();
    const params = useParams();

    const [carro, setCarro] = useState(null);
    const [categoria, setCategoria] = useState(null);
    const [formasPagamento, setFormasPagamento] = useState([]);
    const [formaSelecionada, setFormaSelecionada] = useState("");

    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const [form, setForm] = useState({
        data_retirada: "",
        data_devolucao_prevista: ""
    });

    useEffect(() => {
        async function carregarDados() {
            try {
                const idCarro = params.id;
                if (!idCarro) throw new Error("ID do carro não informado");

                /* ✅ BUSCAR CARRO */
                const resCarro = await fetch(`http://localhost:8086/carros/${idCarro}`);
                if (!resCarro.ok) throw new Error("Erro ao buscar carro");

                const carroData = await resCarro.json();
                setCarro(carroData);

                /* ✅ BUSCAR CATEGORIA */
                if (carroData.id_categoria) {
                    const resCategoria = await fetch(
                        `http://localhost:8086/categorias/${carroData.id_categoria}`
                    );

                    if (resCategoria.ok) {
                        const categoriaData = await resCategoria.json();
                        setCategoria(categoriaData);
                    }
                }

                /* ✅ BUSCAR FORMAS DE PAGAMENTO */
                const resFormas = await fetch(
                    "http://localhost:8086/formas-pagamento"
                );

                if (resFormas.ok) {
                    const formas = await resFormas.json();
                    setFormasPagamento(formas);
                }

            } catch (error) {
                setErro(error.message);
            } finally {
                setLoading(false);
            }
        }

        carregarDados();
    }, [params.id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function confirmarLocacao() {
        try {
            if (
                !form.data_retirada ||
                !form.data_devolucao_prevista ||
                !formaSelecionada
            ) {
                alert("Preencha todos os campos");
                return;
            }

            const body = {
                id_cliente: "UUID_CLIENTE_EXISTENTE",
                id_funcionario: "UUID_FUNCIONARIO_EXISTENTE",
                id_carro: carro.id_carro,
                id_forma_pagamento: formaSelecionada,
                data_retirada: form.data_retirada,
                data_devolucao_prevista: form.data_devolucao_prevista
            };

            const res = await fetch("http://localhost:8086/locacoes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const erroApi = await res.json();
                throw new Error(erroApi.error);
            }

            alert("✅ Locação realizada com sucesso!");
            router.push("/");

        } catch (error) {
            alert(error.message);
        }
    }

    if (loading) {
        return <p className={styles.loading}>Carregando...</p>;
    }

    if (erro) {
        return <p className={styles.erro}>{erro}</p>;
    }

    if (!carro) {
        return <p className={styles.erro}>Carro não encontrado</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>

                {/* ✅ IMAGEM FUNCIONANDO */}
                <img
                    src={
                        carro.imagem_carro
                            ? `http://localhost:8086/${carro.imagem_carro.replace(
                                /^\/?uploads\//,
                                "uploads/"
                            )}`
                            : "/carro-default.png"
                    }
                    alt={carro.modelo}
                    className={styles.imagem}
                />

                <h1>{carro.modelo}</h1>

                <p><strong>Placa:</strong> {carro.placa}</p>
                <p><strong>Cor:</strong> {carro.cor}</p>
                <p><strong>Categoria:</strong> {categoria?.nome}</p>
                <p><strong>KM Atual:</strong> {carro.quilometragem_atual}</p>

                <div className={styles.datasRow}>
                    <label className={styles.label}>
                        Data de Retirada
                        <input
                            type="date"
                            name="data_retirada"
                            value={form.data_retirada}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>

                    <label className={styles.label}>
                        Data de Devolução
                        <input
                            type="date"
                            name="data_devolucao_prevista"
                            value={form.data_devolucao_prevista}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </label>
                </div>

                <div className={styles.inputGroup}>
                    <span>💳</span>
                    <select
                        className={styles.inputField}
                        value={formaSelecionada}
                        onChange={(e) => setFormaSelecionada(e.target.value)}
                        style={{ cursor: "pointer" }}
                    >
                        <option value="">Forma de pagamento*</option>

                        {formasPagamento.map((forma) => (
                            <option
                                key={forma.id_forma_pagamento}
                                value={forma.id_forma_pagamento}
                            >
                                {forma.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.botoes}>
                    <button
                        className={styles.confirmar}
                        onClick={confirmarLocacao}
                    >
                        Confirmar Locação
                    </button>

                    <button
                        className={styles.cancelar}
                        onClick={() => router.back()}
                    >
                        Cancelar
                    </button>
                </div>

            </div>
        </div>
    );
}