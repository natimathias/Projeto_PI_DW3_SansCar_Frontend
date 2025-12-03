'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import styles from './page_venda.module.css';


const categories = ['Carros', 'Vans', 'Caminhões'];

const imagens = {
    Carros: [
        "https://i.imgur.com/8Xo4jXN.jpeg",
        "https://i.imgur.com/v9M7g5W.jpeg",
        "https://i.imgur.com/Yw2SGST.jpeg",
        "https://i.imgur.com/NEX1R8w.jpeg",
        "https://i.imgur.com/lsDqUty.jpeg",
    ],
    Vans: [
        "https://i.imgur.com/P2UuPcl.jpeg",
        "https://i.imgur.com/Z1tgMJL.jpeg",
        "https://i.imgur.com/9LOgF5q.jpeg",
    ],
    Caminhões: [
        "https://i.imgur.com/TmXtzYi.jpeg",
        "https://i.imgur.com/wEu6pX8.jpeg",
        "https://i.imgur.com/oBQXb8I.jpeg",
    ]
};

const vehicleList = Array.from({ length: 50 }, (_, i) => {
    let type = '';
    let name = '';
    let price = 0;
    let km = 0;
    let detalhes = {};

    if (i % 3 === 0) {
        type = 'Carros';
        name = `Hatch Compacto ${i < 25 ? 'Premium' : 'Básico'}`;
        km = i % 2 === 0 ? 155000 + (i * 1000) : 50000 + (i * 1000);
        price = km >= 130000 ? 32000 : 150;
        detalhes = { marcha: '5 Manual', combustivel: 'Gasolina', ano: '2019' };

    } else if (i % 3 === 1) {
        type = 'Vans';
        name = `Van Executiva (15 Lugares) Carga ${i}`;
        km = 180000 + (i * 500);
        price = 85000;
        detalhes = { marcha: 'Automática', combustivel: 'Diesel', ano: '2018' };

    } else {
        type = 'Caminhões';
        name = `Caminhão VUC Baú ${i}`;
        km = 110000 + (i * 2000);
        price = km >= 130000 ? 120000 : 500;
        detalhes = { marcha: '6 Manual', combustivel: 'Diesel', ano: '2017' };
    }

    const imagensCategoria = imagens[type];
    const imagePath = imagensCategoria[i % imagensCategoria.length];

    return { id: i + 1, type, name, price, km, detalhes, imagePath };
});


const sellingVehicles = vehicleList.filter(car => car.km >= 130000);
const groupedList = sellingVehicles.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
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
                        width={260}
                        height={160}
                        className={styles.carImage}
                        priority={i < 6}
                    />
                </div>

                <div className={styles.carDetails}>
                    <h3 className={styles.carName}>{car.name}</h3>
                    <p className={styles.carPrice}>R$ {car.price.toLocaleString('pt-BR')}</p>

                    <div className={styles.technicalInline}>
                        <p><span>M:</span> {car.detalhes.marcha}</p>
                        <p><span>Comb:</span> {car.detalhes.combustivel}</p>
                        <p><span>Ano:</span> {car.detalhes.ano}</p>
                        <p><span>KM:</span> {car.km.toLocaleString('pt-BR')} km</p>
                    </div>
                </div>

                <div className={styles.actionSection}>
                    <p className={styles.warranty}>1 Ano de Garantia</p>
                </div>
            </div>
        ))}
    </div>
);

export default function Venda() {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const currentList = groupedList[activeCategory] || [];

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                
                <div className={styles.headerSection}>
                    <h1 className={styles.pageTitle}>Venda de Seminovos</h1>
                    <Link href="/">
                        <button className={styles.backButton}>⬅️ Voltar à Inicial</button>
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

                    {currentList.length > 0
                        ? renderCategoryList(currentList)
                        : <p>Nenhum veículo disponível.</p>}
                </div>

            </main>
        </div>
    );
}
