import React, {useState, useEffect, useCallback} from 'react';
import {useParams} from "react-router-dom";
import Header from '../components/Header';
import Chart from '../components/Chart';
import Back from "../components/Back";
import Select from "../components/Select";
import Button from "../components/Button";
import config from '../configs/config.json';
import loading from "../images/loading.svg";
import '../stylesheets/screens/Dashboard.css';

function Dashboard() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [defaultData, setdefaultData] = useState(true);
    const {id} = useParams();

    const loadData = useCallback(() => {
        setIsLoaded(false);
        setdefaultData(true);
        fetch(process.env.REACT_APP_API_URL + config.apiUrl + config.apiVersion + config.routes.dashboard + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                    setIsLoaded(true);
                },
                (error) => {
                    console.log(error);
                    setError(error);
                }
            )
    }, [id]);

    const loadDataWithDates = (dates) => {
        setIsLoaded(false);
        fetch(process.env.REACT_APP_API_URL + config.apiUrl + config.apiVersion + config.routes.dashboard + id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dates)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                    setIsLoaded(true);
                },
                (error) => {
                    console.log(error);
                    setError(error);
                }
            )
    };

    useEffect(() => {
        loadData();
    }, [loadData]);

    const parentCallback = (dates) => {
        setdefaultData(false);
        loadDataWithDates(dates);
    };

    return (
        <React.Fragment>
            <Header>
                <Back/>
                <Select parentCallback={parentCallback} defaultData={defaultData}/>
                <Button onClick={loadData}>
                    30 Min
                </Button>
            </Header>
            {isLoaded ? (
                <section className="App-section">
                    <Chart dataset={items.ttfb} title={"TTFB"}/>
                    <Chart dataset={items.fcp} title={"FCP"}/>
                    <Chart dataset={items.dom} title={"DOM Load"}/>
                    <Chart dataset={items.window} title={"Window Load"}/>
                </section>
            ) : (
                <section className="App-loading">
                    <img src={loading} className="App-loading-image" alt="loading"/>
                </section>
            )}
        </React.Fragment>
    );
}

export default Dashboard;
