import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Loader2, CheckCircle, Download } from 'lucide-react';
import { API_URL } from '../../utils/api';
import { generateReceipt } from '../../utils/ReceiptGenerator';
import { useScrollLock } from '../hooks/useScrollLock';

const BookingModal = ({ service, onClose }) => {
    useScrollLock();

    const [step, setStep] = useState(1); // 1: Contact, 2: Address, 3: Project, 4: Review, 5: Success
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        org_name: '',
        phone: '',
        email: '',
        address_door: '',
        address_city: '',
        address_district: '',
        address_state: '',
        address_pincode: '',
        description: '',
        expected_date: '',
        attachment: null
    });

    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else if (name === 'address_pincode') {
            const numericValue = value.replace(/[^0-9]/g, '').slice(0, 6);
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) {
            alert("File size exceeds 5MB");
            return;
        }
        if (file && file.type !== 'application/pdf') {
            alert("Only PDF files are allowed");
            return;
        }
        setFormData(prev => ({ ...prev, attachment: file }));
    };

    const validateStep = (currentStep) => {
        switch (currentStep) {
            case 1: // Contact
                if (!formData.name.trim()) { alert("Name is required"); return false; }
                if (!/^\d{10}$/.test(formData.phone)) { alert("Valid 10-digit phone number is required"); return false; }
                return true;
            case 2: // Address (Optional, but validate pincode if entered)
                if (formData.address_pincode && !/^\d{6}$/.test(formData.address_pincode)) { alert("Valid 6-digit Pincode is required"); return false; }
                return true;
            case 3: // Project
                if (!formData.description.trim()) { alert("Project description is required"); return false; }
                return true;
            case 4: // Review
                if (!acceptedTerms) { alert("Please accept the Terms & Conditions"); return false; }
                return true;
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (e) => {
        // e is optional since we call this manually now
        if (e) e.preventDefault();

        if (!validateStep(4)) return;

        setLoading(true);
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) data.append(key, formData[key]);
        });
        data.append('service_code', service.code);

        try {
            const res = await fetch(`${API_URL}/public/contact`, {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            if (res.ok) {
                setResponse(result);
                setStep(5);
            } else {
                alert(result.msg || "Failed to submit request");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Step Titles
    const stepTitles = ["Contact Details", "Location Info", "Project Scope", "Review & Confirm"];

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
                    className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 relative my-8 overflow-hidden"
                >
                    {/* Header with Progress */}
                    {step < 5 && (
                        <div className="bg-slate-50 dark:bg-slate-950 p-6 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <span className="text-blue-500 font-bold uppercase tracking-widest text-[10px]">Step {step} of 4</span>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{stepTitles[step - 1]}</h2>
                                </div>
                                <button onClick={onClose} className="p-2 bg-white dark:bg-slate-900 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors border border-slate-200 dark:border-slate-800">
                                    <X size={18} />
                                </button>
                            </div>
                            {/* Progress Bar */}
                            <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-blue-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(step / 4) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                ></motion.div>
                            </div>
                        </div>
                    )}

                    {/* Step Content */}
                    <div className="p-6 md:p-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center text-blue-600 dark:text-white font-bold text-lg">
                                                1
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">Let's start with the basics.</p>
                                                <p className="text-xs text-slate-500">We need these to contact you.</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <InputField label="Full Name *" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" autoFocus />
                                            <InputField label="Phone Number *" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" type="tel" />
                                            <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com (Optional)" type="email" />
                                            <InputField label="Organization" name="org_name" value={formData.org_name} onChange={handleChange} placeholder="Company Name (Optional)" />
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center text-purple-600 dark:text-white font-bold text-lg">
                                                2
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">Where are you located?</p>
                                                <p className="text-xs text-slate-500">This helps us plan logistics if needed.</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField label="Door No / Street" name="address_door" value={formData.address_door} onChange={handleChange} placeholder="123, Street" />
                                            <InputField label="City" name="address_city" value={formData.address_city} onChange={handleChange} placeholder="City Name" />
                                            <InputField label="District" name="address_district" value={formData.address_district} onChange={handleChange} placeholder="District" />
                                            <InputField label="State" name="address_state" value={formData.address_state} onChange={handleChange} placeholder="State" />
                                            <div className="col-span-2">
                                                <InputField label="Pincode" name="address_pincode" value={formData.address_pincode} onChange={handleChange} placeholder="6-digit ZIP" maxLength={6} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-6">
                                        <div className="bg-pink-50 dark:bg-pink-900/10 p-4 rounded-xl flex items-center gap-3">
                                            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-800 rounded-full flex items-center justify-center text-pink-600 dark:text-white font-bold text-lg">
                                                3
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">Tell us about the project.</p>
                                                <p className="text-xs text-slate-500">Be as specific as you can!</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Requirement Description *</label>
                                            <textarea
                                                name="description"
                                                autoFocus
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows="5"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                                placeholder="I need a website for my business..."
                                            ></textarea>
                                        </div>
                                        <InputField label="Expected Date" name="expected_date" value={formData.expected_date} onChange={handleChange} type="date" />

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Attachment (PDF &lt; 5MB)</label>
                                            <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative">
                                                <input type="file" accept="application/pdf" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                                                    <Upload size={20} />
                                                </div>
                                                <div className="flex-grow min-w-0">
                                                    <p className="text-sm font-bold text-slate-700 dark:text-white truncate">
                                                        {formData.attachment ? formData.attachment.name : "Upload Document"}
                                                    </p>
                                                    <p className="text-xs text-slate-400">Optional</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-6">
                                        <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl text-center">
                                            <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-1">Almost Done!</h3>
                                            <p className="text-xs text-slate-500">Please review your details before submitting.</p>
                                        </div>

                                        <div className="space-y-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Name:</span>
                                                <span className="font-bold text-slate-900 dark:text-white">{formData.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Phone:</span>
                                                <span className="font-bold text-slate-900 dark:text-white">{formData.phone}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-500">Service:</span>
                                                <span className="font-bold text-blue-500">{service.name}</span>
                                            </div>
                                            <div className="border-t border-slate-200 dark:border-slate-700 my-2 pt-2">
                                                <span className="text-slate-500 block mb-1">Description:</span>
                                                <p className="font-medium text-slate-900 dark:text-white line-clamp-3 italic">"{formData.description}"</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                checked={acceptedTerms}
                                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                                className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                            />
                                            <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                                                I agree to the <a href="/terms" target="_blank" className="text-blue-600 font-bold hover:underline" onClick={e => e.stopPropagation()}>Terms</a> & <a href="/privacy" target="_blank" className="text-blue-600 font-bold hover:underline" onClick={e => e.stopPropagation()}>Privacy Policy</a>.
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {step === 5 && (
                                    <div className="p-8 text-center flex flex-col items-center justify-center">
                                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-500 mb-6">
                                            <CheckCircle size={48} />
                                        </motion.div>
                                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Request Sent!</h2>
                                        <p className="text-slate-500 max-w-md mx-auto mb-8 text-sm">
                                            ID: <span className="font-mono text-blue-500 font-bold bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">{response?.unique_id}</span><br />
                                            We'll call you at {formData.phone} soon.
                                        </p>

                                        <div className="flex flex-col gap-3 w-full">
                                            <button
                                                onClick={() => generateReceipt({ ...response, message: formData.description })}
                                                className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                            >
                                                <Download size={20} /> Download Receipt
                                            </button>
                                            <button onClick={onClose} className="w-full py-3 border border-slate-200 dark:border-slate-700 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer Controls */}
                    {step < 5 && (
                        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 flex gap-4">
                            {step > 1 && (
                                <button
                                    onClick={handleBack}
                                    className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                onClick={step === 4 ? handleSubmit : handleNext}
                                disabled={loading}
                                className="flex-grow py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : (step === 4 ? 'Confirm & Submit' : 'Next Step')}
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>,
        document.body
    );
};

const InputField = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{label}</label>
        <input
            {...props}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
        />
    </div>
);

export default BookingModal;
