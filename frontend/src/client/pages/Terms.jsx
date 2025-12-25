import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText } from 'lucide-react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800"
                >
                    <div className="flex items-center gap-4 mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
                        <div className="p-3 bg-blue-100 dark:bg-slate-800 rounded-xl text-primary">
                            <ScrollText size={32} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
                    </div>

                    <div className="max-w-none text-slate-600 dark:text-slate-400">
                        <p className="text-xl leading-relaxed mb-8">
                            Welcome to PathMakers. By accessing or using our website and services, you agree to be bound by these terms.
                        </p>

                        <div className="space-y-8">
                            {[
                                { title: "1. Service Nature", content: "PathMakers operates as a freelancing-based service platform and is not a registered company, firm, or incorporated startup.\nAll services are provided independently based on client requests and team availability." },
                                { title: "2. Scope of Services", content: "PathMakers offers service-based support across multiple domains such as software solutions, digital development, academic assistance, design, printing, and content creation.\nService acceptance is based on request evaluation and resource feasibility." },
                                { title: "3. Pricing & Estimates", content: "Pricing is not fixed and may vary depending on requirements, timelines, and workload.\nEvery quotation is prepared to ensure a reasonable and optimal price reflecting the service effort." },
                                { title: "4. Official Confirmation", content: "Only confirmation emails sent through PathMakers official email addresses will be treated as valid agreements for service scope, pricing, and timelines.\nInformal messages through calls, chats, or social media are not considered binding confirmations." },
                                { title: "5. Receipts & Reference Documents", content: "PathMakers may issue receipts or acknowledgment documents for reference purposes.\nThese documents do not represent proof of any financial transaction unless supported with verified digital transfer records." },
                                { title: "6. Deliverables & Release Policy", content: "All project deliverables will be provided in digital format only and handed over after full payment is successfully received in the designated account." },
                                { title: "7. Advance Payments", content: "For bulk work or large-scale requirements, PathMakers may request a 10% advance before initiating the project.\nIn all other cases, advance payment is left to the client's preference." },
                                { title: "8. Branding & Credits", content: "PathMakers reserves the right to include its branding, credits, or signatures in the project footer, code base, or documentation.\nRemoval of branding is subject to additional charges, depending on the request." },
                                { title: "9. Code & Asset Integrity", content: "PathMakers is not responsible for issues arising from external modifications made to the delivered project after handover.\nAny claims for support or fixes will be invalid if third-party edits are applied to the original work." },
                                { title: "10. Client-Owned Rights", content: "Clients are fully responsible for obtaining copyrights, patents, intellectual property rights, or legal registrations for the delivered project work.\nPathMakers does not handle or process IP-related registrations." },
                                { title: "11. Hosting Services", content: "Service costs do not include hosting.\nIf hosting support or deployment assistance is required, additional charges will apply based on platform requirements and duration." },
                                { title: "12. Maintenance & Updates", content: "Maintenance after delivery is not included by default.\nAny post-delivery changes, updates, or maintenance requests will be billed separately based on time and complexity." },
                                { title: "13. Post-Delivery Issue Fixes", content: "If technical or conceptual errors are identified within 30 days of final delivery, PathMakers will provide free issue corrections, provided the code has not been altered externally." },
                                { title: "14. Refund Policy", content: "Payments made for services are non-refundable once project work has begun or deliverables have been shared.\nRefund requests before initiation are evaluated case-by-case." },
                                { title: "15. Client Responsibilities", content: "Clients must provide clear requirements, essential data, and timely approvals.\nDelays in communication may extend delivery timelines, and PathMakers will not be accountable for such extensions." },
                                { title: "16. Updates to Terms", content: "PathMakers reserves the right to modify these Terms at any time.\nContinued use of services implies acceptance of updated Terms." },
                                { title: "17. Liability Limitation", content: "PathMakers is not liable for business losses, third-party service failures, hosting interruptions, or damages arising from delivered work or subsequent modifications." },
                                { title: "18. Project Timeline & Delivery", content: "All delivery estimates are approximate and depend on timely approvals and resource availability.\nDelays caused by late client inputs, incomplete requirements, third-party dependencies, or changes in scope may extend the project timeline without penalty to PathMakers." },
                                { title: "19. Change Requests & Revisions", content: "Revisions are limited to the agreed scope only.\nAdditional requirements or changes after confirmation will be treated as new work and may result in revised charges and extended timelines." },
                                { title: "20. Client-Provided Materials", content: "Clients must ensure that all materials provided — including text, images, datasets, documents, and code — are legally owned or licensed.\nPathMakers is not responsible for legal claims arising from client-provided content." },
                                { title: "21. Third-Party Integrations", content: "Projects may require the use of external APIs, libraries, hosting, domains, or tools.\nPathMakers is not responsible for failures, pricing changes, or limitations within third-party services." },
                                { title: "22. Access Credentials", content: "If client servers, accounts, or platforms require access, clients must share credentials securely.\nPathMakers will not be responsible for data loss or access issues resulting from client-side mismanagement of credentials." },
                                { title: "23. Service Availability", content: "PathMakers attempts to maintain steady communication, but 24/7 availability is not guaranteed.\nResponses and work execution occur within mutually discussed working hours or availability windows." },
                                { title: "24. Quality Assurance", content: "All work undergoes internal quality checks before delivery.\nHowever, final responsibility lies with the client to verify that all requirements are met upon delivery." },
                                { title: "25. Backup Responsibility", content: "PathMakers does not guarantee long-term storage of project backups after completion unless explicitly agreed.\nClients should store and secure their own backups after receiving final files." },
                                { title: "26. Data Loss & External Damage", content: "PathMakers is not liable for issues caused by server crashes, malware, hosting failures, client system errors, or unforeseen digital threats after delivery." },
                                { title: "27. Non-Exclusive Collaboration", content: "PathMakers may work with multiple clients simultaneously.\nEngagement with one client does not imply exclusivity unless separately negotiated." },
                                { title: "28. Client Branding Guidelines", content: "If a client requests branding implementation, the client must provide guidelines and approvals in writing.\nIncorrect or missing brand instructions may affect project design, for which PathMakers is not responsible." },
                                { title: "29. Dispute Handling", content: "Any disputes should first be resolved through direct communication and discussion.\nIf unresolved, both parties agree to attempt mediation before legal action, subject to applicable regional regulations." },
                                { title: "30. Non-Solicitation", content: "Clients agree not to hire, solicit, or attempt to directly engage PathMakers team members without written consent for a period of six months after project completion." }
                            ].map((term, index) => (
                                <div key={index}>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{term.title}</h3>
                                    <p className="leading-relaxed whitespace-pre-line text-justify">
                                        {term.content}
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

export default Terms;
