import { useState, useEffect } from 'react';

const breakpoints = {
    sm: 640,
    md: 768,
    l: 980,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

export const useBreakpoints = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakpoints.sm);
            setIsTablet(window.innerWidth <= breakpoints.l);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { isMobile, isTablet };
};
