'use client';

import { useState, useEffect } from 'react';
import MainApp from '../components/MainApp';
import SalesLanding from '../components/SalesLanding';

export default function Home() {
    const [showApp, setShowApp] = useState(false);

    // Optional: Check if user has already entered in this session
    useEffect(() => {
        const hasEntered = sessionStorage.getItem('yogia_entered');
        if (hasEntered) {
            setShowApp(true);
        }
    }, []);

    const handleEnter = () => {
        sessionStorage.setItem('yogia_entered', 'true');
        setShowApp(true);
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    return (
        <main>
            {showApp ? (
                <MainApp />
            ) : (
                <SalesLanding onEnterApp={handleEnter} />
            )}
        </main>
    );
}
