import React from 'react';
import '../stylesheets/components/ListItem.css';

function ListItem(props) {
    const {children} = props;

    return (
        <div className="App-list-item">
            {children}
        </div>
    );
}

export default ListItem;
