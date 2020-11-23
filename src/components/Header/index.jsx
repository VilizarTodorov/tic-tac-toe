import React from 'react'
import Navigation from '../Navigation'
import Logo from '../Logo';
import './styles.scss'

const Header = (props) => {
    return(
        <header className="App-header">
            <Logo></Logo>
            <Navigation></Navigation>
        </header>
    )
}

export default Header ;