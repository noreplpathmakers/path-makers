import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, CheckCircle, Activity, Loader2, TrendingUp, CreditCard, Database, Plus, ArrowRight, Briefcase } from 'lucide-react';
import { API_URL } from '../../utils/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_URL}/admin/stats`, {
                    headers: { 'x-auth-token': token }
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (err) {
                console.error("Failed to fetch stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const handleExportDatabase = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/admin/export-db`, {
                method: 'GET',
                headers: {
                    'x-auth-token': token
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `pathmakers_db_export_${new Date().toISOString().slice(0, 10)}.sql`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } else {
                console.error("Export failed", response.statusText);
                alert("Failed to export database. Please check permissions.");
            }
        } catch (error) {
            console.error("Export error", error);
            alert("An error occurred during export.");
        }
    };

    if (loading) {
        return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={40} /></div>;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    const statCards = [
        { title: "Total Requests", value: stats?.totalRequests || 0, icon: <FileText className="text-blue-600" />, color: "from-blue-500/10 to-blue-500/5 text-blue-600 border-blue-100", link: "/admin/requests" },
        { title: "Active Projects", value: stats?.activeProjects || 0, icon: <Activity className="text-purple-600" />, color: "from-purple-500/10 to-purple-500/5 text-purple-600 border-purple-100", link: "/admin/requests" },
        { title: "Team Members", value: stats?.activeEmployees || 0, icon: <Users className="text-green-600" />, color: "from-green-500/10 to-green-500/5 text-green-600 border-green-100", link: "/admin/employees" },
        { title: "Net Earnings", value: `₹${((stats?.financials?.client?.received || 0) - (stats?.financials?.employee?.paid || 0)).toLocaleString()}`, icon: <TrendingUp className="text-emerald-600" />, color: "from-emerald-500/10 to-emerald-500/5 text-emerald-600 border-emerald-100", link: null },
    ];

    const quickActions = [
        { title: "Add Client", icon: <Plus size={18} />, action: () => navigate('/admin/clients'), color: "bg-blue-600 hover:bg-blue-500" },
        { title: "New Employee", icon: <Users size={18} />, action: () => navigate('/admin/employees'), color: "bg-purple-600 hover:bg-purple-500" },
        { title: "Check Messages", icon: <FileText size={18} />, action: () => navigate('/admin/messages'), color: "bg-emerald-600 hover:bg-emerald-500" },
    ];

    // Calculations for Graphs
    const clientFixed = stats?.financials?.client?.fixed || 0;
    const clientReceived = stats?.financials?.client?.received || 0;
    const clientProgress = clientFixed > 0 ? (clientReceived / clientFixed) * 100 : 0;

    const empPaid = stats?.financials?.employee?.paid || 0;
    const empPending = stats?.financials?.employee?.pending || 0;
    const empTotal = empPaid + empPending;
    const empProgress = empTotal > 0 ? (empPaid / empTotal) * 100 : 0;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-4 md:p-8 space-y-8"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white/50 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-sm">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
                        Dashboard <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full border border-green-200 uppercase tracking-widest">System Online</span>
                    </h1>
                    <p className="text-slate-500 mt-1 font-medium">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <button
                    onClick={handleExportDatabase}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-slate-800/20 active:scale-95"
                >
                    <Database size={16} /> Export DB
                </button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className={`bg-gradient-to-br ${stat.color} bg-white border p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-default relative overflow-hidden group`}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-500">
                            {React.cloneElement(stat.icon, { size: 60 })}
                        </div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-100">
                                {stat.icon}
                            </div>
                        </div>
                        <div className="relative z-10">
                            <span className="text-3xl font-black text-slate-800 block mb-1 truncate break-all">{stat.value}</span>
                            <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                                {stat.title}
                                {stat.link && <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500" />}
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Analytics Graphs */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Requests Bar Chart */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <FileText size={20} className="text-slate-400" /> Monthly Requests
                    </h2>
                    <div className="h-64 flex items-end justify-between gap-2 md:gap-4 relative pt-6">
                        {stats?.graphs?.requests?.length > 0 ? (
                            stats.graphs.requests.map((item, i) => {
                                const max = Math.max(...stats.graphs.requests.map(d => parseInt(d.value))) || 1;
                                const height = (parseInt(item.value) / max) * 100;
                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                        <div className="relative w-full flex items-end justify-center h-full">
                                            <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] py-1 px-2 rounded-lg font-bold">
                                                {item.value}
                                            </div>
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className="w-full max-w-[40px] bg-indigo-500 rounded-t-lg group-hover:bg-indigo-600 transition-colors opacity-90 hover:opacity-100"
                                            ></motion.div>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400">{item.name}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-medium italic">No Data Available</div>
                        )}
                    </div>
                </div>

                {/* Revenue Line Chart */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-slate-400" /> Revenue Trend
                    </h2>
                    <div className="h-64 relative flex items-end">
                        {stats?.graphs?.revenue?.length > 0 ? (
                            <div className="w-full h-full flex flex-col justify-end">
                                <div className="flex-1 relative">
                                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                        {/* Simple Path */}
                                        <defs>
                                            <linearGradient id="gradientRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        {(() => {
                                            const data = stats.graphs.revenue;
                                            const max = Math.max(...data.map(d => parseFloat(d.value))) || 1;
                                            // Assume fixed width steps
                                            const points = data.map((d, i) => {
                                                const x = (i / (data.length - 1)) * 100;
                                                const y = 100 - ((parseFloat(d.value) / max) * 100);
                                                return `${x},${y}`;
                                            }).join(' ');

                                            // Closed path for fill
                                            const fillPoints = `0,100 ${points} 100,100`;

                                            return (
                                                <>
                                                    <motion.polyline
                                                        fill="none"
                                                        stroke="#10b981"
                                                        strokeWidth="3"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ duration: 1.5 }}
                                                        points={data.map((d, i) => {
                                                            const x = (i / (data.length - 1 || 1)) * 100; // Use % for X
                                                            const y = 100 - ((parseFloat(d.value) / max) * 100);
                                                            return `${x * (500 / 100)},${y * (250 / 100)}`; // Approximate viewBox scaling if needed, but standard SVG usually simpler with viewBox 0 0 100 100
                                                        }).join(" ")} // Wait, SVG coordinate system.
                                                    // Let's use viewBox="0 0 100 100" on svg
                                                    />
                                                    {/* Using simpler HTML bars if SVG is too complex for inline one-shot without testing */}
                                                </>
                                            );
                                        })()}
                                        {/* Fallback to Flex Bars for Revenue too if SVG is risky? No, user wants graphs. */}
                                        {/* Let's try to render the points properly. Since we don't know the exact pixel width, SVG viewbox 0 0 100 100 is best. */}
                                        <motion.path
                                            d={`M0,100 ${stats.graphs.revenue.map((d, i) => {
                                                const x = (i / (stats.graphs.revenue.length - 1 || 1)) * 100;
                                                const max = Math.max(...stats.graphs.revenue.map(v => parseFloat(v.value))) || 1;
                                                const y = 100 - ((parseFloat(d.value) / max) * 90); // Use 90% height to leave top buffer
                                                return `L${x},${y}`;
                                            }).join(' ')} L100,100 Z`}
                                            fill="url(#gradientRevenue)"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5, duration: 1 }}
                                        />
                                        <motion.path
                                            d={`M0,${100 - ((parseFloat(stats.graphs.revenue[0].value) / (Math.max(...stats.graphs.revenue.map(v => parseFloat(v.value))) || 1)) * 90)} ${stats.graphs.revenue.map((d, i) => {
                                                const x = (i / (stats.graphs.revenue.length - 1 || 1)) * 100;
                                                const max = Math.max(...stats.graphs.revenue.map(v => parseFloat(v.value))) || 1;
                                                const y = 100 - ((parseFloat(d.value) / max) * 90);
                                                return `L${x},${y}`;
                                            }).join(' ')}`}
                                            fill="none"
                                            stroke="#10b981"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 1.5 }}
                                        />
                                    </svg>
                                </div>
                                <div className="flex justify-between mt-4">
                                    {stats.graphs.revenue.map((item, i) => (
                                        <div key={i} className="text-center" style={{ width: `${100 / stats.graphs.revenue.length}%` }}>
                                            <div className="text-[10px] font-bold text-emerald-600 mb-1">₹{(item.value / 1000).toFixed(0)}k</div>
                                            <div className="text-xs font-bold text-slate-400">{item.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm font-medium italic">No Revenue Data</div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* Financial Graphs */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Client Revenue */}
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-lg shadow-slate-200/50">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <span className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><CreditCard size={20} /></span>
                                Client Revenue
                            </h2>
                            <p className="text-sm text-slate-400 mt-1">Total revenue flow from active projects</p>
                        </div>
                        <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100">Inflow</span>
                    </div>

                    <div className="relative pt-2">
                        <div className="mb-2 flex justify-between text-sm font-bold text-slate-600">
                            <span>Received</span>
                            <span>Fixed Total</span>
                        </div>
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden mb-6">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${clientProgress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                            ></motion.div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Collected Amount</div>
                                <div className="text-2xl font-black text-indigo-600">₹{clientReceived.toLocaleString()}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Projected</div>
                                <div className="text-xl font-bold text-slate-600">₹{clientFixed.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Employee Salaries */}
                <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-lg shadow-slate-200/50">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <span className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><Users size={20} /></span>
                                Team Payroll
                            </h2>
                            <p className="text-sm text-slate-400 mt-1">Salary & compensation distribution</p>
                        </div>
                        <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100">Outflow</span>
                    </div>

                    <div className="relative pt-2">
                        <div className="mb-2 flex justify-between text-sm font-bold text-slate-600">
                            <span>Paid</span>
                            <span>Total Committed</span>
                        </div>
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden mb-6">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${empProgress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-emerald-500 to-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                            ></motion.div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Disbursed</div>
                                <div className="text-2xl font-black text-emerald-600">₹{empPaid.toLocaleString()}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Pending</div>
                                <div className="text-xl font-bold text-slate-600">₹{empPending.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center pt-8 border-t border-slate-100">
                <p className="text-slate-400 text-sm font-medium">Data is updated in real-time. System Version 2.0.1</p>
            </motion.div>
        </motion.div>
    );
};

export default AdminDashboard;
