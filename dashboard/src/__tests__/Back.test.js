import React from 'react';
import Back from '../components/Back';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from "react-router-dom";

it('renders correctly', () => {
    const tree = renderer
        .create(
            <Router>
                <Back/>
            </Router>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
