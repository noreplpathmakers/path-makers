import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle, Clock, PlayCircle, FileText, Code, Database, Globe, Mail, DollarSign, TrendingUp, Calendar, ExternalLink, MessageSquare, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../../utils/api';

const EmployeeDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    // Submission State
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [submissionData, setSubmissionData] = useState({ github: '', hosted: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const [tasksRes, statsRes] = await Promise.all([
                fetch(`${API_URL}/employee/tasks`, { headers: { 'x-auth-token': token } }),
                fetch(`${API_URL}/employee/analytics`, { headers: { 'x-auth-token': token } })
            ]);

            if (tasksRes.ok) setTasks(await tasksRes.json());
            if (statsRes.ok) setStats(await statsRes.json());
        } catch (err) {
            console.error("Failed to fetch dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (taskId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/employee/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ taskId, status: newStatus })
            });

            if (res.ok) {
                setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
                fetchData(); // Refresh stats
            }
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const openSubmitModal = (task) => {
        setSelectedTask(task);
        setSubmissionData({ github: task.github_link || '', hosted: task.hosted_link || '' });
        setShowSubmitModal(true);
    };

    const handleSubmitReview = async () => {
        if (!submissionData.github) return alert('GitHub Link is required');
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/employee/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({
                    taskId: selectedTask.id,
                    status: 'Under Review',
                    githubLink: submissionData.github,
                    hostedLink: submissionData.hosted
                })
            });

            if (res.ok) {
                setTasks(tasks.map(t => t.id === selectedTask.id ? { ...t, status: 'Under Review', github_link: submissionData.github, hosted_link: submissionData.hosted } : t));
                setShowSubmitModal(false);
                setSelectedTask(null);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="h-full flex items-center justify-center min-h-[500px]"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>;

    // Calculate chart percentages
    const totalPayment = (stats?.payments?.paid || 0) + (stats?.payments?.pending || 0);
    const paidPercent = totalPayment > 0 ? ((stats?.payments?.paid || 0) / totalPayment) * 100 : 0;
    const pendingPercent = totalPayment > 0 ? ((stats?.payments?.pending || 0) / totalPayment) * 100 : 0;

    return (
        <div className="p-4 md:p-8 space-y-8 relative">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">My Work Station</h1>
                <p className="text-slate-500 font-medium">Welcome back, Team Member! Here's your performance overview.</p>
            </header>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Active Projects */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-blue-600">
                        <Clock size={80} />
                    </div>
                    <div>
                        <div className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Active Projects</div>
                        <div className="text-4xl font-black text-slate-800">{stats?.active_projects || 0}</div>
                        <div className="text-xs font-bold text-blue-500 mt-2 flex items-center gap-1"><PlayCircle size={10} /> In Progress</div>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 relative z-10 shadow-inner">
                        <Clock size={24} />
                    </div>
                </motion.div>

                {/* Completed Projects */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity text-green-600">
                        <CheckCircle size={80} />
                    </div>
                    <div>
                        <div className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">Completed</div>
                        <div className="text-4xl font-black text-slate-800">{stats?.completed_projects || 0}</div>
                        <div className="text-xs font-bold text-green-500 mt-2 flex items-center gap-1"><TrendingUp size={10} /> Success Rate</div>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 relative z-10 shadow-inner">
                        <CheckCircle size={24} />
                    </div>
                </motion.div>

                {/* Payment Analytics Graph */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-slate-500 font-bold text-xs uppercase tracking-wider">Earnings Overview</div>
                        <DollarSign size={20} className="text-indigo-400" />
                    </div>

                    <div className="flex h-4 bg-slate-100 rounded-full overflow-hidden mb-4 relative group">
                        <div style={{ width: `${paidPercent}%` }} className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-1000"></div>
                        <div style={{ width: `${pendingPercent}%` }} className="h-full bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-1000"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-xs font-bold text-slate-400 uppercase">Paid</span>
                            </div>
                            <div className="text-xl font-bold text-slate-800">${stats?.payments?.paid?.toFixed(2) || '0.00'}</div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-2 justify-end mb-1">
                                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                <span className="text-xs font-bold text-slate-400 uppercase">Pending</span>
                            </div>
                            <div className="text-xl font-bold text-slate-800">${stats?.payments?.pending?.toFixed(2) || '0.00'}</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* My Projects Feed */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Code className="text-indigo-600" /> Assigned Projects
                    </h2>
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-indigo-200">{tasks.length} Total</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {tasks.map((task) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white md:p-8 p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-indigo-100 transition-all group"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <span className="font-mono text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">{task.unique_id}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${task.status === 'Completed' || task.status === 'Accepted' ? 'bg-green-50 text-green-600 border-green-100' :
                                            task.status === 'Ongoing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                task.status === 'Under Review' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                    task.status === 'Changes Requested' ? 'bg-red-50 text-red-600 border-red-100' :
                                                        'bg-slate-100 text-slate-600 border-slate-200'
                                            }`}>
                                            {task.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{task.client_name}'s Project</h3>
                                </div>
                                {task.quoted_price && (
                                    <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 shadow-sm text-slate-600 font-mono font-bold text-sm">
                                        {task.quoted_price}
                                    </div>
                                )}
                            </div>

                            {/* Details Grid */}
                            <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 mb-6 grid gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                                        <Mail size={14} />
                                    </div>
                                    <span className="text-sm font-medium text-slate-600">{task.client_email}</span>
                                </div>

                                <div className="space-y-3 pt-3 border-t border-slate-200/50">
                                    {(task.tech_stack_frontend || task.tech_stack_backend) && (
                                        <div className="flex flex-wrap gap-2">
                                            {task.tech_stack_frontend && <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-blue-100 text-blue-600 rounded-lg text-xs font-bold shadow-sm"><Globe size={10} /> {task.tech_stack_frontend}</span>}
                                            {task.tech_stack_backend && <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-purple-100 text-purple-600 rounded-lg text-xs font-bold shadow-sm"><Code size={10} /> {task.tech_stack_backend}</span>}
                                            {task.tech_stack_db && <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-green-100 text-green-600 rounded-lg text-xs font-bold shadow-sm"><Database size={10} /> {task.tech_stack_db}</span>}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Commands */}
                            {task.admin_commands && (
                                <div className="mb-6 bg-indigo-50/50 rounded-xl p-4 border-l-4 border-indigo-500">
                                    <h4 className="text-xs font-extrabold text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <FileText size={12} /> Instructions
                                    </h4>
                                    <p className="text-indigo-800/80 text-sm leading-relaxed font-medium">{task.admin_commands}</p>
                                </div>
                            )}

                            {/* Admin Feedback for Rejection */}
                            {task.status === 'Changes Requested' && task.admin_review_message && (
                                <div className="mb-6 bg-red-50/50 rounded-xl p-4 border-l-4 border-red-500">
                                    <h4 className="text-xs font-extrabold text-red-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <AlertCircle size={12} /> Revisions Needed
                                    </h4>
                                    <p className="text-red-800/80 text-sm leading-relaxed font-medium">{task.admin_review_message}</p>
                                </div>
                            )}

                            {/* Footer Actions */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                                <div className="flex gap-4">
                                    {task.attachment_path && (
                                        <a href={`${API_URL}/${task.attachment_path}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-sm font-bold transition-colors">
                                            <FileText size={16} /> Docs
                                        </a>
                                    )}
                                    {task.admin_expected_date && (
                                        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                            <Calendar size={16} /> Due: <span className="text-slate-600 font-bold">{new Date(task.admin_expected_date).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    {task.status === 'Confirmed' && (
                                        <button onClick={() => updateStatus(task.id, 'Ongoing')} className="flex-1 sm:flex-none px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                                            <PlayCircle size={16} /> Start
                                        </button>
                                    )}
                                    {(task.status === 'Ongoing' || task.status === 'Changes Requested') && (
                                        <button onClick={() => openSubmitModal(task)} className="flex-1 sm:flex-none px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                                            <ExternalLink size={16} /> {task.status === 'Changes Requested' ? 'Submit Again' : 'Submit for Review'}
                                        </button>
                                    )}
                                    {task.status === 'Under Review' && (
                                        <span className="px-4 py-2 bg-amber-50 text-amber-600 rounded-xl font-bold text-sm border border-amber-100 flex items-center gap-2">
                                            <Clock size={16} /> Under Review
                                        </span>
                                    )}
                                    {(task.status === 'Accepted' || task.status === 'Completed') && (
                                        <span className="px-4 py-2 bg-green-50 text-green-600 rounded-xl font-bold text-sm border border-green-100 flex items-center gap-2">
                                            <CheckCircle size={16} /> Accepted
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Submission Modal */}
            <AnimatePresence>
                {showSubmitModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
                        >
                            <h2 className="text-xl font-bold text-slate-800 mb-6">Submit Project for Review</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">GitHub Repository Link <span className="text-red-500">*</span></label>
                                    <input
                                        type="url"
                                        value={submissionData.github}
                                        onChange={e => setSubmissionData({ ...submissionData, github: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Hosted Link (Optional)</label>
                                    <input
                                        type="url"
                                        value={submissionData.hosted}
                                        onChange={e => setSubmissionData({ ...submissionData, hosted: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <button
                                    onClick={() => setShowSubmitModal(false)}
                                    className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitReview}
                                    disabled={submitting}
                                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all flex items-center justify-center"
                                >
                                    {submitting ? <Loader2 className="animate-spin" /> : 'Submit'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EmployeeDashboard;
