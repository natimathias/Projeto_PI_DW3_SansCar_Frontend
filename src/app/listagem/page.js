"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page_listagem.module.css";

export default function Listagem() {
    const [activeTab, setActiveTab] = useState("Clientes");

    const clientes = [
        {
            id_cliente: "1",
            nome: "João Silva",
            email: "joao@gmail.com",
            telefone: "(41) 99812-3040",
        },
        {
            id_cliente: "2",
            nome: "Maria Oliveira",
            email: "maria@gmail.com",
            telefone: "(41) 99650-8821",
        },
        {
            id_cliente: "3",
            nome: "Carlos Mendes",
            email: "carlos@gmail.com",
            telefone: "(41) 99100-3344",
        },
    ];

    const carros = [
        {
            id_carro: "1",
            modelo: "Honda Civic 2022",
            placa: "ABC-1234",
            status: "Disponível",
            imagem_carro: "/img/civic.png",
        },
        {
            id_carro: "2",
            modelo: "Toyota Corolla 2021",
            placa: "XYZ-9876",
            status: "Indisponível",
            imagem_carro: "/img/corolla.png",
        },
        {
            id_carro: "3",
            modelo: "Jeep Compass 2023",
            placa: "QWE-4421",
            status: "Em manutenção",
            imagem_carro: "/img/compass.png",
        },
    ];

    const renderClientes = () => (
        <div className={styles.categoryList}>
            {clientes.map((cliente) => (
                <div key={cliente.id_cliente} className={styles.card}>
                    <div className={styles.cardInfo}>
                        <h3 className={styles.cardTitle}>{cliente.nome}</h3>
                        <p>Email: {cliente.email}</p>
                        <p>Telefone: {cliente.telefone}</p>
                    </div>

                    <div className={styles.cardActions}>
                        <button className={styles.editButton}>Editar</button>
                        <button className={styles.deleteButton}>Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderCarros = () => (
        <div className={styles.categoryList}>
            {carros.map((carro) => (
                <div key={carro.id_carro} className={styles.card}>
                    
                    <div className={styles.imageContainer}>
                        <Image
                            src={carro.imagem_carro}
                            alt={carro.modelo}
                            width={160}
                            height={110}
                            className={styles.cardImage}
                        />
                    </div>

                    <div className={styles.cardInfo}>
                        <h3 className={styles.cardTitle}>{carro.modelo}</h3>
                        <p>Placa: {carro.placa}</p>
                        <p>Status: {carro.status}</p>
                    </div>

                    <div className={styles.cardActions}>
                        <button className={styles.editButton}>Editar</button>
                        <button className={styles.deleteButton}>Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                
                <div className={styles.headerSection}>
                    <h1 className={styles.pageTitle}>Listagem de Registros</h1>

                    <Link href="/">
                        <button className={styles.backButton}>⬅️ Voltar</button>
                    </Link>
                </div>

                <div className={styles.tabMenu}>
                    {["Clientes", "Carros"].map((tab) => (
                        <button
                            key={tab}
                            className={`${styles.tabButton} ${
                                activeTab === tab ? styles.activeTab : ""
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className={styles.listContainer}>
                    {activeTab === "Clientes" ? renderClientes() : renderCarros()}
                </div>

            </main>
        </div>
    );
}