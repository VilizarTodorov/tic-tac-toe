import React from 'react'
import Navigation from '../Navigation'
import Logo from '../Logo';
import Profile from '../Profile'
import './styles.css'

const Header = (props) => {
    return(
        <header className="App-header">
            <Logo></Logo>
            <Navigation></Navigation>
            <Profile></Profile>
        </header>
    )
}

export default Header ;