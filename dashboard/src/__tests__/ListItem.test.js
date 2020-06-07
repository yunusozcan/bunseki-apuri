import React from 'react';
import ListItem from '../components/ListItem';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(<ListItem>Test</ListItem>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
