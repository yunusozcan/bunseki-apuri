import React, {useState, useEffect} from 'react';
import List from "../components/List";
import Header from "../components/Header";
import config from '../configs/config.json';
import loading from "../images/loading.svg";
import '../stylesheets/screens/SiteList.css';
import {Link} from "react-router-dom";
import back from "../images/back.svg";

function SiteList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + config.apiUrl + config.apiVersion + config.routes.siteList)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    console.log(error);
                    setError(error);
                }
            )
    }, []);

    return (
        <div>
            <Header>
                <h2 className={"App-brand"}>BUNSEKI APURI</h2>
                <Link to={"/create/new"}>
                    <h3 className={"App-create"}>Create</h3>
                </Link>
            </Header>
            {isLoaded ? (
                <List list={items}/>
            ) : (
                <section className="App-loading">
                    <img src={loading} className="App-loading-image" alt="loading"/>
                </section>
            )}
        </div>
    );
}

export default SiteList;
