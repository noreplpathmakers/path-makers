import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Plus, X, Lock, Activity, CheckCircle, Clock, Shield, Trash2, Edit } from 'lucide-react';
import { API_URL } from '../../utils/api';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [activeTab, setActiveTab] = useState('admin');

    // Add Form State
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'employee' });

    // Edit Form State
    const [editFormData, setEditFormData] = useState({ id: '', name: '', email: '', role: '', is_active: true });

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [passwordData, setPasswordData] = useState({ newPassword: '' });
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/admin/employees`, {
                headers: { 'x-auth-token': token }
            });
            if (res.ok) {
                const data = await res.json();
                setEmployees(data);
            }
        } catch (err) {
            console.error("Failed to fetch employees", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/admin/employees`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                await fetchEmployees();
                setShowModal(false);
                setFormData({ name: '', email: '', password: '', role: 'employee' });
            } else {
                alert('Failed to add employee');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleEditEmployee = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/admin/employees/${editFormData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify(editFormData)
            });

            if (res.ok) {
                await fetchEmployees();
                setShowEditModal(false);
            } else {
                alert('Failed to update employee');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDeleteEmployee = async (id) => {
        if (!window.confirm('Are you sure you want to remove this team member?')) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/admin/employees/${id}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token }
            });

            if (res.ok) {
                await fetchEmployees();
            } else {
                const data = await res.json();
                alert(data.msg || 'Failed to delete employee');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const openEditModal = (emp) => {
        setEditFormData({
            id: emp.id,
            name: emp.name,
            email: emp.email,
            role: emp.role,
            is_active: emp.is_active
        });
        setShowEditModal(true);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/admin/password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ userId: selectedEmployee.id, newPassword: passwordData.newPassword })
            });

            if (res.ok) {
                alert('Password updated successfully');
                setShowPasswordModal(false);
                setPasswordData({ newPassword: '' });
                setSelectedEmployee(null);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitLoading(false);
        }
    };

    if (loading) return <div className="h-full flex items-center justify-center min-h-[500px]"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>;

    return (
        <div className="p-4 md:p-8 relative">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Team Management</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                >
                    <Plus size={18} /> Add Member
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8">
                <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'admin' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-600 ring-offset-2' : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}`}
                >
                    Admins
                </button>
                <button
                    onClick={() => setActiveTab('employee')}
                    className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'employee' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-600 ring-offset-2' : 'bg-white text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}`}
                >
                    Employees
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {employees.filter(emp => emp.role === activeTab).map((emp, index) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            layout
                            key={emp.id}
                            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex flex-col"
                        >
                            {/* Top Status Bar */}
                            <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                                {emp.is_active ?
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Active
                                    </span>
                                    :
                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Inactive
                                    </span>
                                }
                                <div className="flex gap-2 opacity-100 transition-opacity">
                                    <button onClick={() => openEditModal(emp)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit">
                                        <Edit size={14} />
                                    </button>
                                    <button onClick={() => handleDeleteEmployee(emp.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Profile Section */}
                            <div className="p-6 flex flex-col items-center text-center">
                                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg mb-4 ${emp.role === 'admin' ? 'bg-gradient-to-br from-slate-700 to-slate-900 shadow-slate-500/20' : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/20'
                                    }`}>
                                    {emp.name.charAt(0)}
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    {emp.name}
                                    {emp.role === 'admin' && <Shield size={16} className="text-slate-400" />}
                                </h3>
                                <p className="text-slate-500 text-sm font-medium mb-3">{emp.email}</p>
                            </div>

                            {/* Stats */}
                            <div className="px-6 pb-6 pt-0 space-y-3 flex-1">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Ongoing</div>
                                        <div className="text-lg font-bold text-amber-500">{emp.ongoing_count || 0}</div>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Completed</div>
                                        <div className="text-lg font-bold text-emerald-600">{emp.completed_count || 0}</div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs text-slate-400 font-medium px-2">
                                    <span>Last Login:</span>
                                    <span className="font-mono text-slate-600">{emp.last_login_at ? new Date(emp.last_login_at).toLocaleDateString() : 'Never'}</span>
                                </div>
                            </div>

                            {/* Footer Action */}
                            <div className="p-4 border-t border-slate-100 bg-slate-50/30">
                                <button
                                    onClick={() => { setSelectedEmployee(emp); setShowPasswordModal(true); }}
                                    className="w-full py-2.5 bg-white border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 text-slate-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <Lock size={14} /> Reset Password
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Add Employee Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-slate-100 p-8 rounded-3xl w-full max-w-md shadow-2xl relative"
                        >
                            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 p-1 rounded-full">
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-extrabold mb-6 text-slate-800">Add Team Member</h2>

                            <form onSubmit={handleAddEmployee} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                                    <input
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        placeholder="john@pathmakers.tech"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Password</label>
                                    <input
                                        required
                                        type="password"
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                                    >
                                        <option value="employee">Employee</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all mt-4 flex justify-center shadow-lg shadow-indigo-500/20 active:scale-95"
                                >
                                    {submitLoading ? <Loader2 className="animate-spin" /> : 'Create Account'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Edit Employee Modal */}
            <AnimatePresence>
                {showEditModal && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-slate-100 p-8 rounded-3xl w-full max-w-md shadow-2xl relative"
                        >
                            <button onClick={() => setShowEditModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 p-1 rounded-full">
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-extrabold mb-6 text-slate-800">Edit Team Member</h2>
                            <form onSubmit={handleEditEmployee} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                                    <input required type="text" value={editFormData.name} onChange={e => setEditFormData({ ...editFormData, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                                    <input required type="email" value={editFormData.email} onChange={e => setEditFormData({ ...editFormData, email: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role</label>
                                    <select value={editFormData.role} onChange={e => setEditFormData({ ...editFormData, role: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold">
                                        <option value="employee">Employee</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input
                                            type="checkbox"
                                            name="toggle"
                                            id="toggle"
                                            checked={editFormData.is_active}
                                            onChange={e => setEditFormData({ ...editFormData, is_active: e.target.checked })}
                                            className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-5"
                                            style={{ right: editFormData.is_active ? '0' : 'auto' }}
                                        />
                                        <label htmlFor="toggle" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${editFormData.is_active ? 'bg-indigo-500' : 'bg-slate-300'}`}></label>
                                    </div>
                                    <label htmlFor="toggle" className="text-sm font-bold text-slate-700">Active Account Status</label>
                                </div>

                                <button type="submit" disabled={submitLoading} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all mt-4 flex justify-center shadow-lg shadow-indigo-500/20 active:scale-95">
                                    {submitLoading ? <Loader2 className="animate-spin" size={16} /> : 'Save Changes'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Password Reset Modal */}
            <AnimatePresence>
                {showPasswordModal && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-slate-100 p-8 rounded-3xl w-full max-w-sm shadow-2xl relative"
                        >
                            <button onClick={() => setShowPasswordModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 p-1 rounded-full">
                                <X size={20} />
                            </button>
                            <h2 className="text-xl font-extrabold mb-2 text-slate-800">Reset Password</h2>
                            <p className="text-slate-500 text-sm mb-6">Enter new password for <span className="text-indigo-600 font-bold">{selectedEmployee?.name}</span></p>

                            <form onSubmit={handlePasswordReset} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">New Password</label>
                                    <input
                                        required
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all mt-4 flex justify-center shadow-lg shadow-indigo-500/20 active:scale-95"
                                >
                                    {submitLoading ? <Loader2 className="animate-spin" /> : 'Update Password'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Employees;
