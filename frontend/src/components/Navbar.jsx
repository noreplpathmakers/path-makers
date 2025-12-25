import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import clsx from 'clsx';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav
            className={clsx(
                'fixed w-full z-[100] transition-all duration-300 top-0 left-0',
                scrolled || location.pathname !== '/'
                    ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-lg py-3'
                    : 'bg-transparent py-5'
            )}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                    <img src="/logo.png" alt="PathMakers" className="h-10 w-auto" />
                    <span>PathMakers</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={clsx(
                                    'text-sm font-medium transition-colors hover:text-primary',
                                    location.pathname === link.path
                                        ? 'text-primary'
                                        : 'text-slate-600 dark:text-slate-300'
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link to="/admin/login" className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" title="Admin Access">
                            <User size={20} />
                        </Link>
                        <Link
                            to="/contact"
                            className="bg-primary text-primary-foreground px-5 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors shadow-md"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <Link to="/admin/login" className="text-slate-800 dark:text-slate-200" title="Admin Access">
                        <User size={24} />
                    </Link>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-slate-800 dark:text-slate-200"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                        'text-lg font-medium py-2 border-b border-slate-100 dark:border-slate-800',
                                        location.pathname === link.path
                                            ? 'text-primary'
                                            : 'text-slate-600 dark:text-slate-300'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="/admin/login"
                                onClick={() => setIsOpen(false)}
                                className="text-lg font-medium py-2 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-2"
                            >
                                <User size={20} /> Admin Login
                            </Link>
                            <Link
                                to="/contact"
                                onClick={() => setIsOpen(false)}
                                className="mt-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium text-center hover:bg-blue-700 transition-colors shadow-lg"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
