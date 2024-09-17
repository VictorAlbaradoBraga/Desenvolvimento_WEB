import React from 'react';
import Button from '../components/Button.Jsx';
import '../css/Home.css';

const Home = () => {
  return (
    <div className="home-content">
      <h1 className="home-title">Empresa</h1>
      <p className="home-subtitle">Subtitle</p>
      <div className="home-buttons">
        {/*<Button text="Login" type="secondary" /> */}
        {/*<Button text="Cadastro" type="primary" /> */}
      </div>
    </div>
  );
};

export default Home;
