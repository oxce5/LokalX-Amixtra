import React from 'react';

function Aside() {
    return (
        <aside style={{ width: '200px', background: '#f4f4f4', padding: '1rem' }}>
            <h3>Sidebar</h3>
            <ul>
                <li>Profile</li>
                <li>Settings</li>
                <li>Help</li>
            </ul>
        </aside>
    );
}
export default Aside;