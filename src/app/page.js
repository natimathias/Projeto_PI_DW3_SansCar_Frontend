export default function Home() {
  return (
    <main className="home">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-left">
          <img src="./img/logoSansCar.png" alt="Logo" className="logo" />
          <div className="brand">
            <h2>Locadora</h2>
            <span>SansCar</span>
          </div>
        </div>

        <nav className="nav-menu">
          <a href="#">Início</a>
          <a href="#">Aluguel</a>
          <a href="#">Venda</a>
          <a href="#">Contato</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <img src="./img/carro_bg.jpg" alt="Carro fundo" className="hero-bg" />

        <div className="hero-content">
          <h1>Seu carro ideal está aqui</h1>
          <p>Aluguel e venda de veículos premium.</p>

          <div className="search-area">
            <input type="text" placeholder="Buscar veículo" />
            <button>Alugar agora</button>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="cards">
        <div className="card">
          <img src="./img/economico.jpg" alt="Carro Econômico" />
          <h3>Carros Econômicos</h3>
          <button>Ver mais</button>
        </div>

        <div className="card">
          <img src="./img/luxo.jpg" alt="Carro de Luxo" />
          <h3>Carros de Luxo</h3>
          <button>Ver mais</button>
        </div>

        <div className="card">
          <img src="./img/utilitario.jpg" alt="SUV" />
          <h3>SUVs e Utilitários</h3>
          <button>Ver mais</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span>© 2025 SansCar</span>

        <div className="icons">
          <i className="fa-brands fa-whatsapp"></i>
          <i className="fa-brands fa-instagram"></i>
        </div>

        <span>Endereço</span>
      </footer>
    </main>
  );
}