'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page_venda.module.css';

const categories = ['Carros'];

const imagens = {
    Carros: [
        "https://i.imgur.com/8Xo4jXN.jpeg",
        "https://i.imgur.com/v9M7g5W.jpeg",
        "https://i.imgur.com/Yw2SGST.jpeg",
        "https://i.imgur.com/NEX1R8w.jpeg",
        "https://i.imgur.com/lsDqUty.jpeg",
    ]
};

// Gera 50 carros
const vehicleList = Array.from({ length: 50 }, (_, i) => {
    let name = `Hatch Compacto ${i < 25 ? 'Premium' : 'Básico'}`;
    let km = i % 2 === 0 ? 155000 + (i * 1000) : 50000 + (i * 1000);
    let price = km >= 130000 ? 32000 : 150;
    let detalhes = { marcha: '5 Manual', combustivel: 'Gasolina', ano: '2019' };

    const imagePath = imagens.Carros[i % imagens.Carros.length];

    return {
        id: i + 1,
        name,
        km,
        price,
        detalhes,
        type: 'Carros',
        imagePath
    };
});

const sellingCars = vehicleList.filter(car => car.km >= 130000);

export default function Venda() {
    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>

                <div className={styles.headerSection}>
                    <h1 className={styles.pageTitle}>Venda de Seminovos</h1>
                    <Link href="/">
                        <button className={styles.backButton}>⬅️ Voltar à Inicial</button>
                    </Link>
                </div>

                <div className={styles.carListContainer}>
                    <h2 className={styles.categoryHeader}>Carros Disponíveis</h2>

                    <div className={styles.categoryList}>
                        {sellingCars.map((car, i) => (
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

                </div>

            </main>
        </div>
    );
}