import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';
import SpotlightCard from '../../components/ui/SpotlightCard';
import { API_URL } from '../../utils/api';

import { Helmet } from 'react-helmet-async';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', services: [] });
    // ... hooks ...
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const toggleService = (service) => {
        setFormData(prev => {
            const exists = prev.services.includes(service);
            return {
                ...prev,
                services: exists ? prev.services.filter(s => s !== service) : [...prev.services, service]
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setIsSuccess(false);

        try {
            const res = await fetch(`${API_URL}/public/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.msg || 'Submission failed');

            setIsSuccess(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '', services: [] });
            setTimeout(() => setIsSuccess(false), 8000);
        } catch (err) {
            console.error(err);
            alert('Failed to submit message.please  try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-20 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
            <Helmet>
                <title>Contact Us | PathMakers - Let's Build the Future</title>
                <meta name="description" content="Get in touch with PathMakers. Request a quote, discuss your project, or ask about our services. We are ready to build your vision." />
                <meta name="keywords" content="Contact PathMakers, hire developers, project inquiry, get a quote" />
                <link rel="canonical" href="https://path-makers.vercel.app/contact" />
            </Helmet>
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-100"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none opacity-50 dark:opacity-100"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Info Section - Sticky on Desktop */}
                    <div className="space-y-12 md:sticky md:top-28 md:h-fit self-start">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-500">Let's Build the Future</h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                                Ready to transform your ideas into reality? Reach out and let's discuss how we can elevate your business.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            <ContactInfoItem icon={<Phone />} title="Phone" value="+91 7200754566" delay={0.1} />
                            <ContactInfoItem icon={<Mail />} title="Email" value="noreply.pathmakers@gmail.com" delay={0.2} />
                        </div>
                    </div>

                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <SpotlightCard className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 p-5 md:p-10" spotlightColor="rgba(59, 130, 246, 0.1)">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-slate-900 dark:text-white">
                                <div className="w-2 h-8 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                                Send Message
                            </h3>

                            {isSuccess ? (
                                <div className="h-96 flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-500 mb-6 animate-bounce">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Received!</h4>
                                    <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                                        Thanks for reaching out! our PathMakers team will contact you within 2 working days.
                                    </p>
                                    <button onClick={() => setIsSuccess(false)} className="mt-8 text-blue-600 dark:text-blue-500 font-bold hover:underline">Send another</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-6">
                                        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <InputField label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                                                <InputField label="Email (Optional)" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                                            </div>
                                        </motion.div>

                                        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
                                                <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Inquiry" />
                                            </div>
                                        </motion.div>

                                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-2">
                                            <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Service of Interest</label>
                                            <div className="flex flex-wrap gap-2">
                                                {['Web Dev', 'App Dev', 'AI Solutions', 'Academic', 'Other'].map((opt) => (
                                                    <button
                                                        type="button"
                                                        key={opt}
                                                        onClick={() => toggleService(opt)}
                                                        className={`py-2 px-4 rounded-full text-sm font-medium transition-all border ${formData.services.includes(opt)
                                                            ? 'bg-blue-600 text-white border-blue-600 scale-105 shadow-md'
                                                            : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-500'}`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                                <input type="hidden" required value={formData.services.length > 0 ? 'valid' : ''} />
                                            </div>
                                            {formData.services.length === 0 && <p className="text-xs text-slate-400 italic">Select at least one</p>}
                                        </motion.div>

                                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="space-y-2">
                                            <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Message</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows="4"
                                                className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400"
                                                placeholder="Tell us about your next big thing..."
                                                required
                                            ></textarea>
                                        </motion.div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-purple-500/40 transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                        <span className="relative z-10 flex items-center gap-2">Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                                    </motion.button>
                                </form>
                            )}
                        </SpotlightCard>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};


const ContactInfoItem = ({ icon, title, value, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className="flex items-center gap-4 md:gap-6"
    >
        <div className="w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-500 shadow-sm flex-shrink-0">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div className="min-w-0">
            <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{title}</div>
            <div className="text-lg md:text-xl font-bold text-slate-900 dark:text-white break-all">{value}</div>
        </div>
    </motion.div>
);

const InputField = ({ label, type = "text", name, value, onChange, placeholder, required = false }) => (
    <div className="space-y-2 group">
        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1 group-focus-within:text-blue-500 transition-colors">{label}</label>
        <div className="relative">
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-0 transition-all placeholder:text-slate-400 relative z-10"
                placeholder={placeholder}
                required={required}
            />
            {/* Animated Border Line */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-focus-within:w-full z-20"></div>
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
        </div>
    </div>
);

export default Contact;
