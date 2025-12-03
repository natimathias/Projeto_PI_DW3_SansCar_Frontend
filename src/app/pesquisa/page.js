import Link from 'next/link';
import Image from 'next/image';
import styles from './page_pesquisa.module.css';
export default function Pesquisa() {
    return (
        <div className={styles.searchPageContainer}>
            <Link href="/">
                <button className={styles.backButton}>⬅️ Voltar à Inicial</button>
            </Link>
            <div className={styles.searchBox}>
                <div className={styles.logoHeader}>
                    <Image src="/img/logoSansCar.png" alt="Locadora SansCar" width={30} height={30} />
                    <span>Locadora SansCar</span>
                </div>

                <h1 className={styles.mainTitle}>Seu carro ideal está aqui</h1>
                <p className={styles.subtitle}>Aluguel e venda de veículos premium</p>

                <form className={styles.searchForm}>
                    <div className={styles.formRow}>
                        <div className={styles.inputGroup}>
                            <label>Local de coleta e retirada</label>
                            <div className={styles.inputFieldBox}>
                                <span>📍</span>
                                <input type="text" placeholder="Cidade, Endereço, ponto de" className={styles.inputField} />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Data e hora de retorno</label>
                            <div className={styles.inputFieldBox}>
                                <span>📅</span>
                                <input type="text" placeholder="Data de retorno" className={styles.inputField} />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className={styles.searchButton}>
                        Pesquisar
                    </button>
                </form>
            </div>
        </div>
    );
}