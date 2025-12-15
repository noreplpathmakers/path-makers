import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';
import SpotlightCard from '../../components/ui/SpotlightCard';
import { API_URL } from '../../utils/api';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '', services: [] });
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
            alert('Failed to submit message.  try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-20 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
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
                            <ContactInfoItem icon={<Phone />} title="Phone" value="+91 1234567809" delay={0.1} />
                            <ContactInfoItem icon={<Mail />} title="Email" value="hello@pathmakers.tech" delay={0.2} />
                        </div>
                    </div>

                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <SpotlightCard className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800 p-8 md:p-10" spotlightColor="rgba(59, 130, 246, 0.1)">
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
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <InputField label="Name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                                        <InputField label="Email (Optional)" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required />
                                        <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Inquiry" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Service of Interest</label>
                                        <div className="flex flex-wrap gap-2">
                                            {['Web Dev', 'App Dev', 'AI Solutions', 'Academic', 'Other'].map((opt) => (
                                                <button
                                                    type="button"
                                                    key={opt}
                                                    onClick={() => toggleService(opt)}
                                                    className={`py-2 px-4 rounded-full text-sm font-medium transition-all border ${formData.services.includes(opt)
                                                        ? 'bg-blue-600 text-white border-blue-600'
                                                        : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-500 hover:text-blue-500'}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                            <input type="hidden" required value={formData.services.length > 0 ? 'valid' : ''} />
                                        </div>
                                        {formData.services.length === 0 && <p className="text-xs text-slate-400 italic">Select at least one</p>}
                                    </div>

                                    <div className="space-y-2">
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
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-lg text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : <>Transmit <Send size={18} /></>}
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
        className="flex items-center gap-6"
    >
        <div className="w-14 h-14 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-500 shadow-sm">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
            <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{title}</div>
            <div className="text-xl font-bold text-slate-900 dark:text-white">{value}</div>
        </div>
    </motion.div>
);

const InputField = ({ label, name, type = "text", value, onChange, placeholder, required = false }) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400"
            placeholder={placeholder}
            required={required}
        />
    </div>
);

export default Contact;
