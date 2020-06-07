import React from 'react';
import Select from '../components/Select';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer
        .create(<Select defaultData={true} parentCallback={() => { console.log('Test');}}>Facebook</Select>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
