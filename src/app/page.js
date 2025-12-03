import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/img/logoSansCar.png" alt="Locadora SansCar" width={75} height={65} />
          <span>Locadora SansCar</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/">Início</Link>
          <Link href="/aluguel">Aluguel</Link>
          <Link href="/venda">Venda</Link>
          <Link href="/contato">Contato</Link>
          <Link href="/login" className={styles.navLinkButton}>Login</Link>
          <Link href="/cadastro" className={styles.navLinkButton}>Cadastro</Link>
        </nav>
      </header>
      <main className={styles.mainContent}>
        <h1>Seu carro ideal está aqui</h1>
        <p>Aluguel e venda de veículos premium.</p>
        <div className={styles.searchSection}>
          <div className={styles.searchBar}>Buscar veículo</div>
          <Link href="/aluguel" className={styles.rentButton}>Alugar agora</Link>
          <Link href="/pesquisa" className={styles.searchButton}>Pesquisar</Link>
        </div>
        <Link href="/cadastroCarros">
          <button className={styles.navLinkButton}>Cadastro de Carros</button>
        </Link>
      </main>
      <footer className={styles.footer}>
        <span>© 2025 SansCar</span>
        <div className={styles.social}>
          <span>
            <i className="fa-brands fa-instagram"></i>
            Instagram
          </span>
          <span>
            <i className="fa-brands fa-whatsapp"></i>
            WhatsApp
          </span>
        </div>
        <span>Endereço</span>
      </footer>
    </div>
  );
}