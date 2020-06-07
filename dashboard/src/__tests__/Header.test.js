import React from 'react';
import Header from '../components/Header';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(<Header >Test</Header>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
