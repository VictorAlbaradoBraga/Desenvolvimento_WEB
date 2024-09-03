import React from 'react';
import Button from '../components/Button.Jsx';
import '../css/Home.css';

const Home = () => {
  return (
    <div className="home-content">
      <h1 className="home-title">Title</h1>
      <p className="home-subtitle">Subtitle</p>
      <div className="home-buttons">
        <Button text="Button" type="secondary" />
        <Button text="Button" type="primary" />
      </div>
    </div>
  );
};

export default Home;
