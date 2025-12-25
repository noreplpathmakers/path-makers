import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-50 dark:bg-slate-900/50 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1">
                        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary mb-4">
                            <img src="/logo.png" alt="PathMakers" className="h-8 w-auto" />
                            <span>PathMakers</span>
                        </Link>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                            Empowering businesses and individuals with cutting-edge digital solutions and academic assistance.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="p-2 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary shadow-sm hover:shadow transition-all border border-slate-100 dark:border-slate-700">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary shadow-sm hover:shadow transition-all border border-slate-100 dark:border-slate-700">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary shadow-sm hover:shadow transition-all border border-slate-100 dark:border-slate-700">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary shadow-sm hover:shadow transition-all border border-slate-100 dark:border-slate-700">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:pl-8">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-primary transition-colors"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-primary transition-colors"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-primary transition-colors"></span>
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-primary transition-colors"></span>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Services</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-primary transition-colors"></span>
                                    Web Development
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-primary transition-colors"></span>
                                    App Development
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-primary transition-colors"></span>
                                    AI Solutions
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-primary transition-colors"></span>
                                    Academic Assistance
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact - New Column */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-lg">Contact Us</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="text-slate-600 dark:text-slate-400 group">
                                <span className="block font-bold text-xs uppercase tracking-wider mb-1 text-slate-500 group-hover:text-primary transition-colors">Email</span>
                                <a href="mailto:noreply.pathmakers@gmail.com" className="hover:text-primary transition-colors">noreply.pathmakers@gmail.com</a>
                            </li>
                            <li className="text-slate-600 dark:text-slate-400 group">
                                <span className="block font-bold text-xs uppercase tracking-wider mb-1 text-slate-500 group-hover:text-primary transition-colors">Phone</span>
                                <a href="tel:+917200754566" className="hover:text-primary transition-colors">+91 7200 75 4566</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar - No Copyright */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex justify-center md:justify-end text-sm text-slate-500 dark:text-slate-500">
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
