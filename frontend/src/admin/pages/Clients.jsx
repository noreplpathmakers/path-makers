import React, { useEffect, useState } from 'react';
import { Loader2, Search, Phone, Mail, ChevronDown, ChevronUp, Plus, Edit, Trash2, X, MapPin, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_URL } from '../../utils/api';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedClient, setExpandedClient] = useState(null);

    // Form State
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ id: '', name: '', email: '', phone: '', organization_name: '', address_city: '', address_state: '' });
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/admin/clients`, {
                headers: { 'x-auth-token': token }
            });
            if (res.ok) setClients(await res.json());
        } catch (err) {
            console.error("Failed to fetch clients", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (clientId) => {
        setExpandedClient(expandedClient === clientId ? null : clientId);
    };

    const handleCreateClick = () => {
        setFormData({ id: '', name: '', email: '', phone: '', organization_name: '', address_city: '', address_state: '' });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEditClick = (client) => {
        setFormData({
            id: client.id,
            name: client.name,
            email: client.email || '',
            phone: client.phone || '',
            organization_name: client.organization_name || '',
            address_city: client.address_city || '',
            address_state: client.address_state || ''
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDeleteClick = async (id) => {
        if (!window.confirm("Are you sure you want to remove this client? This action cannot be undone and might affect linked projects.")) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/admin/clients/${id}`, {
                method: 'DELETE',
                headers: { 'x-auth-token': token }
            });
            if (res.ok) {
                fetchClients();
            } else {
                const data = await res.json();
                alert(data.msg || "Failed to delete client");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const token = localStorage.getItem('token');
            const url = isEditing ? `${API_URL}/admin/clients/${formData.id}` : `${API_URL}/admin/clients`;
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                await fetchClients();
                setShowModal(false);
            } else {
                const data = await res.json();
                alert(data.msg || 'Operation failed');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitLoading(false);
        }
    };

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.phone && c.phone.includes(searchQuery)) ||
        (c.email && c.email.toLowerCase().includes(searchQuery))
    );

    if (loading) return <div className="h-full flex items-center justify-center min-h-[500px]"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>;

    return (
        <div className="p-4 md:p-8 relative">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Client Directory</h1>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-800 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                            placeholder="Search name, phone..."
                        />
                    </div>
                    <button
                        onClick={handleCreateClick}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 whitespace-nowrap"
                    >
                        <Plus size={18} /> Add Client
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
                                <th className="p-6">Client Name</th>
                                <th className="p-6 hidden md:table-cell">Contact Info</th>
                                <th className="p-6 text-center">Projects</th>
                                <th className="p-6 text-right">Financials</th>
                                <th className="p-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <AnimatePresence>
                                {filteredClients.map((client, index) => (
                                    <React.Fragment key={client.id}>
                                        <motion.tr
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-slate-50/50 transition-colors bg-white/50 group"
                                        >
                                            <td className="p-6 align-top">
                                                <div className="font-bold text-slate-800 text-lg">{client.name}</div>
                                                <div className="text-xs text-slate-500 font-medium">{client.organization_name}</div>
                                                <div className="md:hidden text-xs text-slate-500 mt-1">
                                                    {client.phone} <br /> {client.email}
                                                </div>
                                            </td>
                                            <td className="p-6 hidden md:table-cell align-top text-sm">
                                                <div className="flex items-center gap-2 text-slate-600 mb-1"><Phone size={14} /> {client.phone || 'N/A'}</div>
                                                <div className="flex items-center gap-2 text-slate-600"><Mail size={14} /> {client.email || 'N/A'}</div>
                                                <div className="flex items-center gap-2 text-slate-400 text-xs mt-1"><MapPin size={12} /> {client.address_city}, {client.address_state}</div>
                                            </td>
                                            <td className="p-6 text-center align-top">
                                                <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold text-sm border border-indigo-100">
                                                    {client.project_count || 0}
                                                </span>
                                            </td>
                                            <td className="p-6 text-right align-top">
                                                <div className="text-emerald-600 font-bold">₹{parseFloat(client.total_paid || 0).toLocaleString()} <span className="text-[10px] uppercase text-emerald-400">Paid</span></div>
                                                <div className="text-red-500 font-bold text-sm">₹{parseFloat(client.total_due || 0).toLocaleString()} <span className="text-[10px] uppercase text-red-300">Due</span></div>
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEditClick(client)}
                                                        className="p-2 hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 rounded-lg transition-colors"
                                                        title="Edit Client"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(client.id)}
                                                        className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors"
                                                        title="Remove Client"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => toggleExpand(client.id)}
                                                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 transition-colors opacity-100"
                                                    >
                                                        {expandedClient === client.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                        <AnimatePresence>
                                            {expandedClient === client.id && (
                                                <motion.tr
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    <td colSpan="5" className="p-0 border-b border-slate-100 bg-slate-50/50">
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="p-6 pl-12"
                                                        >
                                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Project History</h4>
                                                            {client.projects && client.projects.length > 0 ? (
                                                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                                    {client.projects.map(proj => (
                                                                        <div key={proj.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                                                            <div className="flex justify-between items-start mb-2">
                                                                                <div className="font-mono text-xs font-bold text-indigo-500">{proj.unique_id}</div>
                                                                                <div className="text-[10px] uppercase font-bold text-slate-400">{proj.status}</div>
                                                                            </div>
                                                                            <div className="flex justify-between text-sm mt-3 pt-3 border-t border-slate-100">
                                                                                <div>
                                                                                    <span className="text-[10px] text-slate-400 block uppercase">Fixed</span>
                                                                                    <span className="font-bold text-slate-700">₹{parseFloat(proj.price_fixed || 0).toLocaleString()}</span>
                                                                                </div>
                                                                                <div className="text-right">
                                                                                    <span className="text-[10px] text-slate-400 block uppercase">Received</span>
                                                                                    <span className="font-bold text-emerald-600">₹{parseFloat(proj.amount_received || 0).toLocaleString()}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="text-sm text-slate-400 italic">No projects recorded for this client.</div>
                                                            )}
                                                        </motion.div>
                                                    </td>
                                                </motion.tr>
                                            )}
                                        </AnimatePresence>
                                    </React.Fragment>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
                {filteredClients.length === 0 && (
                    <div className="p-12 text-center text-slate-400 italic">No clients found matching "{searchQuery}"</div>
                )}
            </motion.div>

            {/* Client Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-slate-100 p-8 rounded-3xl w-full max-w-lg shadow-2xl relative"
                        >
                            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 p-1 rounded-full">
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-extrabold mb-6 text-slate-800">{isEditing ? 'Edit Client' : 'Add New Client'}</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Client Name</label>
                                        <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
                                        <input required type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                                        <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1"><Building size={12} /> Organization</label>
                                        <input type="text" value={formData.organization_name} onChange={e => setFormData({ ...formData, organization_name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">City</label>
                                        <input type="text" value={formData.address_city} onChange={e => setFormData({ ...formData, address_city: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">State</label>
                                        <input type="text" value={formData.address_state} onChange={e => setFormData({ ...formData, address_state: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
                                    </div>
                                </div>

                                <button type="submit" disabled={submitLoading} className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all mt-4 flex justify-center shadow-lg shadow-indigo-500/20 active:scale-95">
                                    {submitLoading ? <Loader2 className="animate-spin" size={16} /> : (isEditing ? 'Update Client' : 'Add Client')}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Clients;
