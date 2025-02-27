import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token'); // Pegue o token armazenado

      if (token) {
        try {
          const response = await fetch('/api/auth/validate', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
            },
          });

          if (response.ok) {
            // Se o token for válido, redireciona para a página de funcionários
            setIsLoggedIn(true);
          } else {
            console.log('Token inválido ou expirado');
          }
        } catch (error) {
          console.error('Erro ao verificar autenticação:', error);
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="home-container">
      <div className="overlay"></div>
      <div className="home-content">
        <h1 className="home-title">Bem-vindo à Empresa</h1>
        <p className="home-subtitle">Gerencie seus funcionários e produtos de forma eficiente</p>
        
        {/* Exibe os botões de Login e Cadastro apenas se não estiver logado */}
        {!isLoggedIn && (
          <div className="home-buttons">
            <a href="/login" className="btn primary">Login</a>
            <a href="/cadastro" className="btn secondary">Cadastro</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
