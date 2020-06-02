import React, {useState, useEffect} from 'react';
import List from "../components/List";
import Header from "../components/Header";
import config from '../configs/config.json';
import loading from "../images/loading.svg";
import '../stylesheets/screens/SiteList.css';

function SiteList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(config.apiUrl + config.apiVersion + config.routes.siteList)
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
                <h3 className={"App-login"}>Login</h3>
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
