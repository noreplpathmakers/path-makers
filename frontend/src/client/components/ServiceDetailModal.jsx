import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

import ReactDOM from 'react-dom';
import { useScrollLock } from '../hooks/useScrollLock';

const ServiceDetailModal = ({ service, onClose, onBook }) => {
    useScrollLock();

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-[9999] overflow-y-auto bg-black/80 backdrop-blur-sm overscroll-y-contain"
            onClick={onClose}
        >
            <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 relative flex flex-col md:flex-row my-8"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-500 transition-colors z-10">
                        <X size={20} />
                    </button>

                    {/* Left Side: Title & Image/Gradient */}
                    <div className={`p-10 md:w-2/5 bg-gradient-to-br ${service.gradient || 'from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20'} flex flex-col justify-center relative`}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                        <div className={`${service.color} mb-6`}>
                            {React.cloneElement(service.icon, { size: 64 })}
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{service.title}</h2>
                        <div className="w-12 h-1 bg-slate-900 dark:bg-white rounded-full opacity-20"></div>
                    </div>

                    {/* Right Side: content */}
                    <div className="p-10 md:w-3/5">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">About this Service</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-lg">
                            {service.desc}
                        </p>

                        <h4 className="font-bold text-slate-900 dark:text-white mb-4">Key Features</h4>
                        <ul className="space-y-3 mb-8">
                            {['Custom Tailored Solutions', '24/7 Expert Support', 'Scalable Architecture', 'Seamless Integration'].map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                    <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                            <p className="text-xs text-slate-500 mb-4 italic">
                                Note: Pricing may vary based on specific requirements. Check our packages for standard rates.
                            </p>
                            <button
                                onClick={onBook}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] active:scale-95"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>,
        document.body
    );
};

export default ServiceDetailModal;
