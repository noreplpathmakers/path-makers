import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, Smartphone, Brain, BookOpen, Star, Zap, Globe, Cpu, ChevronDown, Quote, Search, X, Loader2, Sparkles, Rocket, Shield, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../../components/ui/SpotlightCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { API_URL } from '../../utils/api';

const Landing = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const rotateS = useSpring(useTransform(scrollY, [0, 1000], [0, 360]), { stiffness: 50, damping: 20 });

    // Tracking State
    const [trackQuery, setTrackQuery] = useState('');
    const [trackResult, setTrackResult] = useState(null);
    const [trackLoading, setTrackLoading] = useState(false);
    const [trackError, setTrackError] = useState('');
    const [showTrackModal, setShowTrackModal] = useState(false);

    const handleTrack = async () => {
        if (!trackQuery.trim()) return;
        setTrackLoading(true);
        setTrackError('');
        setTrackResult(null);
        setShowTrackModal(true);

        try {
            const res = await fetch(`${API_URL}/public/track?query=${trackQuery}`);
            const data = await res.json();

            if (res.ok) {
                setTrackResult(data);
            } else {
                setTrackError(data.msg || 'Request not found');
            }
        } catch (err) {
            setTrackError('Failed to track request. Please try again.');
        } finally {
            setTrackLoading(false);
        }
    };

    return (
        <div className="overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-pink-500/30 transition-colors duration-300">

            {/* --- HERO SECTION: 3D REIMAGINED --- */}
            <section className="relative min-h-[110vh] flex items-center justify-center px-4 md:px-6 pt-20 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('/homebackground.jpg')] bg-cover bg-center bg-no-repeat transform scale-105 opacity-40"></div>
                    <div className="absolute inset-0 bg-slate-950/70 dark:bg-slate-950/80 backdrop-blur-[2px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-transparent to-transparent"></div>
                </div>

                <div className="container mx-auto relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-left relative z-20"
                    >
                        {/* Freelancers Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-orange-500/20 mb-3 hover:scale-105 hover:shadow-orange-500/40 transition-all cursor-pointer"
                        >
                            <Sparkles size={14} className="text-white fill-white animate-pulse" />
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white">
                                Freelancers
                            </span>
                        </motion.div>
                        <br className="block" />

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-6 group hover:scale-105 transition-transform cursor-default"
                        >
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                            </span>
                            <span className="text-xs md:text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                                NEXT-GEN DIGITAL ECOSYSTEMS
                            </span>
                        </motion.div>

                        {/* 3D Headline */}
                        <div className="relative mb-6 perspective-1000">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] select-none text-white drop-shadow-xl">
                                REDEFINE
                            </h1>
                            <div className="relative">
                                {/* 3D Shadow Layer */}
                                <h1 className="absolute top-1 left-1 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] text-pink-500/0 dark:text-pink-500/20 select-none blur-sm transform translate-z-[-10px]">
                                    POSSIBILITY
                                </h1>
                                {/* Gradient Text */}
                                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x pb-2">
                                    POSSIBILITY
                                </h1>
                            </div>
                        </div>

                        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg leading-relaxed font-medium">
                            We fuse <span className="text-indigo-400 font-bold">artistic vision</span> with <span className="text-purple-400 font-bold">engineering precision</span> to architect the impossible.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/services" className="relative group px-8 py-4 bg-white rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/30">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                                <span className="relative flex items-center gap-2 text-slate-900 group-hover:text-white font-bold text-base transition-colors">
                                    <Rocket size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" /> Start Project
                                </span>
                            </Link>
                            <Link to="/projects" className="px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 text-white font-bold text-base rounded-2xl transition-all shadow-lg hover:shadow-xl">
                                Explore Work
                            </Link>
                        </div>
                    </motion.div>

                    {/* Desktop Tracking Widget - Compact (Right Column) */}
                    <div className="hidden lg:block relative z-20 pl-8">
                        <TrackingWidget
                            query={trackQuery}
                            setQuery={setTrackQuery}
                            onTrack={handleTrack}
                            loading={trackLoading}
                            variant="compact"
                        />
                    </div>
                </div>

                {/* Scroll Hint */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <ChevronDown className="text-slate-400 dark:text-slate-600" size={32} />
                </div>
            </section>

            {/* --- TRACK YOUR REQUEST: COLORFUL CARD (Mobile/Tablet Only) --- */}
            <section className="relative z-30 -mt-24 px-4 lg:hidden">
                <div className="container mx-auto">
                    <TrackingWidget
                        query={trackQuery}
                        setQuery={setTrackQuery}
                        onTrack={handleTrack}
                        loading={trackLoading}
                        variant="full"
                    />
                </div>
            </section>

            {/* Tracking Modal (Same Logic, updated Design) */}
            <AnimatePresence>
                {showTrackModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4" onClick={() => setShowTrackModal(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-0 max-w-xl w-full relative shadow-2xl overflow-hidden"
                        >
                            <div className="bg-slate-50 dark:bg-slate-950 p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Search className="text-indigo-500" size={20} /> Tracking Results
                                </h3>
                                <button onClick={() => setShowTrackModal(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
                                    <X size={20} className="text-slate-500" />
                                </button>
                            </div>

                            <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
                                {trackLoading ? (
                                    <div className="py-12 flex flex-col items-center justify-center text-slate-500">
                                        <Loader2 className="animate-spin mb-4 text-indigo-500" size={48} />
                                        <p className="font-medium animate-pulse">Searching global database...</p>
                                    </div>
                                ) : trackError ? (
                                    <div className="py-8 text-center bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-500/20">
                                        <div className="text-red-500 font-bold mb-2 text-lg">No Matching Records</div>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">We couldn't find a request with that ID.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {trackResult && trackResult.map((req, index) => (
                                            <div key={index} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-indigo-500/50 transition-colors">
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <div className="text-xs font-extrabold text-indigo-500 uppercase tracking-wider mb-1">Project</div>
                                                        <div className="font-bold text-slate-900 dark:text-white text-xl">{req.service_name}</div>
                                                    </div>
                                                    <StatusBadge status={req.status} />
                                                </div>

                                                <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl mb-4 border border-slate-100 dark:border-slate-800">
                                                    <div>
                                                        <div className="text-xs text-slate-500 mb-1 font-bold">Request ID</div>
                                                        <div className="font-mono text-slate-900 dark:text-white font-bold">{req.unique_id}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-slate-500 mb-1 font-bold">Submitted</div>
                                                        <div className="text-slate-900 dark:text-white font-medium">{new Date(req.submission_date).toLocaleDateString()}</div>
                                                    </div>
                                                </div>

                                                {req.message && (
                                                    <div>
                                                        <div className="text-xs text-slate-500 mb-1 font-bold uppercase">Brief</div>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{req.message}"</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- STATISTICS: GRADIENT BLOBS --- */}
            <section className="py-24 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-500/5 rounded-full blur-[80px] -translate-y-1/2"></div>
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/5 rounded-full blur-[80px] -translate-y-1/2"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <StatItem value={23} label="Projects" suffix="+" icon={<Cpu />} color="text-amber-500 dark:text-amber-400" bgColor="bg-amber-100 dark:bg-amber-500/20" />
                        <StatItem value={98} label="Satisfaction" suffix="%" icon={<Star />} color="text-yellow-500 dark:text-yellow-400" bgColor="bg-yellow-100 dark:bg-yellow-500/20" />
                        <StatItem value={10} label="Hardcore Devs" suffix="+" icon={<UsersIcon />} color="text-pink-500 dark:text-pink-400" bgColor="bg-pink-100 dark:bg-pink-500/20" />
                        <StatItem value={1} label="Years Experience" suffix="+" icon={<Shield />} color="text-purple-500 dark:text-purple-400" bgColor="bg-purple-100 dark:bg-purple-500/20" />
                    </motion.div>
                </div>
            </section>

            {/* --- SERVICES: GLASS CARDS --- */}
            <section className="py-16 md:py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12 md:mb-24 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 text-slate-900 dark:text-white">
                            Hyper-Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Services</span>
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
                            We deliver end-to-end digital solutions that scale with your ambition.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ServiceCard
                            icon={<Code size={32} />}
                            title="Web Development"
                            desc="Responsive, blazing fast web apps built with React, Next.js, and modern tools."
                            gradient="from-blue-500 to-cyan-500"
                        />
                        <ServiceCard
                            icon={<Smartphone size={32} />}
                            title="App Development"
                            desc="Native feeling iOS and Android apps using React Native and Flutter."
                            gradient="from-purple-500 to-pink-500"
                        />
                        <ServiceCard
                            icon={<Brain size={32} />}
                            title="AI Integration"
                            desc="Smart algorithms and machine learning models to power your business logic."
                            gradient="from-emerald-500 to-teal-500"
                        />
                        <ServiceCard
                            icon={<BookOpen size={32} />}
                            title="Consulting"
                            desc="Strategic digital transformation advice to guide your tech roadmap."
                            gradient="from-orange-500 to-red-500"
                        />
                    </div>
                </div>
            </section>

            {/* --- TESTIMONIALS --- */}
            <section className="py-24 bg-white dark:bg-slate-900/50">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Testimonials</span>
                        <h2 className="text-3xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">Client Success Stories</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Praveen", feedback: "I liked how simple and clear the whole process was. The PathMakers team kept me updated without me having to ask again and again." },
                            { name: "Anitha", feedback: "They delivered exactly what I asked for, and the design looked even better than I expected. Really happy with the work!" },
                            { name: "Karthik", feedback: "Honest and hardworking team. We had a tight deadline, and they managed to finish everything on time without compromising quality." },
                            { name: "Suresh", feedback: "Excellent technical support and innovative solutions. They really understood our business needs." },
                            { name: "Divya", feedback: "The team is very professional and responsive. The final product exceeded our expectations in terms of performance." },
                            { name: "Arjun", feedback: "Great value for money. The project was handled with great care and attention to detail from start to finish." }
                        ].map((test, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                                whileHover={{ y: -10 }}
                                className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 relative hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group overflow-hidden"
                            >
                                {/* Animated Background Blob */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

                                <Quote className="text-blue-500 mb-6 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" size={40} />

                                <div className="relative z-10">
                                    <p className="text-slate-600 dark:text-slate-300 text-lg italic mb-6 leading-relaxed">"{test.feedback}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                            {test.name[0]}
                                        </div>
                                        <div>
                                            <div className="text-slate-900 dark:text-white font-bold text-lg">{test.name}</div>
                                            <div className="text-blue-500 text-xs uppercase font-bold tracking-wider flex items-center gap-1">
                                                <ShieldCheck size={12} /> Verified Client
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FEATURED PROJECTS --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <span className="text-purple-500 font-bold tracking-widest uppercase text-sm">Portfolio</span>
                            <h2 className="text-3xl md:text-5xl font-black mt-2 text-slate-900 dark:text-white">Selected Works</h2>
                        </div>
                        <Link to="/projects" className="px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold transition-colors">
                            View All Cases
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            { title: "Retail POS System", cat: "Web Development", img: "/assets/projects/retailpos1.jpg", desc: "Comprehensive sales and inventory management." },
                            { title: "Uthra", cat: "Web Platform", img: "/assets/projects/uthra1.jpg", desc: "Direct buyer-seller connection platform." }
                        ].map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="group relative rounded-3xl overflow-hidden aspect-[16/10] cursor-pointer"
                            >
                                <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
                                <div className="absolute bottom-0 left-0 w-full p-8">
                                    <div className="text-blue-400 font-medium mb-1">{project.cat}</div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-slate-300 text-sm">{project.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA BOTTOM --- */}
            <section className="py-32 relative overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/40 via-transparent to-transparent"></div>
                </div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
                        READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">LAUNCH?</span>
                    </h2>
                    <Link to="/contact" className="inline-flex items-center gap-3 px-12 py-6 bg-white text-slate-900 font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                        <Sparkles className="text-yellow-500 fill-yellow-500" /> Ignite Your Project
                    </Link>
                </div>
            </section>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const FloatingBadge = ({ delay, x, y, icon, text, color }) => (
    <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: delay, ease: "easeInOut" }}
        className={`absolute flex items-center gap-2 px-3 py-2 rounded-xl text-white font-bold text-sm shadow-lg ${color}`}
        style={{ transform: `translate(${x}, ${y})` }}
    >
        {icon} {text}
    </motion.div>
);

const StatItem = ({ value, label, suffix, icon, color, bgColor }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 30, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1 }
        }}
        whileHover={{ y: -10, rotate: 1 }}
        className="flex items-center gap-4 p-4 md:p-6 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300 relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 w-24 h-24 ${color.replace('text-', 'bg-')}/5 rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150`}></div>
        <div className={`p-4 rounded-2xl ${bgColor} shadow-inner ${color} relative z-10 group-hover:scale-110 transition-transform duration-300 ring-2 ring-transparent group-hover:ring-${color.split('-')[1]}-200 dark:group-hover:ring-${color.split('-')[1]}-900`}
        >
            {icon}
        </div>
        <div className="relative z-10">
            <div className={`text-3xl md:text-5xl font-black ${color.replace('text-', 'text-slate-900 dark:text-')} drop-shadow-sm`}>
                <AnimatedCounter value={value} suffix={suffix} />
            </div>
            <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{label}</div>
        </div>
    </motion.div>
);

const ServiceCard = ({ icon, title, desc, gradient }) => (
    <div className="group relative p-1 rounded-3xl bg-white dark:bg-slate-900 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
        <div className="relative h-full bg-slate-50 dark:bg-slate-950/50 rounded-[1.4rem] p-6 md:p-8 flex flex-col border border-slate-100 dark:border-white/5">
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                {desc}
            </p>
            <Link to="/services" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white group-hover:gap-3 transition-all">
                Learn More <ArrowRight size={16} className={`text-${gradient.split('-')[1]}-500`} />
            </Link>
        </div>
    </div>
);

const StatusBadge = ({ status }) => {
    let styles = "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
    if (status === 'Pending') styles = "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400";
    if (status === 'Confirmed') styles = "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400";
    if (status === 'Ongoing') styles = "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400";
    if (status === 'Completed') styles = "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";
    if (status === 'Canceled') styles = "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";

    return (
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-transparent ${styles}`}>
            {status}
        </span>
    );
};

const UsersIcon = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
)

const TrophyIcon = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
)

const TrackingWidget = ({ query, setQuery, onTrack, loading, variant = 'full' }) => {
    const isCompact = variant === 'compact';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={isCompact
                ? "bg-white/10 dark:bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                : "max-w-5xl mx-auto rounded-[2.5rem] p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/20"}
        >
            <div className={isCompact ? "" : "bg-white dark:bg-slate-900 rounded-[2.4rem] p-8 md:p-14 relative overflow-hidden"}>
                {!isCompact && (
                    <>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
                    </>
                )}
                {/* Decoration for Compact */}
                {isCompact && (
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-3xl"></div>
                )}

                <div className="relative z-10 text-center">
                    <span className={`inline-block py-1 px-3 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${isCompact ? "bg-white/10 text-white border border-white/10" : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"}`}>
                        Client Portal
                    </span>
                    <h2 className={`font-black mb-4 ${isCompact ? "text-3xl text-white" : "text-3xl md:text-5xl text-slate-900 dark:text-white"}`}>
                        Track Your Vision
                    </h2>
                    <p className={`text-base mb-6 mx-auto ${isCompact ? "text-slate-300" : "text-slate-600 dark:text-slate-300 max-w-2xl text-lg"}`}>
                        {isCompact ? "Real-time project updates. Verified instantly." : "Real-time updates on your project. Enter your Request ID or Phone Number to verify status instantly."}
                    </p>

                    <div className={`flex ${isCompact ? "flex-col" : "flex-col md:flex-row"} gap-4 max-w-2xl mx-auto ${isCompact ? "" : "bg-slate-50 dark:bg-slate-950 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner"}`}>
                        <div className="flex-1 relative">
                            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isCompact ? "text-white/60" : "text-slate-400"}`} />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Enter Request ID..."
                                className={`w-full bg-transparent border-none pl-12 pr-4 py-4 font-medium focus:outline-none focus:ring-0 ${isCompact ? "text-white placeholder:text-white/50 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors" : "text-slate-900 dark:text-white placeholder:text-slate-400"}`}
                            />
                        </div>
                        <button
                            onClick={onTrack}
                            disabled={loading}
                            className={`${isCompact ? "w-full bg-white text-slate-900 hover:bg-indigo-50" : "bg-slate-900 dark:bg-white text-white dark:text-slate-900"} font-bold px-8 py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
                        >
                            {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Track Now'}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Landing;
