import React from 'react';

function Menu() {
    return (
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem' }}>
            <li>Home</li>
            <li>Marketplace</li>
            <li>About</li>
        </ul>
    );
}

export default Menu;    