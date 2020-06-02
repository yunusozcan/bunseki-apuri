import React from 'react';
import {Link} from "react-router-dom";
import ListItem from './ListItem';
import '../stylesheets/components/List.css';
import Button from "./Button";
import back from "../images/dashboard.svg";

function List(props) {
    const {list} = props;
    return (
        <React.Fragment>
            {list.map(listItem => (
                <ListItem key={listItem.id}>
                    <span className={"App-list-item-span"}>{listItem.webAdress}</span>
                    <Link to={"/dashboard/" + listItem.id}>
                        <Button>
                            <img src={back} className="App-dashboard-image" alt="dashboard"/>
                            <span>Dashboard</span>
                        </Button>
                    </Link>
                </ListItem>
            ))}
        </React.Fragment>
    );
}

export default List;
