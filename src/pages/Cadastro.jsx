import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Auth.css';

const Cadastro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('As senhas não coincidem!');
            return;
        }

        try {
            // Enviando dados para o backend (requisição POST para cadastro)
            const response = await fetch('https://back-prodfunc-omega.vercel.app/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Se o cadastro for bem-sucedido, redirecionar para /produtos
                const data = await response.json();
                const token = data.token; // O token recebido do backend
                localStorage.setItem('authToken', token);
                navigate('/produtos');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Erro ao fazer cadastro');
            }
        } catch (err) {
            setError('Erro de conexão com o servidor');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-content">
                <h2>Cadastro</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="password-container">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span 
                            className="visibility-icon" 
                            onClick={() => setPasswordVisible(!passwordVisible)} >
                            👁️
                        </span>
                    </div>
                    <div className="password-container">
                        <input
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            placeholder="Confirmar Senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span 
                            className="visibility-icon" 
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} >
                            👁️
                        </span>
                    </div>
                    <button type="submit">Cadastrar</button>
                </form>
                <p className="auth-links">
                    Já tem uma conta? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Cadastro;
