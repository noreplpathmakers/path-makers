import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({ value, suffix = "", className = "" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20px" });
    const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;
    
    // Explicitly configure spring for smooth counting
    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 20, duration: 2 });
    const display = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        if (inView) {
            spring.set(numericValue);
        }
    }, [inView, numericValue, spring]);

    return (
        <span ref={ref} className={`tabular-nums ${className}`}>
            <motion.span>{display}</motion.span>{suffix}
        </span>
    );
};

export default AnimatedCounter;
