import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-6">
            <Helmet>
                <title>Privacy Policy | PathMakers</title>
                <meta name="description" content="PathMakers Privacy Policy: Learn how we collect, use, and protect your personal information. We prioritize data security and comply with privacy regulations." />
                <meta name="keywords" content="Privacy Policy, PathMakers privacy, data protection, data security, GDPR compliance, user privacy" />
                <link rel="canonical" href="https://path-makers.vercel.app/privacy" />
                <meta name="robots" content="index, follow" />
                
                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://path-makers.vercel.app/privacy" />
                <meta property="og:title" content="Privacy Policy - PathMakers" />
                <meta property="og:description" content="Learn how we protect your data and maintain privacy compliance." />
            </Helmet>
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800"
                >
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
                        <div className="p-3 bg-green-100 dark:bg-slate-800 rounded-xl text-green-600">
                            <ShieldCheck size={32} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Privacy Policy</h1>
                    </div>

                    <div className="max-w-none text-slate-600 dark:text-slate-400">
                        <p className="text-xl leading-relaxed mb-8">
                            Your privacy is important to us. This policy explains how PathMakers collects, uses, and protects your personal information.
                        </p>

                        <div className="space-y-8">
                            {[
                                { title: "1. Confidentiality Assurance", content: "All client communications, shared files, concepts, and project information are treated as confidential and will not be distributed to third parties." },
                                { title: "2. Secure Handling of Project Data", content: "Technical details, internal processes, and conceptual work remain private during development and after delivery unless the client grants written permission to share." },
                                { title: "3. Personal Data Usage", content: "Basic personal information may be collected solely for project communication, billing, and service coordination.\nPathMakers does not sell, rent, or exchange personal information with external sources." },
                                { title: "4. Portfolio Display", content: "PathMakers may showcase screenshots, images, or short previews of completed work for portfolio and branding purposes.\nOnly non-sensitive portions will be displayed, without exposing private information or internal logic." },
                                { title: "5. Protection of Conversations", content: "Messages, chats, call details, and shared communications will not be shared publicly or privately, unless legally required." },
                                { title: "6. Confidential Work Access", content: "Only authorized team members directly associated with the project will access the client’s data or files." },
                                { title: "7. Data Retention", content: "Project files may be stored internally for record and support unless a client requests deletion after full handover." },
                                { title: "8. External Platforms", content: "If client work is hosted or integrated using third-party services, their privacy policies apply separately.\nPathMakers is not responsible for external platform behavior, outages, or data handling." },
                                { title: "9. Consent & Agreement", content: "Use of PathMakers services implies acceptance of this Privacy Policy and consent to reasonable internal usage of project-related data." },
                                { title: "10. Policy Changes", content: "PathMakers may update this Privacy Policy periodically.\nClients will be notified when major changes occur, and continued use of services constitutes acceptance." },
                                { title: "11. Security Practices", content: "We follow internal safety practices to protect project files and communication records, including controlled access and secured storage channels.\nHowever, PathMakers does not guarantee absolute data security due to the nature of digital systems." },
                                { title: "12. Sensitive Information Handling", content: "If clients choose to share personal or sensitive identifiers (e.g., ID numbers, academic credentials), PathMakers will not disclose them and will retain them only as required for the project." },
                                { title: "13. Anonymized Work Samples", content: "Completed work may be used in an anonymized or masked form to demonstrate capabilities without exposing private content." },
                                { title: "14. Public Feedback & Reviews", content: "Feedback provided publicly by clients (via messages, testimonials, or reviews) may be referenced for credibility and service demonstration, unless removal is requested." },
                                { title: "15. Communication Records", content: "PathMakers may retain chat, email, and call summaries solely for internal documentation and reference —\nbut will not publish, forward, or disclose them without client permission." },
                                { title: "16. Third-Party Compliance", content: "When integrating external tools, platforms, or APIs, PathMakers operates within their privacy rules.\nClients should review external platform privacy policies to understand how their data may be processed outside PathMakers’ control." },
                                { title: "17. Right to Withdraw Consent", content: "Clients may request deletion of stored documents or communication records after project completion, subject to verification of identity and request validity." },
                                { title: "18. Portfolio Opt-Out", content: "If clients do not want their completed work displayed in any form, they may formally request an opt-out before project delivery." },
                                { title: "19. Data Sharing in Emergencies", content: "Client data may be disclosed only when required by law, court orders, or safety concerns, and only to the extent legally necessary." },
                                { title: "20. Internal Training Use", content: "Non-confidential concepts or general learnings from completed projects may be used internally for training, workflow improvement, and skill development, without exposing identifiable client data." }
                            ].map((item, index) => (
                                <div key={index}>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                                    <p className="leading-relaxed text-justify whitespace-pre-line">
                                        {item.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 font-medium">
                            Last updated: November 2025
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
