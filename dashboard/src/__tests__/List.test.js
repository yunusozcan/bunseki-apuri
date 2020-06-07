import React from 'react';
import List from '../components/List';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from "react-router-dom";

it('renders correctly', () => {
    const tree = renderer
        .create(
            <Router>
                <List list={[{id:1, webAdress: 'Test'}]}/>
            </Router>
            )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
