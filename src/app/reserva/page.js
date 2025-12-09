'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page_reserva.module.css';
import { useState } from 'react';

export default function Reserva() {
    const carro = {
        modelo: "Chevrolet Onix 2024",
        placa: "VGF-3456",
        ano: 2024,
        cor: "Chumbo",
        quilometragem_atual: 17000,
        valor_diaria: 139.90,
        imagem_carro: "/carros/onix.png",
    };

    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [total, setTotal] = useState(0);

    function calcularTotal(inicio, fim) {
        if (!inicio || !fim) return;

        const i = new Date(inicio);
        const f = new Date(fim);

        const diff = Math.ceil((f - i) / (1000 * 60 * 60 * 24));

        if (diff > 0) {
            setTotal((diff * carro.valor_diaria).toFixed(2));
        } else {
            setTotal(0);
        }
    }

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                
                <div className={styles.headerSection}>
                    <h1 className={styles.pageTitle}>Reserva do Carro</h1>

                    <Link href="/aluguel">
                        <button className={styles.backButton}>⬅️ Voltar</button>
                    </Link>
                </div>

                <div className={styles.cardWrapper}>

                    <div className={styles.carCard}>
                        <Image
                            src={carro.imagem_carro}
                            width={300}
                            height={180}
                            className={styles.carImage}
                            alt="Carro escolhido"
                        />

                        <div className={styles.details}>
                            <h2 className={styles.detailsTitle}>{carro.modelo}</h2>
                            <p className={styles.detailsText}><strong>Placa:</strong> {carro.placa}</p>
                            <p className={styles.detailsText}><strong>Cor:</strong> {carro.cor}</p>
                            <p className={styles.detailsText}><strong>Ano:</strong> {carro.ano}</p>
                            <p className={styles.detailsText}><strong>KM Atual:</strong> {carro.quilometragem_atual}</p>
                            <p className={styles.price}>R$ {carro.valor_diaria}/dia</p>
                        </div>
                    </div>

                    <div className={styles.formBox}>
                        <h2 className={styles.formTitle}>Complete sua Reserva</h2>

                        <label className={styles.formLabel}>Data de Início</label>
                        <input
                            type="date"
                            className={styles.inputField}
                            value={dataInicio}
                            onChange={e => {
                                setDataInicio(e.target.value);
                                calcularTotal(e.target.value, dataFim);
                            }}
                        />

                        <label className={styles.formLabel}>Data de Devolução</label>
                        <input
                            type="date"
                            className={styles.inputField}
                            value={dataFim}
                            onChange={e => {
                                setDataFim(e.target.value);
                                calcularTotal(dataInicio, e.target.value);
                            }}
                        />

                        <div className={styles.totalBox}>
                            <p>Total:</p>
                            <span>R$ {total}</span>
                        </div>

                        <button className={styles.reserveButton}>
                            Confirmar Reserva
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}