//import './logos.css'
import logo from '../../imagens/logo.svg'
import styled from 'styled-components'

const LogoContainer = styled.div`
    display: flex;
    font-size: 30px;
    gap: 0px 10px;
    texte-decoration: none;
`


const Logos = () => {
    return(
        <LogoContainer>
            <img src={logo} alt='logo'></img>
            <p><strong>Estante</strong>De livros</p>
        </LogoContainer>
    )
}

export default Logos