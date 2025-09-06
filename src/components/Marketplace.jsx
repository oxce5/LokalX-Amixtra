import React from 'react';
import MarketplaceItem from './partials/MarketplaceItem';

function Marketplace() {
    const items = [
        { id: 1, name: 'Product A', price: '$10' },
        { id: 2, name: 'Product B', price: '$20' },
        { id: 3, name: 'Product C', price: '$30' },
    ];

    return (
        <section>
            <h3>Marketplace</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
                {items.map(item => (
                    <MarketplaceItem key={item.id} name={item.name} price={item.price} />
                ))}
            </div>
        </section>
    );
}

export default Marketplace; 