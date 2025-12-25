import { useEffect } from 'react';

export const useScrollLock = () => {
    useEffect(() => {
        // Capture original values
        const originalStyle = window.getComputedStyle(document.body).overflow;
        const originalHtmlStyle = window.getComputedStyle(document.documentElement).overflow;

        // Apply strict lock
        document.body.style.setProperty('overflow', 'hidden', 'important');
        document.documentElement.style.setProperty('overflow', 'hidden', 'important');

        // Optional: preventive touch action for mobile
        // document.body.style.touchAction = 'none'; 

        return () => {
            // Unlock
            document.body.style.overflow = originalStyle;
            document.documentElement.style.overflow = originalHtmlStyle;
            document.body.style.removeProperty('overflow');
            document.documentElement.style.removeProperty('overflow');
        };
    }, []);
};
