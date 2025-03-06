import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Enviando dados para o backend (requisição POST para login)
            const response = await fetch('https://back-prodfunc-omega.vercel.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Se o login for bem-sucedido, redirecionar para /produtos
                const data = await response.json();
                const token = data.token; // O token recebido do backend
                // Aqui você pode armazenar o token no localStorage ou contexto para manter o usuário logado
                localStorage.setItem('authToken', token);
                navigate('/produtos');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Erro ao fazer login');
            }
        } catch (err) {
            setError('Erro de conexão com o servidor');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-content">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Entrar</button>
                </form>
                <p className="auth-links">
                    Não tem uma conta? <a href="/cadastro">Cadastro</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
