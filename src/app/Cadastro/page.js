"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './page_cadastro.module.css';
import { useRouter } from 'next/navigation';

export default function Cadastro() {

  const router = useRouter();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  async function buscarCep() {
    if (!cep) {
      alert("Digite um CEP!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8086/api-externa/cep/${cep}`);
      const dados = await response.json();

      if (dados.erro) {
        alert("CEP não encontrado!");
        return;
      }

      setRua(dados.logradouro || "");
      setCidade(dados.localidade || "");
      setEstado(dados.uf || "");

    } catch (error) {
      alert("Erro ao buscar CEP");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nome || !cpf || !telefone || !email || !senha || !confirmarSenha || !cep) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não conferem!");
      return;
    }

    const enderecoCompleto = `${rua}, ${cidade}, ${estado}, ${cep}`;

    const novoCliente = {
      nome,
      cpf,
      telefone,
      endereco: enderecoCompleto,
      email,
      senha
    };

    try {
      const resposta = await fetch("http://localhost:8086/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoCliente)
      });

      const resultado = await resposta.json();

      if (!resposta.ok) {
        alert(`Erro ao cadastrar: ${resultado.error}`);
        return;
      }

      alert("Cadastro realizado com sucesso!");
      router.push('/login');
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div className={styles.cadastroContainer}>

      <Link href="/">
        <button className={styles.backButton}>⬅️ Voltar à Inicial</button>
      </Link>

      <div className={styles.cadastroBox}>

        <div className={styles.logoHeader}>
          <span>🚗</span>
          <span>Locadora SansCar</span>
        </div>

        <form className={styles.cadastroForm} onSubmit={handleSubmit}>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>👤</span>
              <input type="text" placeholder="Nome completo*" className={styles.inputField} value={nome} onChange={(e) => setNome(e.target.value)}/>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>🪪</span>
              <input type="text" placeholder="CPF*" className={styles.inputField} value={cpf} onChange={(e) => setCpf(e.target.value)}/>
            </div>

            <div className={styles.inputGroup}>
              <span>📞</span>
              <input type="text" placeholder="Telefone*" className={styles.inputField} value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>📧</span>
              <input type="email" placeholder="E-mail*" className={styles.inputField} value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>🔒</span>
              <input type="password" placeholder="Senha*" className={styles.inputField} value={senha} onChange={(e) => setSenha(e.target.value)}/>
            </div>

            <div className={styles.inputGroup}>
              <span>🔒</span>
              <input type="password" placeholder="Confirmar senha*" className={styles.inputField} value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)}/>
            </div>
          </div>

          <div className={`${styles.formRow} ${styles.cepRow}`}>

            <div className={`${styles.inputGroup} ${styles.cepInput}`}>
              <span>📮</span>
              <input
                type="text"
                placeholder="CEP*"
                className={styles.inputField}
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </div>

            <button
              type="button"
              className={styles.cepButton}
              onClick={buscarCep}
            >
              Buscar CEP
            </button>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>🏠</span>
              <input type="text" placeholder="Rua" className={styles.inputField} value={rua} readOnly />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <span>🏙️</span>
              <input type="text" placeholder="Cidade" className={styles.inputField} value={cidade} readOnly />
            </div>

            <div className={styles.inputGroup}>
              <span>🗺️</span>
              <input type="text" placeholder="Estado" className={styles.inputField} value={estado} readOnly />
            </div>
          </div>

          <button type="submit" className={styles.registerButton}>
            Realizar cadastro
          </button>

        </form>

      </div>
    </div>
  );
}