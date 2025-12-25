import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Search, Filter, Calendar, DollarSign, Code, FileText, CheckCircle, X, Users, ExternalLink, AlertTriangle, MessageSquare, Receipt, Download, Globe } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { API_URL } from '../../utils/api';

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);

    // Assignment Form State
    const [assignForm, setAssignForm] = useState({
        status: '',
        employeeIds: [],
        quotedPrice: '',
        adminCommands: '',
        techStack: { frontend: '', backend: '', db: '' },
        expectedDate: '',
        shareDocs: false
    });
    const [assignLoading, setAssignLoading] = useState(false);

    // Review Form State
    const [reviewForm, setReviewForm] = useState({ decision: '', message: '' });
    const [reviewLoading, setReviewLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const [reqRes, empRes] = await Promise.all([
                fetch(`${API_URL}/admin/requests`, { headers: { 'x-auth-token': token } }),
                fetch(`${API_URL}/admin/employees`, { headers: { 'x-auth-token': token } })
            ]);

            if (reqRes.ok) setRequests(await reqRes.json());
            if (empRes.ok) setEmployees(await empRes.json());
        } catch (err) {
            console.error("Failed to fetch data", err);
        } finally {
            setLoading(false);
        }
    };

    const openAssignModal = (req) => {
        setSelectedRequest(req);
        // Pre-fill form if data exists
        setAssignForm({
            status: req.status || 'Confirmed',
            employeeIds: req.assigned_employees?.map(e => e.id) || [],
            quotedPrice: req.quoted_price || '',
            adminCommands: req.admin_commands || '',
            techStack: {
                frontend: req.tech_stack_frontend || '',
                backend: req.tech_stack_backend || '',
                db: req.tech_stack_db || ''
            },
            expectedDate: req.admin_expected_date ? req.admin_expected_date.split('T')[0] : '',
            shareDocs: req.share_docs_with_employee || false
        });
        setShowModal(true);
    };

    const openReviewModal = (req) => {
        setSelectedRequest(req);
        setReviewForm({ decision: '', message: '' });
        setShowReviewModal(true);
    };

    const openReceiptModal = (req) => {
        setSelectedRequest(req);
        setShowReceiptModal(true);
    };

    const toggleEmployee = (empId) => {
        setAssignForm(prev => {
            const newIds = prev.employeeIds.includes(empId)
                ? prev.employeeIds.filter(id => id !== empId)
                : [...prev.employeeIds, empId];
            return { ...prev, employeeIds: newIds };
        });
    };

    const handleAssignSubmit = async () => {
        setAssignLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/admin/assign`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({
                    requestId: selectedRequest.id,
                    ...assignForm
                })
            });

            if (res.ok) {
                await fetchData();
                setShowModal(false);
                setSelectedRequest(null);
            }
        } catch (err) {
            console.error("Failed to assign", err);
        } finally {
            setAssignLoading(false);
        }
    };

    const handleReviewSubmit = async (decision) => {
        if (decision === 'Rejected' && !reviewForm.message) return alert("Please provide a reason for requesting changes.");

        setReviewLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/admin/review`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({
                    requestId: selectedRequest.id,
                    decision,
                    message: reviewForm.message
                })
            });

            if (res.ok) {
                await fetchData();
                setShowReviewModal(false);
                setSelectedRequest(null);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setReviewLoading(false);
        }
    };

    const downloadReceipt = () => {
        if (!selectedRequest) return;
        const doc = new jsPDF();

        // Brand Header (Mock Logo)
        doc.setFillColor(79, 70, 229); // Indigo 600
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text("PathMakers", 20, 25);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text("Project Receipt & Details", 20, 32);

        // Receipt Info
        doc.setTextColor(40, 40, 40);
        doc.setFontSize(10);
        doc.text(`Receipt Date: ${new Date().toLocaleDateString()}`, 150, 55);
        doc.text(`Request ID: ${selectedRequest.unique_id}`, 150, 60);

        // Client Details
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text("Client Information", 20, 60);
        doc.setLineWidth(0.5);
        doc.line(20, 62, 80, 62);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Name: ${selectedRequest.client_name}`, 20, 70);
        doc.text(`Email: ${selectedRequest.client_email || 'N/A'}`, 20, 75);
        doc.text(`Phone: ${selectedRequest.client_phone}`, 20, 80);
        doc.text(`Organization: ${selectedRequest.organization_name || 'N/A'}`, 20, 85);
        doc.text(`Location: ${selectedRequest.address_city}, ${selectedRequest.address_state}`, 20, 90);

        // Project Details
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text("Project Details", 20, 110);
        doc.line(20, 112, 80, 112);

        autoTable(doc, {
            startY: 120,
            head: [['Description', 'Value']],
            body: [
                ['Service Type', selectedRequest.service_name],
                ['Service Code', selectedRequest.service_code],
                ['Current Status', selectedRequest.status],
                ['Quoted Price', selectedRequest.quoted_price || 'Pending'],
                ['Expected Delivery', selectedRequest.admin_expected_date ? new Date(selectedRequest.admin_expected_date).toLocaleDateString() : 'TBD'],
            ],
            theme: 'grid',
            headStyles: { fillColor: [79, 70, 229] },
            styles: { fontSize: 10 }
        });

        // Message/Requirement
        const finalY = (doc).lastAutoTable.finalY + 15;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text("Client Requirements", 20, finalY);
        doc.line(20, finalY + 2, 80, finalY + 2);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const splitText = doc.splitTextToSize(selectedRequest.message || "No additional details provided.", 170);
        doc.text(splitText, 20, finalY + 10);

        // Footer warning
        doc.setTextColor(150, 150, 150);
        doc.setFontSize(8);
        doc.text("This receipt is computer generated and requires no signature.", 105, 280, { align: 'center' });
        doc.text("PathMakers Tech Solutions", 105, 285, { align: 'center' });

        doc.save(`${selectedRequest.unique_id}_receipt.pdf`);
    };


    if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;

    return (
        <div className="p-8 relative">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">Client Requests</h1>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
                        <input className="bg-slate-900 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white w-64 focus:outline-none focus:border-blue-500" placeholder="Search client or ID..." />
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                                <th className="p-6 font-semibold">ID</th>
                                <th className="p-6 font-semibold">Client Details</th>
                                <th className="p-6 font-semibold">Project & Status</th>
                                <th className="p-6 font-semibold">Assigned Team</th>
                                <th className="p-6 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {requests.map((req) => (
                                <tr key={req.id} className="hover:bg-slate-950/50 transition-colors">
                                    <td className="p-6 font-mono text-sm text-blue-400 align-top">{req.unique_id}</td>
                                    <td className="p-6 align-top">
                                        <div className="font-bold text-white mb-1">{req.client_name}</div>
                                        <div className="text-xs text-slate-500 flex flex-col gap-1">
                                            <span>{req.client_email}</span>
                                            <span>{req.client_phone}</span>
                                            <span>{req.address_city}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 align-top">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-medium text-slate-300 border border-slate-700">{req.service_name}</span>
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${req.status === 'Pending' ? 'text-blue-500 border-blue-500/20 bg-blue-500/10' :
                                                req.status === 'Confirmed' ? 'text-indigo-500 border-indigo-500/20 bg-indigo-500/10' :
                                                    req.status === 'Ongoing' ? 'text-purple-500 border-purple-500/20 bg-purple-500/10' :
                                                        req.status === 'Under Review' ? 'text-amber-500 border-amber-500/20 bg-amber-500/10' :
                                                            req.status === 'Changes Requested' ? 'text-red-500 border-red-500/20 bg-red-500/10' :
                                                                req.status === 'Accepted' || req.status === 'Completed' ? 'text-green-500 border-green-500/20 bg-green-500/10' :
                                                                    'text-slate-400 border-slate-700'
                                                }`}>{req.status}</span>
                                        </div>
                                        <div className="text-xs text-slate-400 line-clamp-2">{req.message}</div>
                                        {req.quoted_price && <div className="mt-2 text-xs font-mono text-green-400">price: {req.quoted_price}</div>}

                                        {/* Review Links Preview */}
                                        {(req.github_link || req.hosted_link) && (
                                            <div className="mt-2 flex gap-2">
                                                {req.github_link && <a href={req.github_link} target="_blank" rel='noopener noreferrer' className='text-xs text-slate-500 hover:text-white'><ExternalLink size={12} /></a>}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-6 align-top">
                                        {req.assigned_employees && req.assigned_employees.length > 0 ? (
                                            <div className="flex -space-x-2 overflow-hidden">
                                                {req.assigned_employees.map((emp, i) => (
                                                    <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-white relative group cursor-help">
                                                        {emp.name.charAt(0)}
                                                        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs p-1 rounded whitespace-nowrap z-10">
                                                            {emp.name} <br /> <span className="opacity-50 text-[10px]">{new Date(emp.assigned_at).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-slate-600 text-xs italic">Unassigned</span>
                                        )}
                                    </td>
                                    <td className="p-6 text-right align-top flex flex-col gap-2 items-end">
                                        {req.status === 'Under Review' && (
                                            <button
                                                onClick={() => openReviewModal(req)}
                                                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-lg text-sm font-bold shadow-lg shadow-amber-500/20 transition-all w-full md:w-auto mb-2"
                                            >
                                                Review Submission
                                            </button>
                                        )}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openReceiptModal(req)}
                                                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700"
                                                title="View Receipt"
                                            >
                                                <Receipt size={16} />
                                            </button>
                                            <button
                                                onClick={() => openAssignModal(req)}
                                                className="px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 rounded-lg text-sm font-bold border border-blue-500/20 transition-colors"
                                            >
                                                Manage
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Assignment Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row"
                        >
                            {/* Same Assignment Modal Content as before */}
                            <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-slate-800 p-6 bg-slate-950/50">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Users size={18} className="text-blue-500" /> Select Team
                                </h3>
                                <div className="space-y-2">
                                    {employees.filter(e => e.is_active).map(emp => (
                                        <div
                                            key={emp.id}
                                            onClick={() => toggleEmployee(emp.id)}
                                            className={`p-3 rounded-xl border cursor-pointer transition-all ${assignForm.employeeIds.includes(emp.id)
                                                ? 'bg-blue-600/20 border-blue-500/50'
                                                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${assignForm.employeeIds.includes(emp.id) ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                                                    }`}>
                                                    {emp.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className={`text-sm font-bold ${assignForm.employeeIds.includes(emp.id) ? 'text-white' : 'text-slate-300'}`}>{emp.name}</div>
                                                    <div className="text-[10px] text-slate-500 flex gap-2">
                                                        <span>Ongoing: {emp.ongoing_count || 0}</span>
                                                        <span>Completed: {emp.completed_count || 0}</span>
                                                    </div>
                                                </div>
                                                {assignForm.employeeIds.includes(emp.id) && <CheckCircle size={16} className="ml-auto text-blue-500" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Project Configuration</h2>
                                        <div className="text-sm text-slate-500">ID: {selectedRequest?.unique_id}</div>
                                    </div>
                                    {/* Status Select Removed - Let workflow drive it primarily, or keep it for manual overrides */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-slate-400">Status:</span>
                                        <select
                                            value={assignForm.status}
                                            onChange={(e) => setAssignForm({ ...assignForm, status: e.target.value })}
                                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Ongoing">Ongoing</option>
                                            <option value="Under Review">Under Review</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Changes Requested">Changes Requested</option>
                                            <option value="Payment">Payment</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Canceled">Canceled</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Quoted Price</label>
                                        <div className="relative">
                                            <DollarSign size={14} className="absolute left-3 top-3 text-slate-500" />
                                            <input
                                                type="text"
                                                value={assignForm.quotedPrice}
                                                onChange={(e) => setAssignForm({ ...assignForm, quotedPrice: e.target.value })}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:border-blue-500 outline-none"
                                                placeholder="e.g. $5000"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Delivery Date</label>
                                        <div className="relative">
                                            <Calendar size={14} className="absolute left-3 top-3 text-slate-500" />
                                            <input
                                                type="date"
                                                value={assignForm.expectedDate}
                                                onChange={(e) => setAssignForm({ ...assignForm, expectedDate: e.target.value })}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 pl-9 pr-3 text-sm text-white focus:border-blue-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Tech Stack</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <input
                                            type="text" placeholder="Frontend"
                                            value={assignForm.techStack.frontend}
                                            onChange={(e) => setAssignForm({ ...assignForm, techStack: { ...assignForm.techStack, frontend: e.target.value } })}
                                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                                        />
                                        <input
                                            type="text" placeholder="Backend"
                                            value={assignForm.techStack.backend}
                                            onChange={(e) => setAssignForm({ ...assignForm, techStack: { ...assignForm.techStack, backend: e.target.value } })}
                                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                                        />
                                        <input
                                            type="text" placeholder="Database"
                                            value={assignForm.techStack.db}
                                            onChange={(e) => setAssignForm({ ...assignForm, techStack: { ...assignForm.techStack, db: e.target.value } })}
                                            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Admin Commands & Instructions</label>
                                    <textarea
                                        rows="4"
                                        value={assignForm.adminCommands}
                                        onChange={(e) => setAssignForm({ ...assignForm, adminCommands: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-white outline-none focus:border-blue-500 resize-none"
                                        placeholder="Detailed instructions for the team..."
                                    ></textarea>
                                </div>

                                <div className="flex items-center gap-2 mb-8 p-3 bg-slate-950 rounded-lg border border-slate-800">
                                    <input
                                        type="checkbox"
                                        id="shareDocs"
                                        checked={assignForm.shareDocs}
                                        onChange={(e) => setAssignForm({ ...assignForm, shareDocs: e.target.checked })}
                                        className="w-4 h-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500 bg-slate-900"
                                    />
                                    <label htmlFor="shareDocs" className="text-sm text-slate-300 select-none cursor-pointer">
                                        Share attached client documents with assigned employees?
                                    </label>
                                </div>

                                <div className="flex justify-end gap-3">
                                    <button onClick={() => setShowModal(false)} className="px-6 py-2 bg-transparent text-slate-400 font-bold hover:text-white transition-colors">Cancel</button>
                                    <button onClick={handleAssignSubmit} disabled={assignLoading} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2">
                                        {assignLoading && <Loader2 className="animate-spin" size={16} />}
                                        Confirm Assignment
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Review Modal */}
            <AnimatePresence>
                {showReviewModal && selectedRequest && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-8"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Review Submission</h2>

                            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-6 space-y-3">
                                <div className='flex items-center gap-3'>
                                    <ExternalLink size={20} className='text-slate-400' />
                                    <div>
                                        <div className='text-xs text-slate-500 font-bold uppercase'>GitHub Repository</div>
                                        <a href={selectedRequest.github_link} target='_blank' rel='noopener noreferrer' className='text-blue-400 font-medium hover:underline truncate block max-w-[300px]'>
                                            {selectedRequest.github_link || 'Not provided'}
                                        </a>
                                    </div>
                                </div>
                                {selectedRequest.hosted_link && (
                                    <div className='flex items-center gap-3 pt-3 border-t border-slate-800'>
                                        <Globe size={20} className='text-slate-400' />
                                        <div>
                                            <div className='text-xs text-slate-500 font-bold uppercase'>Hosted URL</div>
                                            <a href={selectedRequest.hosted_link} target='_blank' rel='noopener noreferrer' className='text-blue-400 font-medium hover:underline truncate block max-w-[300px]'>
                                                {selectedRequest.hosted_link}
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {!reviewForm.decision ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setReviewForm({ ...reviewForm, decision: 'Rejected' })}
                                        className="py-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 rounded-xl font-bold flex flex-col items-center gap-2 transition-all"
                                    >
                                        <AlertTriangle size={24} />
                                        Request Changes
                                    </button>
                                    <button
                                        onClick={() => handleReviewSubmit('Accepted')}
                                        disabled={reviewLoading}
                                        className="py-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-500 rounded-xl font-bold flex flex-col items-center gap-2 transition-all"
                                    >
                                        <CheckCircle size={24} />
                                        Accept Project
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {reviewForm.decision === 'Rejected' && (
                                        <div>
                                            <label className="text-sm font-bold text-slate-400 mb-2 block">What needs to be fixed?</label>
                                            <textarea
                                                rows="4"
                                                value={reviewForm.message}
                                                onChange={e => setReviewForm({ ...reviewForm, message: e.target.value })}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-red-500 outline-none resize-none"
                                                placeholder="Provide detailed feedback for the team..."
                                            ></textarea>
                                        </div>
                                    )}

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            onClick={() => setReviewForm({ decision: '', message: '' })}
                                            className="flex-1 py-3 text-slate-500 font-bold hover:text-white transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={() => handleReviewSubmit(reviewForm.decision)}
                                            disabled={reviewLoading}
                                            className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${reviewForm.decision === 'Accepted' ? 'bg-green-600 hover:bg-green-500 shadow-green-500/20' : 'bg-red-600 hover:bg-red-500 shadow-red-500/20'
                                                }`}
                                        >
                                            {reviewLoading && <Loader2 className="animate-spin" size={16} />}
                                            {reviewForm.decision === 'Accepted' ? 'Confirm Acceptance' : 'Send Feedback'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Receipt Modal */}
            <AnimatePresence>
                {showReceiptModal && selectedRequest && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
                        >
                            <div className="bg-indigo-600 p-6 text-white text-center relative">
                                <button onClick={() => setShowReceiptModal(false)} className="absolute top-4 right-4 text-white/70 hover:text-white">
                                    <X size={20} />
                                </button>
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                                    <Receipt size={24} />
                                </div>
                                <h3 className="text-2xl font-black">Project Receipt</h3>
                                <p className="text-white/70 text-sm">Official Record</p>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="text-center pb-4 border-b border-slate-100">
                                    <h2 className="text-xl font-bold text-slate-800 mb-1">{selectedRequest.service_name}</h2>
                                    <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">{selectedRequest.unique_id}</div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Client Name</span>
                                        <span className="font-bold text-slate-800">{selectedRequest.client_name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Status</span>
                                        <span className="font-bold text-indigo-600">{selectedRequest.status}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Quoted Price</span>
                                        <span className="font-bold text-slate-800">{selectedRequest.quoted_price || 'Pending'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Expected Delivery</span>
                                        <span className="font-bold text-slate-800">{selectedRequest.admin_expected_date ? new Date(selectedRequest.admin_expected_date).toLocaleDateString() : 'TBD'}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={downloadReceipt}
                                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 mt-4 shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
                                >
                                    <Download size={18} /> Download Receipt PDF
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Requests;
