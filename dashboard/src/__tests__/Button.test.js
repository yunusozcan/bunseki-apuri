import React from 'react';
import Button from '../components/Button';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(<Button onClick={()=> {console.log('test')}}>Test</Button>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
