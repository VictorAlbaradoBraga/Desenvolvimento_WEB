import React, { useState } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import '../css/Funcionarios.css';

const Funcionarios = () => {
    const [funcionarios, setFuncionarios] = useState([
        { id: 1, nome: 'João Silva', funcao: 'Desenvolvedor', setor: 'TI', salario: 'R$ 5000' },
        { id: 2, nome: 'Maria Souza', funcao: 'Designer', setor: 'Marketing', salario: 'R$ 4000' },
        { id: 3, nome: 'Carlos Pereira', funcao: 'Gerente', setor: 'Administração', salario: 'R$ 6000' },
        { id: 4, nome: 'Ana Oliveira', funcao: 'Analista', setor: 'TI', salario: 'R$ 4500' },
    ]);

    const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa
    const [showModal, setShowModal] = useState(false);
    const [currentFuncionario, setCurrentFuncionario] = useState({ id: null, nome: '', funcao: '', setor: '', salario: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [funcToDelete, setFuncToDelete] = useState(null);

    // Filtrar funcionários com base no termo de pesquisa
    const filteredFuncionarios = funcionarios.filter((funcionario) =>
        funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Abre o modal para adicionar/editar funcionário
    const openModal = (funcionario = { id: null, nome: '', funcao: '', setor: '', salario: '' }) => {
        setCurrentFuncionario(funcionario);
        setIsEditing(!!funcionario.id);
        setShowModal(true);
    };

    // Fecha o modal
    const closeModal = () => {
        setShowModal(false);
        setCurrentFuncionario({ id: null, nome: '', funcao: '', setor: '', salario: '' });
    };

    // Salva ou edita funcionário
    const handleSave = () => {
        if (isEditing) {
            setFuncionarios(funcionarios.map((func) =>
                func.id === currentFuncionario.id ? currentFuncionario : func
            ));
        } else {
            setFuncionarios([...funcionarios, { ...currentFuncionario, id: Date.now() }]);
        }
        closeModal();
    };

    // Confirmação para deletar funcionário
    const handleDelete = (funcionario) => {
        setConfirmDelete(true);
        setFuncToDelete(funcionario);
    };

    // Exclui funcionário
    const confirmDeleteFuncionario = () => {
        setFuncionarios(funcionarios.filter((func) => func.id !== funcToDelete.id));
        setConfirmDelete(false);
        setFuncToDelete(null);
    };

    return (
        <div className="func-content">
            <div className="func-top">
                <div className="func-title">
                    <h1>Funcionários</h1>
                </div>
                <div className="search-box">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="search-input-container">
                            <input
                                type="text"
                                className="search-box-input"
                                name="busca"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca
                            />
                            <button className="search-box-button">
                                <i className="search-icon">🔍</i>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="adc-func">
                    <Button text="Adicionar Funcionário" onClick={() => openModal()} />
                </div>
            </div>

            <div className="list-func">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Função</th>
                            <th>Setor</th>
                            <th>Salário</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFuncionarios.map((funcionario, index) => (
                            <tr key={index}>
                                <td>{funcionario.nome}</td>
                                <td>{funcionario.funcao}</td>
                                <td>{funcionario.setor}</td>
                                <td>{funcionario.salario}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => openModal(funcionario)}>✏️</button>
                                    <button className="delete-btn" onClick={() => handleDelete(funcionario)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para Adicionar/Editar Funcionário */}
            {showModal && (
                <Modal onClose={closeModal}>
                    <h2>{isEditing ? 'Editar Funcionário' : 'Adicionar Funcionário'}</h2>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={currentFuncionario.nome}
                        onChange={(e) => setCurrentFuncionario({ ...currentFuncionario, nome: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Função"
                        value={currentFuncionario.funcao}
                        onChange={(e) => setCurrentFuncionario({ ...currentFuncionario, funcao: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Setor"
                        value={currentFuncionario.setor}
                        onChange={(e) => setCurrentFuncionario({ ...currentFuncionario, setor: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Salário"
                        value={currentFuncionario.salario}
                        onChange={(e) => setCurrentFuncionario({ ...currentFuncionario, salario: e.target.value })}
                    />
                    <button onClick={handleSave}>{isEditing ? 'Atualizar' : 'Salvar'}</button>
                </Modal>
            )}

            {/* Popup de Confirmação para Deletar */}
            {confirmDelete && (
                <Modal onClose={() => setConfirmDelete(false)}>
                    <h2>Tem certeza que deseja excluir?</h2>
                    <p>{funcToDelete?.nome}</p>
                    <button onClick={confirmDeleteFuncionario}>Confirmar</button>
                </Modal>
            )}
        </div>
    );
};

export default Funcionarios;
