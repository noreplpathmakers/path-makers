import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Target, Heart, Smile, Zap, Users, Shield, Code, Rocket, Star, Sparkles } from 'lucide-react';
import SpotlightCard from '../../components/ui/SpotlightCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Helmet } from 'react-helmet-async';

const About = () => {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pt-24 pb-20 overflow-hidden relative transition-colors duration-300">
            <Helmet>
                <title>About Us | PathMakers - Our Vision & Mission</title>
                <meta name="description" content="Learn about PathMakers, our team, our vision, and our mission in providing clean, reliable digital solutions. Meet the minds behind the code." />
                <meta name="keywords" content="About PathMakers, PathMakers team, software company mission, digital partner" />
                <link rel="canonical" href="https://path-makers.vercel.app/about" />
            </Helmet>
            {/* Background Noise & Gradients */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-100 dark:from-blue-900/20 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100 dark:bg-purple-900/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
                    >
                        We Are PathMakers
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        A digital powerhouse dedicated to transforming complex challenges into elegant, high-performance solutions.
                    </motion.p>
                </div>

                {/* Vision & Mission - Continuous Floating & Pulse */}
                <div className="grid md:grid-cols-2 gap-6 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="h-full"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="h-full"
                        >
                            <SpotlightCard className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 h-full overflow-hidden relative group" spotlightColor="rgba(59, 130, 246, 0.4)">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-500 animate-pulse-slow"></div>
                                <div className="p-8 h-full flex flex-col relative z-10">
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-lg shadow-blue-500/20"
                                    >
                                        <Target size={32} />
                                    </motion.div>
                                    <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">Our Vision</h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed italic border-l-4 border-blue-500 pl-4 mb-4 bg-blue-50/50 dark:bg-blue-900/10 py-2 rounded-r-lg">
                                        "To become a dependable digital partner for individuals, startups, and small businesses."
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed flex-grow">
                                        We aim to build technology that genuinely helps people move forward, one step at a time.
                                    </p>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="h-full"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="h-full"
                        >
                            <SpotlightCard className="bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 h-full overflow-hidden relative group" spotlightColor="rgba(168, 85, 247, 0.4)">
                                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-500 animate-pulse-slow"></div>
                                <div className="p-8 h-full flex flex-col relative z-10">
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: -10 }}
                                        className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-500/20 dark:to-pink-500/20 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 shadow-lg shadow-purple-500/20"
                                    >
                                        <Heart size={32} />
                                    </motion.div>
                                    <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">Our Mission</h2>
                                    <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed flex-grow">
                                        <li className="flex items-start gap-3 group/item">
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover/item:scale-150 transition-transform"></span>
                                            To provide clean, reliable, and affordable digital solutions.
                                        </li>
                                        <li className="flex items-start gap-3 group/item">
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-pink-500 shrink-0 shadow-[0_0_10px_rgba(236,72,153,0.5)] group-hover/item:scale-150 transition-transform"></span>
                                            To understand every client’s idea deeply and turn it into a functional product.
                                        </li>
                                        <li className="flex items-start gap-3 group/item">
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover/item:scale-150 transition-transform"></span>
                                            To keep learning, improving, and evolving as a team.
                                        </li>
                                    </ul>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Compact Story Section - Animated Gradient Border */}
                <div className="mb-24 relative max-w-5xl mx-auto">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-pink-500/20 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-transparent rounded-[2rem] overflow-hidden shadow-2xl relative"
                        style={{
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'padding-box, border-box',
                        }}
                    >
                        {/* Animated overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30 animate-gradient-x pointer-events-none"></div>

                        <div className="p-8 md:p-12 text-center relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black mb-8 inline-flex items-center gap-3 text-slate-900 dark:text-white">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">#</span> The Origin Story
                            </h2>
                            <div className="space-y-6 text-slate-600 dark:text-slate-300 text-base md:text-xl leading-relaxed max-w-3xl mx-auto font-medium">
                                <p>“PathMakers began with five friends who shared one simple belief — <span className="text-slate-900 dark:text-white font-bold bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-md">good work doesn’t need noise; it needs intention.</span></p>
                                <p>We started with curiosity, long conversations, small projects, and the excitement of creating something real.</p>
                                <p>We built PathMakers as a team that listens first and builds next.</p>
                                <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">We’re not just delivering projects; we’re helping people move forward on their path.”</p>
                            </div>
                        </div>

                        {/* Compact Stats Bar */}
                        <div className="bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 p-6 md:p-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                                <StatBox value={23} label="Projects" suffix="+" icon={<Rocket size={20} />} color="text-blue-500" bgColor="bg-blue-100 dark:bg-blue-500/20" />
                                <StatBox value={98} label="Satisfaction" suffix="%" icon={<Star size={20} />} color="text-yellow-500" bgColor="bg-yellow-100 dark:bg-yellow-500/20" />
                                <StatBox value={10} label="Hardcore Devs" suffix="+" icon={<Code size={20} />} color="text-pink-500" bgColor="bg-pink-100 dark:bg-pink-500/20" />
                                <StatBox value={1} label="Experience" suffix="+ Years" icon={<Shield size={20} />} color="text-purple-500" bgColor="bg-purple-100 dark:bg-purple-500/20" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Team Section */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Meet the Minds</h2>
                    <p className="text-slate-600 dark:text-slate-400">The people behind the code.</p>
                </div>

                {/* Founder */}
                <div className="flex justify-center mb-12">
                    <div className="w-full max-w-sm">
                        <TeamMember
                            name="Naresh D"
                            role="Founder & Team Lead"
                            img="/assets/team/founder.jpg"
                            isFounder={true}
                        />
                    </div>
                </div>

                {/* Core Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <TeamMember name="Subash Shanmugam" role="Core Team" img="/assets/team/subash.jpeg" delay={0.1} />
                    <TeamMember name="Saravana Priyan ST" role="Core Team" img="/assets/team/SaravanaPriyan.png" delay={0.2} />
                    <TeamMember name="Sardheesh M" role="Core Team" img="/assets/team/Sardheesh.jpeg" delay={0.3} />
                    <TeamMember name="Ruthuvarshan E" role="Core Team" img="/assets/team/Ruthuvarshan.jpg" delay={0.4} />
                </div>

            </div>
        </div>
    );
};

// Compact Stat Box
const StatBox = ({ value, label, suffix, icon, color, bgColor }) => (
    <div className="flex flex-col items-center justify-center p-2 group hover:scale-105 transition-transform duration-300">
        <div className={`mb-3 ${color} p-3 rounded-full shadow-lg ${bgColor ? bgColor : 'bg-white dark:bg-slate-800'} ring-4 ring-transparent group-hover:ring-${color.split('-')[1]}-200 dark:group-hover:ring-${color.split('-')[1]}-900 transition-all`}>
            {icon}
        </div>
        <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-0.5">
            <AnimatedCounter value={value} suffix={suffix} />
        </div>
        <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">{label}</div>
    </div>
);

// Reaction Button with HUGE Particle Burst
const ReactionButton = ({ icon, color, type }) => {
    const [particles, setParticles] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Spawn multiple particles
        const newParticles = Array.from({ length: 12 }).map((_, i) => ({
            id: Date.now() + i,
            angle: (i * 30) + Math.random() * 20, // 360 spread
            speed: 50 + Math.random() * 100, // Varying speed
            scale: 0.5 + Math.random() * 1.5 // Varying size
        }));

        setParticles(prev => [...prev, ...newParticles]);

        // Cleanup
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 1000);
    };

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                className="p-3 rounded-full bg-white/20 hover:bg-white hover:text-black text-white transition-all backdrop-blur-md relative z-10 active:scale-95 hover:scale-110 shadow-lg"
            >
                {icon}
            </button>
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                        animate={{
                            opacity: 0,
                            x: Math.cos(p.angle * Math.PI / 180) * p.speed,
                            y: Math.sin(p.angle * Math.PI / 180) * p.speed,
                            scale: p.scale
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none custom-particle`}
                    >
                        {/* Using the icon itself as the particle, or a shape */}
                        <div className={`${color} drop-shadow-md`}>{type === 'zap' ? <Zap size={20} fill="currentColor" /> : <Smile size={20} fill="currentColor" />}</div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

