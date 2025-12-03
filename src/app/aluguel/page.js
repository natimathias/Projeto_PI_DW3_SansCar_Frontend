'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page_aluguel.module.css';

const vehicleList = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    type: 'Carros',
    name: `Hatch Compacto`,
    price: '150',
    detalhes: {
        marcha: '5 Manual',
        km: '200 km por locação',
        seguro: 'Proteção Básica'
    },
    imagePath: `/img/vehicles/car_${String(i + 1).padStart(2, '0')}.png`
}));

export default function Aluguel() {
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
                        {vehicleList.map((car, i) => (
                            <div key={car.id} className={styles.carCard}>
                                <div className={styles.carImageContainer}>
                                    <Image
                                        src={car.imagePath}
                                        alt={car.name}
                                        width={180}
                                        height={120}
                                        className={styles.carImage}
                                        priority={i < 5}
                                    />
                                </div>

                                <div className={styles.carDetails}>
                                    <h3 className={styles.carName}>{car.name}</h3>
                                    <p className={styles.carPrice}>R$ {car.price}/dia</p>

                                    <div className={styles.technicalInline}>
                                        <p><span>M:</span> {car.detalhes.marcha}</p>
                                        <p><span>KM:</span> {car.detalhes.km}</p>
                                        <p><span>Seg:</span> {car.detalhes.seguro}</p>
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