import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ClientLayout from './layouts/ClientLayout';
import Landing from './client/pages/Landing';
import About from './client/pages/About';
import Projects from './client/pages/Projects';
import Services from './client/pages/Services';
import Contact from './client/pages/Contact';
import Terms from './client/pages/Terms';
import Privacy from './client/pages/Privacy';
import Loader from './components/Loader';
import AdminLogin from './admin/pages/Login';
import DashboardLayout from './layouts/DashboardLayout';
import AdminDashboard from './admin/pages/Dashboard';
import Requests from './admin/pages/Requests';
import Employees from './admin/pages/Employees';
import Clients from './admin/pages/Clients';
import Messages from './admin/pages/Messages';
import EmployeeDashboard from './employee/pages/Dashboard';
import SmoothScroll from './components/SmoothScroll';

const App = () => {
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    return (
        <AnimatePresence mode="wait">

            {loading ? (
                <Loader onComplete={() => setLoading(false)} />
            ) : (
                <>
                    <SmoothScroll />
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<ClientLayout><Landing /></ClientLayout>} />
                        <Route path="/about" element={<ClientLayout><About /></ClientLayout>} />
                        <Route path="/services" element={<ClientLayout><Services /></ClientLayout>} />
                        <Route path="/projects" element={<ClientLayout><Projects /></ClientLayout>} />
                        <Route path="/contact" element={<ClientLayout><Contact /></ClientLayout>} />
                        <Route path="/terms" element={<ClientLayout><Terms /></ClientLayout>} />
                        <Route path="/privacy" element={<ClientLayout><Privacy /></ClientLayout>} />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<ClientLayout><AdminLogin /></ClientLayout>} />
                        <Route path="/admin" element={<DashboardLayout role="admin" />}>
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="requests" element={<Requests />} />
                            <Route path="employees" element={<Employees />} />
                            <Route path="clients" element={<Clients />} />
                            <Route path="messages" element={<Messages />} />
                        </Route>
                        <Route path="/employee" element={<DashboardLayout role="employee" />}>
                            <Route path="dashboard" element={<EmployeeDashboard />} />
                        </Route>

                        <Route path="*" element={<div className="h-screen flex items-center justify-center text-xl text-slate-800 dark:text-white bg-white dark:bg-slate-900">404 - Page Not Found</div>} />
                    </Routes>
                </>
            )}
        </AnimatePresence>
    );
};

export default App;
