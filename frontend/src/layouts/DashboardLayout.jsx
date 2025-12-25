import React, { useState } from 'react';
import { Navigate, Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, LogOut, Menu, X, ChevronRight, Lock, Loader2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../utils/api';

const DashboardLayout = ({ role }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Password Change State
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordData, setPasswordData] = useState({ newPassword: '' });
    const [submitLoading, setSubmitLoading] = useState(false);

    if (!localStorage.getItem('token')) {
        return <Navigate to="/admin/login" />;
    }

    if (role && user?.role !== role) {
        return <Navigate to="/admin/login" />;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/admin/login');
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/admin/password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ userId: user.id, newPassword: passwordData.newPassword })
            });

            if (res.ok) {
                alert('Your password has been updated successfully.');
                setShowPasswordModal(false);
                setPasswordData({ newPassword: '' });
            } else {
                alert('Failed to update password.');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred.');
        } finally {
            setSubmitLoading(false);
        }
    };

    const navItems = user?.role === 'admin' ? [
        { icon: <LayoutDashboard size={20} />, label: "Overview", path: "/admin/dashboard" },
        { icon: <MessageSquare size={20} />, label: "Requests", path: "/admin/requests" },
        { icon: <Mail size={20} />, label: "Messages", path: "/admin/messages" },
        { icon: <Users size={20} />, label: "Team", path: "/admin/employees" },
        { icon: <Users size={20} />, label: "Clients", path: "/admin/clients" },
    ] : [
        { icon: <LayoutDashboard size={20} />, label: "My Work Station", path: "/employee/dashboard" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500/30">
            {/* Mobile Header / Toggle */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md z-40 px-4 flex items-center justify-between border-b border-slate-200 shadow-sm">
                <div className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">PathMakers</div>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600 hover:text-indigo-600 transition-colors">
                    {isSidebarOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar (Fixed on Desktop) */}
            <aside className={`
                fixed inset-y-0 left-0 z-50
                w-64 bg-white border-r border-slate-200 shadow-2xl md:shadow-none
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                flex flex-col h-full
            `}>
                <div className="p-6 mb-4 hidden md:flex items-center gap-3">
                    <img src="/logo.png" alt="PathMakers" className="w-10 h-10 object-contain" />
                    <span className="font-bold text-xl tracking-tight text-slate-800">PathMakers</span>
                </div>

                <div className="px-4 mb-2 md:hidden pt-20">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Navigation</div>
                </div>

                <nav className="space-y-1 px-3 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative overflow-hidden
                                ${location.pathname === item.path
                                    ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm ring-1 ring-indigo-200'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600 font-medium'
                                }
                            `}
                        >
                            {location.pathname === item.path && (
                                <motion.div layoutId="activeNav" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full" />
                            )}
                            <div className={`${location.pathname === item.path ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500'}`}>
                                {item.icon}
                            </div>
                            <span>{item.label}</span>
                            {location.pathname === item.path && <ChevronRight size={16} className="ml-auto opacity-50" />}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3 mb-4 p-2 rounded-lg bg-white border border-slate-200 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-sm font-bold text-slate-800 truncate">{user?.name}</div>
                            <div className="text-xs text-indigo-500 font-bold uppercase tracking-wide">
                                {user?.role === 'employee' ? 'Team Member' : user?.role}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setShowPasswordModal(true)}
                            className="w-full py-2 px-3 bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                            title="Change Password"
                        >
                            <Lock size={14} /> Pass
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full py-2 px-3 bg-white border border-slate-200 text-slate-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                            <LogOut size={14} /> Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div onClick={() => setIsSidebarOpen(false)} className="md:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" />
            )}

            {/* Main Content */}
            <main className="md:ml-64 min-h-screen pt-16 md:pt-0 bg-slate-50">
                <Outlet />
            </main>

            {/* Change Password Modal */}
            <AnimatePresence>
                {showPasswordModal && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-slate-100 p-8 rounded-3xl w-full max-w-sm shadow-2xl relative"
                        >
                            <button onClick={() => setShowPasswordModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 p-1 rounded-full">
                                <X size={20} />
                            </button>
                            <h2 className="text-xl font-extrabold mb-2 text-slate-800">Change Password</h2>
                            <p className="text-slate-500 text-sm mb-6">Enter a new secure password for your account.</p>

                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">New Password</label>
                                    <input
                                        required
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all mt-4 flex justify-center shadow-lg shadow-indigo-500/20 active:scale-95"
                                >
                                    {submitLoading ? <Loader2 className="animate-spin" /> : 'Update My Password'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardLayout;
