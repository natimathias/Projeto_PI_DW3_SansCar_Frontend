'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page_aluguel.module.css';
import { useEffect, useState } from 'react';

export default function Aluguel() {
    const [carros, setCarros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
    async function carregarCarros() {
        try {
            const [carrosResp, categoriasResp] = await Promise.all([
                fetch("http://localhost:8086/carros"),
                fetch("http://localhost:8086/categorias"),
            ]);

            if (!carrosResp.ok || !categoriasResp.ok) {
                throw new Error("Erro ao buscar dados.");
            }

            const listaCarros = await carrosResp.json();
            const categorias = await categoriasResp.json();

            const carrosDisponiveis = listaCarros.filter(carro => carro.status === "disponivel");

            const carrosComCategoria = carrosDisponiveis.map(carro => {
                const categoria = categorias.find(
                    categoria => categoria.id_categoria === carro.id_categoria
                );

                return {
                    ...carro,
                    valor_diaria: categoria ? categoria.valor_diaria : "0.00",
                };
            });

            setCarros(carrosComCategoria);

        } catch (error) {
            setErro(error.message);
        } finally {
            setLoading(false);
        }
    }

    carregarCarros();
}, []);

    if (loading) {
        return <p className={styles.loading}>Carregando carros...</p>;
    }

    if (erro) {
        return <p className={styles.error}>{erro}</p>;
    }

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>

                <div className={styles.headerSection}>
                    <h1 className={styles.pageTitle}>Aluguel de Carros</h1>
                    <Link href="/">
                        <button className={styles.backButton}>
                            ⬅️ Voltar à Inicial
                        </button>
                    </Link>
                </div>

                <div className={styles.carListContainer}>
                    <h2 className={styles.categoryHeader}>Carros Disponíveis</h2>

                    <div className={styles.categoryList}>
                        {carros.map((car, i) => (
                            <div key={car.id_carro} className={styles.carCard}>
                                <div className={styles.carImageContainer}>
                                    <Image
                                        src={car.imagem_carro}
                                        alt={car.modelo}
                                        width={180}
                                        height={120}
                                        className={styles.carImage}
                                        priority={i < 5}
                                    />
                                </div>

                                <div className={styles.carDetails}>
                                    <h3 className={styles.carName}>{car.modelo}</h3>
                                    <p className={styles.carPrice}>R$ {car.valor_diaria}/dia</p>

                                    <div className={styles.technicalInline}>
                                        <p><span>KM:</span> {car.quilometragem_atual}</p>
                                    </div>
                                </div>

                                <div className={styles.actionSection}>
                                    <p className={styles.cancellation}>Cancelamento grátis</p>
                                    <button className={styles.rentNowButton}>
                                        Reservar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
}
