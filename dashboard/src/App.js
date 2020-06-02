import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Dashboard from './screens/Dashboard';
import SiteList from './screens/SiteList';
import './stylesheets/App.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/dashboard/:id" component={Dashboard}/>
                <Route path="/" component={SiteList}/>
            </Switch>
        </Router>
    );
}

export default App;
