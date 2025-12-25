import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Mail, Phone, Calendar, ArrowUpRight, Filter, Search, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../../utils/api';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter State
    const [filters, setFilters] = useState({
        name: '',
        status: '',
        service: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        fetchMessages();
    }, []); // Initial load

    const fetchMessages = async () => {
        const queryParams = new URLSearchParams(filters).toString();
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/admin/messages?${queryParams}`, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const resetFilters = () => {
        setFilters({ name: '', status: '', service: '', startDate: '', endDate: '' });
        // We trigger fetch immediately after reset logic needs to be handled:
        // Because setState is async, we can't just call fetchMessages() immediately with new state.
        // Better to allow user to click "Apply" or "Search", or use useEffect dependent on filters (debounce might be needed).
        // Let's stick to "Search" button for clarity and performance.
    };

    return (
        <div className="p-6 md:p-10 min-h-screen">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Messages & Inquiries</h1>

            {/* Filters Bar */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-8">
                <div className="flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[200px]">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Search Name</label>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                name="name"
                                value={filters.name}
                                onChange={handleFilterChange}
                                placeholder="Client Name..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Status</label>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none min-w-[140px]"
                        >
                            <option value="">All Statuses</option>
                            <option value="New">New</option>
                            <option value="Read">Read</option>
                            <option value="Replied">Replied</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Service Interest</label>
                        <input
                            type="text"
                            name="service"
                            value={filters.service}
                            onChange={handleFilterChange}
                            placeholder="e.g. Web Dev"
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Date Range</label>
                        <div className="flex gap-2">
                            <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm outline-none" />
                            <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm outline-none" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={fetchMessages}
                            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-500/20"
                        >
                            <Filter size={16} /> Filter
                        </button>
                        <button
                            onClick={() => { setFilters({ name: '', status: '', service: '', startDate: '', endDate: '' }); fetchMessages(); }}
                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-slate-100 dark:bg-slate-800 rounded-xl"
                            title="Reset Filters"
                        >
                            <RotateCcw size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-indigo-500" size={32} /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {messages.length === 0 ? (
                        <div className="col-span-full text-center text-slate-400 py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200">
                            No messages found matching your filters.
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-shadow group h-full flex flex-col"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${msg.status === 'New' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-slate-100 text-slate-500'}`}>
                                        {msg.status}
                                    </span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1 line-clamp-1">{msg.subject || 'No Subject'}</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(JSON.parse(msg.services || '[]') || []).map((s, i) => (
                                        <span key={i} className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md">
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-4 flex-1">
                                    {msg.message}
                                </p>

                                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-2 mt-auto">
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                                            {msg.name.charAt(0)}
                                        </div>
                                        {msg.name}
                                    </div>
                                    <div className="flex flex-col gap-1 pl-10 text-xs text-slate-500">
                                        <div className="flex items-center gap-2"><Phone size={12} /> {msg.phone}</div>
                                        {msg.email && <div className="flex items-center gap-2"><Mail size={12} /> {msg.email}</div>}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Messages;
