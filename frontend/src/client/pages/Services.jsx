import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Smartphone, Brain, BookOpen, Layers, BarChart, Cloud, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../../components/ui/SpotlightCard';
import BookingModal from '../components/BookingModal';
import ServiceDetailModal from '../components/ServiceDetailModal';

const services = [
    {
        icon: <Code size={40} />,
        title: "Web Development",
        code: "WEB",
        desc: "From landing pages to complex web apps, we build responsive, accessible, and performant digital experiences using the latest modern stacks like React, Next.js, and Node.js.",
        color: "text-blue-600 dark:text-blue-400",
        gradient: "from-blue-100 to-cyan-100 dark:from-blue-500/20 dark:to-cyan-500/20"
    },
    {
        icon: <Smartphone size={40} />,
        title: "App Development",
        code: "APP",
        desc: "Native-quality mobile applications for iOS and Android. detailed UX/UI design, seamless API integration, and store deployment support.",
        color: "text-purple-600 dark:text-purple-400",
        gradient: "from-purple-100 to-pink-100 dark:from-purple-500/20 dark:to-pink-500/20"
    },
    {
        icon: <Brain size={40} />,
        title: "AI Solutions",
        code: "AI",
        desc: "Leverage the power of Artificial Intelligence. Custom chatbots, predictive models, and automation workflows that give your business a competitive edge.",
        color: "text-green-600 dark:text-green-400",
        gradient: "from-green-100 to-emerald-100 dark:from-green-500/20 dark:to-emerald-500/20"
    },
    {
        icon: <BookOpen size={40} />,
        title: "Academic Assistance",
        code: "ACAD",
        desc: "Comprehensive support for researchers and students. Data analysis, thesis structure guidance, and technical implementation of research projects.",
        color: "text-orange-600 dark:text-orange-400",
        gradient: "from-orange-100 to-yellow-100 dark:from-orange-500/20 dark:to-yellow-500/20"
    },
    {
        icon: <Cloud size={40} />,
        title: "Cloud Infrastructure",
        code: "CLD",
        desc: "Scalable, secure, and cost-effective cloud architecture. AWS, Azure, and Google Cloud setup, migration, and management.",
        color: "text-sky-600 dark:text-sky-400",
        gradient: "from-sky-100 to-indigo-100 dark:from-sky-500/20 dark:to-indigo-500/20"
    },
    {
        icon: <Shield size={40} />,
        title: "Cyber Security",
        code: "SEC",
        desc: "Protect your digital assets. Penetration testing, vulnerability assessments, and security protocol implementation.",
        color: "text-red-600 dark:text-red-400",
        gradient: "from-red-100 to-rose-100 dark:from-red-500/20 dark:to-rose-500/20"
    },
];

import { Helmet } from 'react-helmet-async';

