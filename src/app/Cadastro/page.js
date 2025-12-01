
import Link from 'next/link';
import styles from './page_cadastro.module.css';

export default function Cadastro() {
  return (
    <div className={styles.cadastroContainer}>
        <div className={styles.cadastroBox}>
            <div className={styles.logoHeader}>
                <span>🚗</span> 
                <span>Locadora SansCar</span>
            </div>

            <form className={styles.cadastroForm}>
                <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                        <span>👤</span> 
                        <input type="text" placeholder="CPF*" className={styles.inputField} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span>📞</span> 
                        <input type="text" placeholder="Contato*" className={styles.inputField} />
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                        <span>👤</span> 
                        <input type="text" placeholder="Nome*" className={styles.inputField} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span>🔒</span> 
                        <input type="password" placeholder="Senha*" className={styles.inputField} />
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                        <span>📧</span> 
                        <input type="email" placeholder="E-mail*" className={styles.inputField} />
                    </div>
                    <div className={styles.inputGroup}>
                        <span>🔒</span> 
                        <input type="password" placeholder="Confirmar senha*" className={styles.inputField} />
                    </div>
                </div>

                <button type="submit" className={styles.registerButton}>
                    Realizar cadastro
                </button>
            </form>

            <Link href="/login" className={styles.backToLogin}>
                Voltar ao login
            </Link>
        </div>
    </div>
  );
}