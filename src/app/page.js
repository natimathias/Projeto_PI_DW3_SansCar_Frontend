// /app/page.js
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          {/* O logoSansCar.png está em /public/img/ */}
          <Image src="/img/logoSansCar.png" alt="Locadora SansCar" width={40} height={40} />
          <span>Locadora SansCar</span>
        </div>
        
        {/* === NAVEGAÇÃO ATUALIZADA AQUI === */}
        <nav className={styles.nav}>
          <Link href="/">Início</Link>
          <Link href="/aluguel">Aluguel</Link>
          <Link href="/venda">Venda</Link>
          <Link href="/contato">Contato</Link>
          <Link href="/login" className={styles.navLinkButton}>Login</Link>
          <Link href="/cadastro" className={styles.navLinkButton}>Cadastro</Link>
        </nav>
        {/* ================================== */}
        
      </header>

      <main className={styles.mainContent}>
        <h1>Seu carro ideal está aqui</h1>
        <p>Aluguel e venda de veículos premium.</p>
        
        <div className={styles.searchSection}>
          <div className={styles.searchBar}>Buscar veículo</div>
          <Link href="/aluguel" className={styles.rentButton}>Alugar agora</Link>
        </div>
        
        <div className={styles.categoryGrid}>
          {/* ... (Restante do Category Grid permanece o mesmo) ... */}
           <div className={styles.categoryBox}>
            <Image src="/img/economico.jpg" alt="Carros Econômicos" fill style={{ objectFit: 'cover' }} />
            <div className={styles.overlay}>
              <h2>Carros Econômicos</h2>
              <button>Ver mais</button>
            </div>
          </div>
          
          <div className={styles.categoryBox}>
            <Image src="/img/luxo.jpg" alt="Carros de Luxo" fill style={{ objectFit: 'cover' }} />
            <div className={styles.overlay}>
              <h2>Carros de Luxo</h2>
              <button>Ver mais</button>
            </div>
          </div>
          
          <div className={styles.categoryBox}>
            <Image src="/img/utilitario.jpg" alt="SUVs e Utilitários" fill style={{ objectFit: 'cover' }} />
            <div className={styles.overlay}>
              <h2>SUVs e Utilitários</h2>
              <button>Ver mais</button>
            </div>
          </div>
        </div>

      </main>

      <footer className={styles.footer}>
        <span>© 2025 SansCar</span>
        <div className={styles.social}>
          <span>Instagram</span>
          <span>WhatsApp</span>
        </div>
        <span>Endereço</span>
      </footer>
    </div>
  );
}