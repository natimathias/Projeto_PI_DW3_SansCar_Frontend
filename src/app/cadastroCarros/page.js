"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./page_cadastroCarros.module.css";

export default function CadastroCarro() {
  const [imagem, setImagem] = useState("");
  const [quilometragem, setQuilometragem] = useState(0);

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.cadastroBox}>
        <div className={styles.logoHeader}>
          <span>🚗</span>
          <span>Cadastrar Carro</span>
        </div>

        <form className={styles.cadastroForm}>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>🚘</span>
              <input
                type="text"
                placeholder="Modelo*"
                className={styles.inputField}
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
              />
            </div>

            <div className={styles.inputGroup}>
              <span>📅</span>
              <input
                type="number"
                placeholder="Ano*"
                className={styles.inputField}
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
              />
            </div>

            <div className={styles.inputGroup}>
              <span>🏷️</span>
              <select className={styles.inputField}>
                <option value="">Selecione a categoria*</option>
                <option value="economico">Econômico</option>
                <option value="suv">SUV</option>
                <option value="luxo">Luxo</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>📌</span>
              <select className={styles.inputField}>
                <option value="">Status*</option>
                <option value="disponivel">Disponível</option>
                <option value="alugado">Alugado</option>
                <option value="manutencao">Em manutenção</option>
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

          <button type="submit" className={styles.registerButton}>
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