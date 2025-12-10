"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page_listagem.module.css";

export default function Listagem() {
    const [activeTab, setActiveTab] = useState("Clientes");


    const [clientes, setClientes] = useState([]);
    const [carros, setCarros] = useState([]);

    const fetchClientes = async () => {
        try {
            const res = await fetch("http://localhost:8086/clientes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            setClientes(data);
        } catch (error) {
            console.log("Erro ao carregar clientes:", error);
        }
    };

    const fetchCarros = async () => {
        try {
            const res = await fetch("http://localhost:8086/carros", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            setCarros(data);
        } catch (error) {
            console.log("Erro ao carregar carros:", error);
        }
    };

    const deleteCliente = async (id) => {
        try {
            await fetch(`http://localhost:8086/clientes/${id}`, {
                method: "DELETE"
            });

            fetchClientes();
        } catch (error) {
            console.log("Erro ao excluir cliente:", error);
        }
    };

    const deleteCarro = async (id) => {
        try {
            await fetch(`http://localhost:8086/carros/${id}`, {
                method: "DELETE"
            });

            fetchCarros();
        } catch (error) {
            console.log("Erro ao excluir carro:", error);
        }
    };


    useEffect(() => {
        fetchClientes();
        fetchCarros();
    }, []);

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
                        <button className={styles.deleteButton} onClick={() => deleteCliente(cliente.id_cliente)}>Excluir</button>
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
                        {console.log(carro)}
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
                        <button className={styles.deleteButton} onClick={() => deleteCarro(carro.id_carro)}>Excluir</button>
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
                            className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ""
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