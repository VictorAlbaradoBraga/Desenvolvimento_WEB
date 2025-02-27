import React, { useState, useEffect } from 'react';
import '../css/Header.css';
import img from '../assets/icons8-male-user-48.png';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar se há um token de autenticação no localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true); // Usuário está logado
    } else {
      setIsLoggedIn(false); // Usuário não está logado
    }
  }, []);

  const handleLogout = () => {
    // Remover o token do localStorage e atualizar o estado
    localStorage.removeItem('authToken');
    setIsLoggedIn(false); // Atualizar o estado de login
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/">Logo</a>
      </div>
      <nav className="nav">
        <a href="funcionarios">Funcionários</a>
        <a href="produtos">Produtos</a>

        {/* Exibir ícone de perfil se o usuário estiver logado */}
        {isLoggedIn ? (
          <div className="profile">
            <img
              src={img} // Coloque a URL do seu ícone de perfil
              alt="Perfil"
              className="profile-icon"
            />
            <button onClick={handleLogout}>Sair</button>
          </div>
        ) : (
          <a href="login">Login</a> // Link de login se não estiver logado
        )}
      </nav>
    </header>
  );
};

export default Header;
