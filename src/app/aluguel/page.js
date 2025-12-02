'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import styles from './page_aluguel.module.css';
const categories = ['Carros', 'Vans', 'Caminhões'];
const vehicleList = Array.from({ length: 50 }, (_, i) => {
    let type = '';
    let name = '';
    let price = '';
    let detalhes = {};

    if (i % 3 === 0) {
        type = 'Carros';
        name = `Hatch Compacto`;
        price = '150';
        detalhes = { marcha: '5 Manual', km: '200 km por locação', seguro: 'Proteção Básica' };
    } else if (i % 3 === 1) {
        type = 'Vans';
        name = `Van Executiva (15 Lugares)`;
        price = '350';
        detalhes = { marcha: 'Automática', km: '150 km por locação', seguro: 'Proteção Completa' };
    } else {
        type = 'Caminhões';
        name = `Caminhão VUC`;
        price = '500';
        detalhes = { marcha: '6 Manual', km: '100 km por locação', seguro: 'Sem Proteção' };
    }

    return {
        id: i + 1,
        type: type,
        name: name,
        price: price,
        detalhes: detalhes,
        imagePath: `/img/vehicles/car_${String(i + 1).padStart(2, '0')}.png`,
    };
});

const groupedList = vehicleList.reduce((acc, item) => {
    if (!acc[item.type]) {
        acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
}, {});

const renderCategoryList = (list) => (
    <div className={styles.categoryList}>
        {list.map((car, i) => (
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
                    <button className={styles.rentNowButton}>Reservar</button>
                </div>
            </div>
        ))}
    </div>
);


export default function Aluguel() {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const currentList = groupedList[activeCategory] || [];

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <div className={styles.headerSection}>
                    <h1 className={styles.pageTitle}>Aluguel de Veículos</h1>
                    <Link href="/">
                        <button className={styles.backButton}>
                            ⬅️ Voltar à Inicial
                        </button>
                    </Link>
                </div>
                <div className={styles.tabMenu}>
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`${styles.tabButton} ${activeCategory === category ? styles.activeTab : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className={styles.carListContainer}>
                    <h2 className={styles.categoryHeader}>{activeCategory}</h2>
                    {currentList.length > 0 ? (
                        renderCategoryList(currentList)
                    ) : (
                        <p>Nenhum veículo disponível nesta categoria no momento.</p>
                    )}
                </div>
            </main>
        </div>
    );
}