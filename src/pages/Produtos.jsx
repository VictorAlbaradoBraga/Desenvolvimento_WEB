import React, { useState } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import ProductCard from '../components/ProductCard';
import '../css/Produtos.css';

const Produtos = () => {
    const [produtos, setProdutos] = useState([
        {
            id: 1,
            nome: 'Produto 1',
            valor: 'R$ 100',
            descricao: 'Descrição do produto 1',
            imagem: 'https://img.freepik.com/psd-gratuitas/modelo-de-banner-de-midia-social-de-super-venda-na-sexta-feira-negra_106176-1482.jpg?size=626&ext=jpg&ga=GA1.1.1316878364.1712631078&semt=ais_hybrid',
        },
        {
            id: 2,
            nome: 'Produto 2',
            valor: 'R$ 200',
            descricao: 'Descrição do produto 2',
            imagem: 'https://img.freepik.com/psd-gratuitas/modelo-de-banner-de-super-venda-de-midia-social-da-black-friday_120329-2133.jpg?w=740&t=st=1726600243~exp=1726600843~hmac=d56338e01b52c915d7c46428770dd378d869b035b87d2a48a341ee40223d3f0e',
        },
    ]);

    const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa
    const [showModal, setShowModal] = useState(false);
    const [currentProduto, setCurrentProduto] = useState({
        id: null,
        nome: '',
        valor: '',
        descricao: '',
        imagem: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [prodToDelete, setProdToDelete] = useState(null);

    // Abre o modal para adicionar/editar produto
    const openModal = (produto = { id: null, nome: '', valor: '', descricao: '', imagem: '' }) => {
        setCurrentProduto(produto);
        setIsEditing(!!produto.id);
        setShowModal(true);
    };

    // Fecha o modal
    const closeModal = () => {
        setShowModal(false);
        setCurrentProduto({ id: null, nome: '', valor: '', descricao: '', imagem: '' });
    };

    // Salva ou edita produto
    const handleSave = () => {
        if (isEditing) {
            setProdutos(produtos.map((prod) => (prod.id === currentProduto.id ? currentProduto : prod)));
        } else {
            setProdutos([...produtos, { ...currentProduto, id: Date.now() }]);
        }
        closeModal();
    };

    // Confirmação para deletar produto
    const handleDelete = (produto) => {
        setConfirmDelete(true);
        setProdToDelete(produto);
    };

    // Exclui produto
    const confirmDeleteProduto = () => {
        setProdutos(produtos.filter((prod) => prod.id !== prodToDelete.id));
        setConfirmDelete(false);
        setProdToDelete(null);
    };

    // Filtrar produtos com base no termo de pesquisa
    const filteredProdutos = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="prod-content">
            <div className="prod-top">
                <div className="prod-title">
                    <h1>Produtos</h1>
                </div>
                <div className="search-box">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="search-input-container">
                            <input
                                type="text"
                                className="search-box-input"
                                name="busca"
                                placeholder="Search"
                                value={searchTerm} // Valor vinculado ao estado de pesquisa
                                onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de pesquisa
                            />
                            <button className="search-box-button">
                                <i className="search-icon">🔍</i>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="adc-prod">
                    <Button text="Adicionar Produto" onClick={() => openModal()} />
                </div>
            </div>

            <div className="list-prod">
                <div className="prod-grid">
                    {filteredProdutos.map((produto, index) => (
                        <ProductCard
                            key={index}
                            produto={produto}
                            onEdit={openModal}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>

            {/* Modal para Adicionar/Editar Produto */}
            {showModal && (
                <Modal onClose={closeModal}>
                    <h2>{isEditing ? 'Editar Produto' : 'Adicionar Produto'}</h2>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={currentProduto.nome}
                        onChange={(e) => setCurrentProduto({ ...currentProduto, nome: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Valor"
                        value={currentProduto.valor}
                        onChange={(e) => setCurrentProduto({ ...currentProduto, valor: e.target.value })}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={currentProduto.descricao}
                        onChange={(e) => setCurrentProduto({ ...currentProduto, descricao: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="URL da Imagem"
                        value={currentProduto.imagem}
                        onChange={(e) => setCurrentProduto({ ...currentProduto, imagem: e.target.value })}
                    />
                    <button onClick={handleSave}>{isEditing ? 'Atualizar' : 'Salvar'}</button>
                </Modal>
            )}

            {/* Popup de Confirmação para Deletar */}
            {confirmDelete && (
                <Modal onClose={() => setConfirmDelete(false)}>
                    <h2>Tem certeza que deseja excluir?</h2>
                    <p>{prodToDelete?.nome}</p>
                    <button onClick={confirmDeleteProduto}>Confirmar</button>
                </Modal>
            )}
        </div>
    );
};

export default Produtos;
