import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            setIsLoaded(true);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    if (isLoaded) return null;

    return (
        <div className="preloader" aria-hidden="true">
            <div className="preloader-logo">
                <div className="preloader-ring"></div>
                <div className="preloader-dot"></div>
            </div>
            <div className="preloader-text">TESFAYE</div>
        </div>
    );
};

export default Preloader;
