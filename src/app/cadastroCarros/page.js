"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page_cadastroCarros.module.css";

export default function CadastroCarro() {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [imagem, setImagem] = useState("");
  const [quilometragem, setQuilometragem] = useState("");

   useEffect(() => {
    async function carregarCategorias() {
      try {
        const resposta = await fetch("http://localhost:8086/categorias");
        const lista = await resposta.json();
        setCategoria(lista);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    }
    carregarCategorias();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const carro = {
      modelo,
      placa,
      ano,
      cor,
      id_categoria: categoriaSelecionada,
      imagem_carro: imagem,
      quilometragem_atual: quilometragem,
      status: "disponivel"
    }

    try {
      const resposta = await fetch("http://localhost:8086/carros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carro),
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        alert("Erro: " + resultado.error);
        return;
      }

      alert("Carro cadastrado com sucesso!");

      setModelo("");
      setPlaca("");
      setAno("");
      setCor("");
      setCategoriaSelecionada("");
      setImagem("");
      setQuilometragem("");

    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.cadastroBox}>
        <div className={styles.logoHeader}>
          <span>🚗</span>
          <span>Cadastrar Carro</span>
        </div>

        <form className={styles.cadastroForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>🚘</span>
              <input
                type="text"
                placeholder="Modelo*"
                className={styles.inputField}
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>🔠</span>
              <input
                type="text"
                placeholder="Placa*"
                className={styles.inputField}
                maxLength={8}
                value={placa}
                onChange={(e) => setPlaca(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <span>📅</span>
              <input
                type="number"
                placeholder="Ano*"
                className={styles.inputField}
                value={ano}
                onChange={(e) => setAno(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>🎨</span>
              <input
                type="text"
                placeholder="Cor*"
                className={styles.inputField}
                value={cor}
                onChange={(e) => setCor(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <span>🏷️</span>
              <select className={styles.inputField} value={categoriaSelecionada}
                onChange={(e) => setCategoriaSelecionada(e.target.value)}
                style={{ cursor: "pointer" }}>

                <option className={styles.inputField} value="">Selecione a categoria*</option>

                {categoria.map((cat) => (
                  <option className={styles.inputField} key={cat.id_categoria} value={cat.id_categoria}>
                    {cat.nome_categoria}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>📍</span>
              <input
                type="number"
                placeholder="Quilometragem atual"
                className={styles.inputField}
                value={quilometragem}
                onChange={(e) => setQuilometragem(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>🖼️</span>
              <input
                type="text"
                placeholder="URL da imagem do carro"
                className={styles.inputField}
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className={styles.registerButton} style={{ cursor: "pointer" }}>
            Cadastrar Carro
          </button>
        </form>

        <Link href="/">
          <button className={styles.backButton}>⬅️ Voltar à Inicial</button>
        </Link>
      </div>
    </div>
  );
}