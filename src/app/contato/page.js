'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './page_contato.module.css';
export default function Contato() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulário enviado:", formData);
        alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <div className={styles.headerSection}>
                    <h1 className={styles.pageTitle}>Fale Conosco</h1>
                    <Link href="/">
                        <button className={styles.backButton}>
                            ⬅️ Voltar à Inicial
                        </button>
                    </Link>
                </div>
                <div className={styles.contactLayout}>
                    <div className={styles.formContainer}>
                        <h2 className={styles.formTitle}>Envie sua Mensagem</h2>
                        <form onSubmit={handleSubmit} className={styles.contactForm}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="name">Nome Completo</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="subject">Assunto</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="message">Mensagem</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className={styles.submitButton}>
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                    <div className={styles.infoContainer}>
                        <h2 className={styles.infoTitle}>Informações de Contato</h2>

                        <div className={styles.infoBlock}>
                            <h3>📍 Endereço Principal</h3>
                            <p>Av. das Américas, 700 - Campo Mourão, PR</p>
                            <p>Horário: Seg a Sex, 8h às 18h</p>
                        </div>

                        <div className={styles.infoBlock}>
                            <h3>📞 Telefones</h3>
                            <p>Vendas: (44) 98765-4321</p>
                            <p>Aluguel: (44) 91234-5678</p>
                        </div>

                        <div className={styles.infoBlock}>
                            <h3>📧 Email</h3>
                            <p>contato@anhlocacoes.com</p>
                            <p>suporte@anhlocacoes.com</p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}