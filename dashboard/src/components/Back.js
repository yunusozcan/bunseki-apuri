import React from 'react';
import back from '../images/back.svg';
import '../stylesheets/components/Back.css';
import {Link} from "react-router-dom";

function Back() {
    return (
        <Link to={"/"} className="App-back App-button">
            <img src={back} className="App-back-image" alt="back"/>
        </Link>
    );
}

export default Back;
