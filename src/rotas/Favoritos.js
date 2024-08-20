import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getFavoritos } from '../servicos/favoritos';
import livroImg from '../imagens/livro.png';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg, #002f52 35%, #326589 165%);
`;

const ResultadoContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    cursor: pointer;
    text-align: center;
    padding: 0 100px;
    position: relative;
    
    p {
        width: 200px;
        color: #FFF;
    }
    
    img {
        width: 100px;
    }
    
    &:hover {
        border: 1px solid white;
    }
`;

const Titulo = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
    padding-top: 35px;
`;

const ExcluirButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    
    &:hover {
        background-color: darkred;
    }
`;

function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);

    async function fetchFavoritos() {
        const favoritosDaAPI = await getFavoritos();
        setFavoritos(favoritosDaAPI);
    }

    useEffect(() => {
        fetchFavoritos();
    }, []);

    function removeFavorito(nomeDoFavorito) {
        setFavoritos(prevFavoritos => prevFavoritos.filter(favorito => favorito.nome !== nomeDoFavorito));
    }

    return (
        <AppContainer>
            <Titulo>Aqui estão seus livros favoritos:</Titulo>
            <ResultadoContainer>
                {favoritos.map(favorito => (
                    <Resultado key={favorito.nome}>
                        <img src={livroImg} alt={favorito.nome}/>
                        <p>{favorito.nome}</p>
                        <ExcluirButton onClick={() => removeFavorito(favorito.nome)}>Excluir</ExcluirButton>
                    </Resultado>
                ))}
            </ResultadoContainer>
        </AppContainer>
    );
}

export default Favoritos;
