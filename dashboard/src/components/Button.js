import React from 'react';
import '../stylesheets/components/Button.css';

function Button(props) {
    const {children, onClick} = props;

    return (
        <button className="App-button" type="button" onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
