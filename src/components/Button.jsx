import React from 'react';
import '../css/Button.css';

const Button = ({ text, onClick, type }) => {
  return (
    <button className={type === 'primary' ? 'button-primary' : 'button-secondary'} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
