import React from 'react';
import NavBar from '../components/NavBar';
import Aside from '../components/Aside';
import HighlightsCard from '../components/HighlightsCard';
import Marketplace from '../components/Marketplace';

function HomePage() {
    return (
        <div>
            <NavBar />
            <div style={{ display: 'flex', marginTop: '1rem' }}>
                <Aside />
                <main style={{ flex: 1, padding: '1rem' }}>
                    <HighlightsCard />
                    <Marketplace />
                </main>
            </div>
        </div>
    );
}

export default HomePage;