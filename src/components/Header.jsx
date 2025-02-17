import React from 'react';
import '../css/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">Logo</a>
      </div>
      <nav className="nav">
        <a href="funcionarios">Funcionários</a>
        <a href="produtos">Produtos</a>
      </nav>
    </header>
  );
};

export default Header;
