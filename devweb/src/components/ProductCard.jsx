import React from 'react';
import '../css/ProductCard.css';
import Button from './Button';

const ProductCard = ({ produto, onEdit, onDelete }) => {
  return (
    <div className="prod-card">
      <div className="prod-image-wrapper">
        <img src={produto.imagem} alt={produto.nome} className="prod-image" />
      </div>
      <h2>{produto.nome}</h2>
      <p className="prod-price">{produto.valor}</p>
      <p className="prod-description">{produto.descricao}</p>
      <div className="prod-actions">
        <Button  text="Excluir" type= "secondary" onClick={() => onDelete(produto)}>Excluir</Button>
        <Button text="Editar" type="primary" onClick={() => onEdit(produto)}>Editar</Button>
      </div>
    </div>
  );
};

export default ProductCard;