const Services = () => {
    const [selectedService, setSelectedService] = useState(null); // For Detail Modal
    const [bookingService, setBookingService] = useState(null); // For Booking Modal

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white pt-24 pb-20 transition-colors duration-300">
            <Helmet>
                <title>Our Services | PathMakers - Web, App, AI & More</title>
                <meta name="description" content="Explore our comprehensive digital services: Web Development, App Development, AI Solutions, Cloud Infrastructure, and Cyber Security. Scale your business with PathMakers." />
                <meta name="keywords" content="Web Development, App Development, AI Solutions, Cloud Infrastructure, Cyber Security, Consulting, Digital Transformation" />
                <link rel="canonical" href="https://path-makers.vercel.app/services" />
            </Helmet>
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 dark:from-teal-400 dark:via-blue-500 dark:to-purple-500 mb-6"
                    >
                        Our Expertise
                    </motion.h1>
                    <p className="text-slate-600 dark:text-slate-400 text-xl max-w-2xl mx-auto">
                        Comprehensive digital solutions tailored to your unique challenges.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            {...service}
                            delay={index * 0.1}
                            onKnowMore={() => setSelectedService(service)}
                            onBook={() => setBookingService(service)}
                        />
                    ))}
                </div>

                {/* Modals */}
                <AnimatePresence>
                    {selectedService && (
                        <ServiceDetailModal
                            service={selectedService}
                            onClose={() => setSelectedService(null)}
                            onBook={() => {
                                setBookingService(selectedService);
                                setSelectedService(null);
                            }}
                        />
                    )}
                    {bookingService && (
                        <BookingModal
                            service={bookingService}
                            onClose={() => setBookingService(null)}
                        />
                    )}
                </AnimatePresence>

                {/* Project Stages Section */}
                <div className="mt-32">
                    <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 dark:text-white">Project Request Stages</h2>
                    <div className="grid md:grid-cols-5 gap-4">
                        <ProcessStep
                            num="01"
                            title="Pending"
                            desc="Request submitted. Waiting for confirmation from PathMakers team."
                            color="text-blue-500"
                        />
                        <ProcessStep
                            num="02"
                            title="Confirmed"
                            desc="Project approved. Ready to start development."
                            color="text-indigo-500"
                        />
                        <ProcessStep
                            num="03"
                            title="Ongoing"
                            desc="Active development and implementation in progress."
                            color="text-purple-500"
                        />
                        <ProcessStep
                            num="04"
                            title="Payment"
                            desc="Work completed and reviewed. Waiting for final payment."
                            color="text-orange-500"
                        />
                        <ProcessStep
                            num="05"
                            title="Completed"
                            desc="All stages finished. Project delivered successfully."
                            color="text-green-500"
                        />
                    </div>
                    <div className="text-center mt-12">
                        <p className="text-slate-500 mb-4">Check your current project status anytime.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

const ServiceCard = ({ icon, title, desc, color, gradient, delay, onKnowMore, onBook }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -10 }}
        transition={{ delay, duration: 0.5 }}
        className="h-full"
    >
        <div className="relative h-full group">
            {/* Pulsating Border Beam */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-0 group-hover:opacity-100 blur transition duration-500 animate-gradient-xy"></div>

            <SpotlightCard className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-full flex flex-col relative overflow-hidden rounded-[1.9rem]" spotlightColor="rgba(59, 130, 246, 0.15)">
                {/* Corner Effects - Animated & Glowing */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-20 rounded-bl-[60px] -mr-10 -mt-10 transition-all duration-500 group-hover:scale-150 group-hover:opacity-30 blur-xl`}></div>
                <div className={`absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100`}></div>
                <div className={`absolute bottom-0 left-0 w-1 h-20 bg-gradient-to-b ${gradient} opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100`}></div>

                <div className="p-8 flex flex-col h-full z-10 relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center ${color} mb-6 border border-slate-100 dark:border-white/5 shadow-2xl shadow-blue-500/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                        {icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-600 to-purple-600 transition-colors">{title}</h3>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                        {desc}
                    </p>
                    <div className="mt-auto pt-6 flex gap-3">
                        <button
                            onClick={onKnowMore}
                            className="flex-1 py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                            Know More
                        </button>
                        <button
                            onClick={onBook}
                            className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-500/20"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </SpotlightCard>
        </div>
    </motion.div>
);

const ProcessStep = ({ num, title, desc, color }) => (
    <div className="relative pl-8 border-l border-slate-200 dark:border-slate-800">
        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-600 ${color ? color.replace('text', 'bg').replace('500', '400') : ''}`}></div>
        <div className={`text-4xl font-black mb-2 opacity-50 ${color || 'text-slate-300 dark:text-slate-800'}`}>{num}</div>
        <h3 className={`text-xl font-bold mb-2 ${color || 'text-slate-900 dark:text-white'}`}>{title}</h3>
        <p className="text-slate-500 text-sm">{desc || ''}</p>
    </div>
);

export default Services;

