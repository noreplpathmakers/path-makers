import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const SmoothScroll = () => {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis with more responsive settings
        const lenis = new Lenis({
            duration: 0.8, // Decreased for snappier feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1.5, // Increased for better response
            smoothTouch: false,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
};

export default SmoothScroll;
