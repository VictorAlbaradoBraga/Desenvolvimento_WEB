import React from 'react';
import AuthButtons from './AuthButtons.jsx';
import '../css/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Logo</div>
      <nav className="nav">
        <a href="#funcionarios">Funcionários</a>
        <a href="#produtos">Produtos</a>
      </nav>
      <AuthButtons />
    </header>
  );
};

export default Header;
