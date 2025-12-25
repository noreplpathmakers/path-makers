import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight, ArrowRight, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../../components/ui/SpotlightCard';
import BookingModal from '../components/BookingModal';

const categories = ['All', 'Web Development', 'App Development', 'AI Solutions', 'Cyber Security', 'Cloud Computing'];

const projects = [
    {
        id: 1,
        title: "Retail POS System",
        category: "Web Development",
        rating: 5,
        status: "Completed",
        images: ["/assets/projects/retailpos1.jpg", "/assets/projects/retailpos2.jpg", "/assets/projects/retailpos3.jpg"],
        description: "A comprehensive retail point of sale system capable of managing sales, inventory, and billing for retail stores.",
        tech: ["React", "Node.js", "MongoDB"]
    },
    {
        id: 2,
        title: "Uthra",
        category: "Web Development",
        rating: 4.5,
        status: "Completed",
        images: ["/assets/projects/uthra1.jpg"], // Placeholder until uthra1.jpg is available
        description: "A web platform designed to eliminate middlemen, connecting buyers directly with sellers. Accessible on all devices.",
        tech: ["React", "Node.js", "MongoDB"]
    },
    {
        id: 3,
        title: "Construction Management System",
        category: "Web Development",
        rating: 5,
        status: "Completed",
        images: ["/assets/projects/construct1.jpg"],
        description: "A specialized system for managing construction projects, resources, and timelines efficiently.",
        tech: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 4,
        title: "Real Estate Management System",
        category: "Web Development",
        rating: 4.5,
        status: "Completed",
        images: ["/assets/projects/estate1.jpg"],
        description: "A platform for managing real estate properties, listings, and client interactions.",
        tech: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 5,
        title: "Food Order & Delivery System",
        category: "Web Development",
        rating: 5,
        status: "Completed",
        images: ["/assets/projects/food1.jpg", "/assets/projects/food2.jpg"],
        description: "A seamless food ordering and delivery application connecting customers with local restaurants.",
        tech: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 6,
        title: "Law Firm Website",
        category: "Web Development",
        rating: 4.5,
        status: "Completed",
        images: ["/assets/projects/law1.jpg", "/assets/projects/law2.jpg"],
        description: "A professional website for law firms to manage clients, cases, and appointments.",
        tech: ["HTML", "CSS", "JavaScript"]
    },
    {
        id: 7,
        title: "Online Shopping System",
        category: "Web Development",
        rating: 5,
        status: "Completed",
        images: ["/assets/projects/shop1.jpg"],
        description: "A full-featured online shopping platform with cart management and secure checkout.",
        tech: ["React", "Node.js", "MongoDB"]
    },
    {
        id: 8,
        title: "Online Education Platform",
        category: "Web Development",
        rating: 4.5,
        status: "Completed",
        images: ["/assets/projects/urcourse1.jpg", "/assets/projects/urcourse2.jpg"],
        description: "An e-learning platform facilitating online courses, student tracking, and resource sharing.",
        tech: ["React", "Node.js", "MongoDB"]
    },
    {
        id: 9,
        title: "Digital Health Monitoring System",
        category: "App Development",
        rating: 5,
        status: "Completed",
        images: ["/assets/projects/healthapp1.jpg", "/assets/projects/healthapp2.jpg", "/assets/projects/healthapp3.jpg"],
        description: "Unified application for hospitals, patients, and officials to track and maintain health records.",
        tech: ["Flutter", "Node.js", "MongoDB"]
    },
    {
        id: 10,
        title: "Local Resource Sharing Platform",
        category: "App Development",
        rating: 4.5,
        status: "Completed",
        images: ["/assets/projects/heavenapp1.jpg"],
        description: "A community-driven platform for connecting locals to share resources and assistance.",
        tech: ["Kotlin", "Node.js", "MongoDB"]
    },
    {
        id: 11,
        title: "Alpha Ads",
        category: "AI Solutions",
        rating: 5,
        status: "Ongoing",
        images: ["/assets/projects/ads1.png"], // Corrected extension
        description: "An AI-powered advertising platform helping businesses target the right audience effectively.",
        tech: ["n8n", "React", "Node.js"]
    }
];

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [bookingProject, setBookingProject] = useState(null);

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-20 text-slate-900 dark:text-white transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white"
                    >
                        Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500">Masterpieces</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400"
                    >
                        Real solutions. Real impact.
                    </motion.p>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap ${activeCategory === cat
                                ? 'bg-blue-600 text-white shadow-lg scale-105'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 md:gap-12 md:gap-y-24 pb-20">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    onBook={() => setBookingProject({
                                        name: `Project Inquiry: ${project.title}`,
                                        code: `PROJ-${project.id}`,
                                        // minimal service mock for modal
                                    })}
                                />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6 text-slate-400">
                                    <FolderOpen size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No projects yet in {activeCategory}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
                                    We are ready to build something amazing in this space. Be the pioneer!
                                </p>
                                <Link
                                    to={`/contact?subject=I want a ${activeCategory} project`}
                                    className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
                                >
                                    Be the first to book <ChevronRight size={18} />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {bookingProject && (
                        <BookingModal
                            service={bookingProject}
                            onClose={() => setBookingProject(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const ProjectCard = React.forwardRef(({ project, index, onBook }, ref) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ perspective: 1000 }}
        >
            <motion.div
                style={{ rotateX, rotateY, z: 100 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full flex flex-col relative"
            >
                {/* Gradient Border Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 p-[2px] rounded-[2rem]"></div>
                <div className="bg-white dark:bg-slate-900 h-full w-full rounded-[1.9rem] overflow-hidden flex flex-col">

                    <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                        <ProjectImage images={project.images} title={project.title} />

                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 z-10">
                            <span className="px-3 py-1 bg-black/80 text-white rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                                Completed
                            </span>
                        </div>
                    </div>

                    <div className="p-5 flex-grow flex flex-col relative z-20">

                        {/* Category & Rating Row */}
                        <div className="flex justify-between items-center mb-4">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-bold uppercase tracking-wider">
                                {project.category}
                            </span>
                            <div className="flex items-center gap-1 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill={i < Math.floor(project.rating) ? "currentColor" : "none"} className={i < Math.floor(project.rating) ? "text-yellow-500" : "text-slate-300 dark:text-slate-600"} />
                                ))}
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>

                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                            {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map(t => (
                                <span key={t} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-bold text-slate-600 dark:text-slate-400">
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={onBook}
                            className="mt-auto w-full py-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all group/btn text-sm"
                        >
                            Book Similar Project <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
});

const ProjectImage = ({ images, title }) => {
    const [index, setIndex] = useState(0);

    React.useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <AnimatePresence mode="popLayout">
            <motion.img
                key={images[index]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={images[index]}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
        </AnimatePresence>
    );
};

export default Projects;
