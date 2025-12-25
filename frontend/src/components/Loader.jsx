import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Sparkles, Code2, Zap, Palette, Globe } from 'lucide-react';

const messages = [
    "Initializing quantum cores...",
    "Calibrating design vectors...",
    "Injecting neon plasma...",
    "Optimizing user happiness...",
    "Waking up the AI algorithms...",
    "Polishing every pixel...",
    "Almost there...",
    "Ready for launch!",
];

const Loader = ({ onComplete }) => {
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        // Cycle messages every 700ms (Total ~5.6s for 8 messages)
        const interval = setInterval(() => {
            setMsgIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
        }, 700);

        // Complete after 6000ms
        const timeout = setTimeout(() => {
            onComplete();
        }, 6000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden font-sans"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)", transition: { duration: 1 } }}
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-black"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Main Animation */}
                {/* Main Animation - 3D Text Branding */}
                <div className="relative mb-8 perspective-1000">
                    <motion.div
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "backOut" }}
                        className="relative z-20"
                    >
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 filter drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]"
                            style={{ textShadow: '0px 4px 0px rgba(0,0,0,0.3), 0px 8px 20px rgba(0,0,0,0.4)' }}
                        >
                            PathMakers
                        </h1>
                        {/* Shimmer overlay */}
                        <motion.div
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
                        ></motion.div>
                    </motion.div>

                    {/* Shadow Reflection */}
                    <div className="absolute top-full left-0 right-0 h-4 bg-black/20 blur-xl rounded-[100%] transform scale-x-75 translate-y-4"></div>
                </div>

                {/* Rotating subtitle messages */}
                <div className="h-6 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={msgIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]"
                        >
                            {messages[msgIndex]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Advanced Progress Bar */}
                <div className="mt-10 w-80 h-1.5 bg-slate-900 rounded-full overflow-hidden relative border border-slate-800">
                    {/* Moving gradient background */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 5.8, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                    ></motion.div>

                    {/* Scanline effect */}
                    <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
                    ></motion.div>
                </div>

                <div className="mt-2 text-xs text-slate-500 flex justify-between w-80 font-mono">
                    <span>LOADING ASSETS</span>
                    <span>{(msgIndex + 1) / messages.length * 100 > 100 ? 100 : Math.round((msgIndex + 1) / messages.length * 100)}%</span>
                </div>
            </div>

            {/* Floating Orbital Icons */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <OrbitingIcon icon={<Code2 />} duration={15} radius={300} angle={0} />
                <OrbitingIcon icon={<Sparkles />} duration={18} radius={350} angle={72} />
                <OrbitingIcon icon={<Zap />} duration={20} radius={250} angle={144} />
                <OrbitingIcon icon={<Palette />} duration={22} radius={380} angle={216} />
                <OrbitingIcon icon={<Globe />} duration={25} radius={320} angle={288} />
            </div>
        </motion.div>
    );
};

// Icon that actually orbits center
const OrbitingIcon = ({ icon, duration, radius, angle }) => (
    <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: duration, ease: "linear" }}
        className="absolute top-1/2 left-1/2 w-0 h-0"
    >
        <div
            className="absolute text-slate-700/30 dark:text-slate-600/20"
            style={{
                transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`
            }}
        >
            <motion.div
                animate={{ rotate: -360 }} // Counter-rotate to keep icon upright
                transition={{ repeat: Infinity, duration: duration, ease: "linear" }}
            >
                {React.cloneElement(icon, { size: 24 })}
            </motion.div>
        </div>
    </motion.div>
);

export default Loader;
