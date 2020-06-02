import React from 'react';
import '../stylesheets/components/Header.css';

function Header(props) {
    const {children} = props;
    return (
        <header className="App-header">
            {children}
        </header>
    );
}

export default Header;
