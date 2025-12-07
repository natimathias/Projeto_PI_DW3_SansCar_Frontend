import Link from 'next/link';
import styles from './page_login.module.css';

export default function Login() {
    return (
        <div className={styles.loginContainer}>
            <Link href="/">
                <button className={styles.backButton}>⬅️ Voltar à Inicial</button>
            </Link>
            <div className={styles.loginBox}>
                <div className={styles.logoHeader}>
                    <span>✉️</span>
                    <span>Locadora SansCar</span>
                </div>

                <form className={styles.loginForm}>
                    <div className={styles.inputGroup}>
                        <input type="text" placeholder="E-mail ou CPF" className={styles.inputField} />
                    </div>

                    <div className={styles.inputGroup}>
                        <input type="password" placeholder="Senha" className={styles.inputField} />
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        Entrar
                    </button>
                </form>

                <div className={styles.footerLink}>
                    <p>Não tem um cadastro?</p>
                    <Link href="/cadastro" className={styles.createAccountLink}>
                        Criar uma conta
                    </Link>
                </div>
            </div>
        </div>
    );
}