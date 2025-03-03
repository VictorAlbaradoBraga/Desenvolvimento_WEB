import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Teste = () => {
    const navigate = useNavigate();
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await fetch("https://back-prodfunc-omega.vercel.app/api/index", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setResultado(data.message); // Define a resposta da API
            } else {
                setError("Erro ao buscar dados.");
            }
        } catch (err) {
            setError("Erro de conexão com o servidor");
        }
    };

    return (
        <div>
            <h2>Teste API</h2>
            <button onClick={handleSubmit}>Fazer Requisição</button>
            {resultado && <p>Resposta: {resultado}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Teste;
