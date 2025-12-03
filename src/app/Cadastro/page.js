"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './page_cadastro.module.css';

export default function Cadastro() {

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  async function buscarCep() {
    if (!cep) {
      alert("Digite um CEP!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:80886/api-externa/cep/${cep}`);
      const dados = await response.json();

      if (dados.erro) {
        alert("CEP não encontrado!");
        return;
      }

      setRua(dados.logradouro || "");
      setCidade(dados.localidade || "");
      setEstado(dados.uf || "");

    } catch (error) {
      alert("Erro ao buscar CEP");
    }
  }

  return (
    <div className={styles.cadastroContainer}>
      
      <Link href="/">
        <button className={styles.backButton}>⬅️ Voltar à Inicial</button>
      </Link>

      <div className={styles.cadastroBox}>

        <div className={styles.logoHeader}>
          <span>🚗</span>
          <span>Locadora SansCar</span>
        </div>

        <form className={styles.cadastroForm}>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>👤</span>
              <input type="text" placeholder="Nome completo*" className={styles.inputField} />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>🪪</span>
              <input type="text" placeholder="CPF*" className={styles.inputField} />
            </div>

            <div className={styles.inputGroup}>
              <span>📞</span>
              <input type="text" placeholder="Telefone*" className={styles.inputField} />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>📧</span>
              <input type="email" placeholder="E-mail*" className={styles.inputField} />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>🔒</span>
              <input type="password" placeholder="Senha*" className={styles.inputField} />
            </div>

            <div className={styles.inputGroup}>
              <span>🔒</span>
              <input type="password" placeholder="Confirmar senha*" className={styles.inputField} />
            </div>
          </div>

          <div className={`${styles.formRow} ${styles.cepRow}`}>
            
            <div className={`${styles.inputGroup} ${styles.cepInput}`}>
              <span>📮</span>
              <input
                type="text"
                placeholder="CEP*"
                className={styles.inputField}
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>

            <button
              type="button"
              className={styles.cepButton}
              onClick={buscarCep}
            >
              Buscar CEP
            </button>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>🏠</span>
              <input type="text" placeholder="Rua" className={styles.inputField} value={rua} readOnly />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>🏙️</span>
              <input type="text" placeholder="Cidade" className={styles.inputField} value={cidade} readOnly />
            </div>

            <div className={styles.inputGroup}>
              <span>🗺️</span>
              <input type="text" placeholder="Estado" className={styles.inputField} value={estado} readOnly />
            </div>
          </div>

          <button type="submit" className={styles.registerButton}>
            Realizar cadastro
          </button>

        </form>

        <Link href="/login" className={styles.backToLogin}>
          Voltar ao login
        </Link>

      </div>
    </div>
  );
}