import React, { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Se o usuário estiver logado, redireciona para a página de funcionários ou produtos
      navigate('/funcionarios');
    }
  }, [auth, navigate]);

  return (
    <div className="home-container">
      <div className="overlay"></div>
      <div className="home-content">
        <h1 className="home-title">Bem-vindo à Empresa</h1>
        <p className="home-subtitle">Gerencie seus funcionários e produtos de forma eficiente</p>
        <div className="home-buttons">
          <a href="/login" className="btn primary">Login</a>
          <a href="/cadastro" className="btn secondary">Cadastro</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
