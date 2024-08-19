import Input from '../input'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { getLivros } from '../../servicos/livros'
import { postFavorito } from '../../servicos/favoritos'


const PesquisaContainer = styled.section`
        background-image: linear-gradient(90deg, #002F52 35%, #326589 165%);
        color: #FFF;
        text-align: center;
        padding: 85px 0;
        height: 270px;
        width: 100%;
`

const Titulo = styled.h2`
        color: #FFF;
        font-size: 36px;
        text-align: center;
        width: 100%;
`

const Subtitulo = styled.h3`
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 40px;
`

const Resultado = styled.div`
    position: relative; 
    z-index: 10; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;
    background-color: #FFF; 
    padding: 15px; 
    border-radius: 10px; 
    width: 100%; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out; 

    p {
        flex: 1; 
        background-color: transparent; 
        color: #000; 
        padding: 10px;
        border-radius: 5px; 
        text-align: left; 
        margin: 0;
    }

    img {
        width: 100px;
        border-radius: 5px;
        margin-left: 20px; 
    }

    &:hover {
        transform: scale(1.02);
        border: 1px solid white;
    }
`;



const Pesquisa = () => {
    const [ livrosPesquisados, setLivrosPesquisados ] = useState([])
    const [ livros, setLivros ] = useState ([])

    async function fetchLivros(){
        const livrosAPI = await getLivros()
        setLivros(livrosAPI)
    }

    useEffect(() => {
        fetchLivros()
    }, []) 

    async function insertFavorito(id, nome) {
        await postFavorito(id, nome)
        alert(`Livro de id:${id} inserido!`)
}

    console.log(livrosPesquisados)

    return (
        <PesquisaContainer>
            <Titulo>Já sabe por onde começar?</Titulo>
            <Subtitulo>Encontre seu livro em nossa estante.</Subtitulo>
            <Input
                placeholder="Escreva sua próxima leitura"
                onBlur={evento => {
                    const textoDigitado = evento.target.value
                    const resultadoPesquisa = livros.filter( livro => livro.nome.includes(textoDigitado) )
                    setLivrosPesquisados(resultadoPesquisa)
                }}
            />
            { livrosPesquisados.map( livro => (
                <Resultado onClick={() => insertFavorito(livro.id, livro.nome)}>
                    <p>{livro.nome}</p>
                    <img src={livro.src}/>
                </Resultado>
            )) }
        </PesquisaContainer>
    )
}

export default Pesquisa