const TeamMember = ({ name, role, img, isFounder = false, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ y: -15 }}
        className={`group relative rounded-[2rem] overflow-hidden cursor-pointer ${isFounder ? 'shadow-2xl shadow-blue-500/30' : 'shadow-xl hover:shadow-2xl dark:shadow-none dark:bg-slate-900'}`}
    >
        <div className={`relative overflow-hidden aspect-[3/4] bg-slate-200 dark:bg-slate-800`}>
            {/* Image with Zoom Effect */}
            <img
                src={img}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0 grayscale"
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${isFounder ? 'from-blue-900 via-blue-900/40' : 'from-slate-900 via-slate-900/40'} to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300`}></div>

            {/* Top Right Decoration */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                <Sparkles className="text-yellow-400" size={24} />
            </div>

            {/* Info Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className={`font-bold text-white mb-1 ${isFounder ? 'text-3xl' : 'text-xl'} drop-shadow-lg`}>{name}</div>
                <div className={`font-bold uppercase tracking-wider text-xs mb-4 ${isFounder ? 'text-blue-300' : 'text-slate-300'}`}>{role}</div>

                {/* Social Icons (Appear on Hover) - HUGE EFFECT */}
                <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <ReactionButton icon={<Smile size={24} />} color="text-yellow-400" type="smile" />
                    <ReactionButton icon={<Zap size={24} />} color="text-cyan-400" type="zap" />
                </div>
            </div>
        </div>
    </motion.div>
);

export default About;
