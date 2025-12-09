import Link from 'next/link';
import styles from './page_loginFuncionario.module.css';

export default function LoginFuncionario() {
    return (
        <div className={styles.loginContainer}>

            <Link href="/">
                <button className={styles.backButton}>⬅️ Voltar à Inicial</button>
            </Link>

            <div className={styles.loginBox}>

                <div className={styles.logoHeader}>
                    <span className={styles.logoIcon}>✉️</span>
                    <span className={styles.logoText}>Locadora SansCar</span>
                </div>
                <p className={styles.subTitle}>Login de funcionário</p>

                <form className={styles.loginForm}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="E-mail ou CPF"
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Senha"
                            className={styles.inputField}
                        />
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}