Product Requirements Document: Self-Branding Freelance Platform
Product Name: PathMakers - Digital Solutions & Academic Assistance Platform
Version: 1.0
Date: October 26, 2023
Author: PathMakers
__________________________________________________________________________________
1. Introduction
This document outlines the requirements for the PathMakers self-branding website. The platform aims to showcase our expertise in web development, app development, AI solutions, and academic assistance, providing a seamless experience for clients to view services, book projects, and engage with our team. The website will serve as our primary online presence, reflecting our commitment to quality and innovation through a stunning and responsive user interface.
__________________________________________________________________________________
2. Goals & Objectives
Establish a strong online brand presence: Create a professional and visually appealing website that effectively communicates our services and expertise.
Generate leads and convert clients: Provide clear calls to action and an intuitive booking process to encourage client engagement.
Streamline internal operations: Develop an administrative dashboard for efficient client request management, employee task assignment, and performance tracking.
Showcase past projects and testimonials: Build trust and credibility with potential clients through a portfolio of highlighted work.
Provide comprehensive information: Clearly detail our vision, mission, story, and services to inform and engage visitors.
__________________________________________________________________________________
3. Target Audience
Clients: Individuals and businesses seeking web development, app development, AI solutions, or academic assistance (students, researchers, content creators).
Administrators: The owner(s) of [Your Branding Name] responsible for managing clients, employees, and business operations.
Employees: Developers, writers, and specialists working under the administrator, assigned to client projects.
__________________________________________________________________________________
4. Scope
This project encompasses the development of a full-stack web application with distinct user roles and functionalities.
__________________________________________________________________________________
5. Functional Requirements
5.1. Public-Facing Website (Frontend)
The public-facing website will be accessible to all visitors and will serve as the primary interface for showcasing our brand and services.

5.1.1. Landing Page
Branding: Prominent display of logo, company name, and a compelling tagline.
Hero Section: Visually striking section with a clear value proposition, possibly a rotating banner or video background.
Highlighted Projects/Portfolio: A dynamic section showcasing 3-5 of our best or most relevant projects with brief descriptions and links to case studies/details. This section should have engaging animations.
Call to Action (CTA): Clear and prominent CTAs (e.g., "Get a Quote," "View Services," "Contact Us").
Brief Service Overview: A concise summary of the main services offered.
Testimonials/Client Logos: A rotating carousel of positive client testimonials or logos of companies we've worked with.
Animations: Extensive use of smooth, modern animations for transitions, element appearances, and interactive components.
More Content: Rich visual and textual content designed to engage and inform.

5.1.2. About Page
Vision & Mission: Clearly articulated statements about our company's purpose and future aspirations.
Our Story: A compelling narrative about the founding, journey, and values of [Your Branding Name].
Team Details: Profiles of key team members with photos, roles, and brief bios. This section should be engaging and professional.
Values/Culture: Description of the core values that drive our work.
Animations: Engaging animations for section transitions and content reveal.
More Content: Detailed information to build trust and connection with visitors.

5.1.3. Our Services Page
Service Categories: Clear categorization of services (e.g., Web Development, App Development, AI Solutions, Academic Assistance).
Detailed Service Descriptions: For each service, provide a comprehensive description, outlining what it entails, its benefits, and our approach.
Sub-Services: List specific sub-services within each category (e.g., for Web Development: E-commerce, Portfolio Websites, Custom Web Applications).
Pricing/Quotation Information: General information on how clients can get a quote or a link to the contact form.
Service-Specific CTAs: "Book Now" or "Get a Quote" buttons next to each service or category.
Animations: Dynamic display of services, potentially with hover effects or interactive cards.
More Content: In-depth explanations and examples related to each service.

5.1.4. Contact Page
Contact Form: A form for clients to submit inquiries, including fields for Name, Email, Subject, Message, and Service of Interest (dropdown/checkboxes).
Contact Information: Phone number, email address, and physical address (if applicable).
Location Map: Embedded interactive map (e.g., Google Maps).
Social Media Links: Links to our professional social media profiles.
FAQ Section (Optional but Recommended): Common questions and answers to reduce direct inquiries.
Animations: Subtle animations for form fields and submission.
More Content: Additional information on how clients can reach out and what to expect.
----------------------------------------------------------------------------------
5.2. Admin Dashboard (Backend)
The admin dashboard will be accessible only to authorized administrators and employees.

5.2.1. Authentication & Authorization
Admin Login: Secure login page for administrators.
Employee Login: Secure login page for employees.
Role-Based Access Control: Administrators have full access, while employees have restricted access (e.g., only assigned tasks, view relevant client details).

5.2.2. Client Requests Management (Admin View)
List of Requests: A table displaying all client requests with details such as Unique ID, Client Name, Email, Service Requested, Message, Date Submitted, Status (New, In Progress, Completed, Declined), Assigned Employee.
Filter & Search: Ability to filter requests by status, service, assigned employee, and search by client name or ID.
Request Details View: Clicking on a request displays full details, including the original message.
Status Update: Admin can change the status of a request.
Employee Assignment: Admin can assign a request to one or more employees from a dropdown list of active employees.
Communication Log: A section to log internal communication or notes related to the request.

5.2.3. Employee Management (Admin View)
Add/Edit Employees: Admin can add new employees (Name, Email, Role/Skills) and edit existing employee details.
Employee List: A table displaying all employees, their assigned tasks, and current availability/status.
Disable/Remove Employee: Admin can deactivate or remove an employee account.

5.2.4. Statistics & Analytics (Admin View)
Overview Dashboard: Key metrics at a glance (e.g., total requests, active projects, completed projects, employee workload).
Service-Specific Stats: Number of requests per service type.
Lead Source Tracking (Optional): If implemented, track where clients are coming from.

5.2.5. Billing & Revenue Management (Admin View)
Project-Based Billing: Link projects to billing entries.
Invoice Generation (Optional at v1): Ability to generate simple invoices for completed projects.
Revenue Tracking: Overview of completed project revenue, pending payments.
Payment Status Update: Mark payments as received.

5.2.6. My Tasks (Employee View)
Assigned Tasks List: Employees can see a list of client requests/projects assigned to them.
Task Details: View full details of an assigned request.
Update Task Status: Employees can update the status of their assigned tasks (e.g., "Started," "Awaiting Client Feedback," "Completed").
Communication Log: Ability to add notes or updates related to their assigned tasks for admin review.

5.3. Unique ID Generation for Booked Services
When a client books a service, a unique ID will be generated.
Format: [SERVICE_CODE][4-DIGIT_NUMBER]
SERVICE_CODE: First four letters of the service name (e.g., WEBD for Web Development, APPD for App Development, AIOL for AI Solutions, ACAD for Academic Assistance).
4-DIGIT_NUMBER: A sequential number specific to each service type, padded with leading zeros.
Starting Numbers:
Web Development: 0027
App Development: 0004
All other services: 0001 (or next available for each specific service).
The numbering for each service must continue sequentially from its starting number.
__________________________________________________________________________________
6. Non-Functional Requirements
Performance:
Fast loading times (under 3 seconds on a standard broadband connection).
Optimized images and assets.
Efficient database queries.
Scalability:
Architecture should support future growth in user base and services.
Database capable of handling increasing data volume.
Security:
User authentication and authorization (JWT for API, session management).
Protection against common web vulnerabilities (XSS, CSRF, SQL Injection).
Data encryption (in transit and at rest for sensitive data).
Secure password hashing.
Usability:
Stunning UI/UX: The website design must be modern, elegant, and highly engaging, reflecting our brand's creativity and professionalism.
Mobile Responsiveness: Fully functional and aesthetically pleasing on all devices (desktops, tablets, mobile phones).
Dark/Light Mode: Toggle functionality for user preference.
Touch/Scroll Responsive: Smooth scrolling and intuitive touch interactions for mobile users.
Intuitive navigation and clear information architecture.
Reliability:
High uptime (e.g., 99.9%).
Error handling and logging.
Maintainability:
Clean, well-documented code.
Modular architecture.
Easy to update and add new features.
Accessibility:
Adherence to WCAG 2.1 AA guidelines where possible.
Semantic HTML.
Browser Compatibility:
Support for modern browsers (Chrome, Firefox, Safari, Edge).

7. Technical Stack
Frontend: React.js
Animations: Framer Motion or similar library for smooth, performant animations.
Backend: Node.js
Authentication: rolebased access (admin and employees based on the credentials)
Database: Supabase
Tables for clients, services, requests, employees, projects, billing.
Email Service: EmailJS (for sending automated emails, e.g., contact form submissions, booking confirmations).

8. Database Schema (Supabase - PostgreSQL)
8.1. clients Table
id (UUID, Primary Key)
name (VARCHAR)
email (VARCHAR, UNIQUE)
phone (VARCHAR, NULLABLE)
created_at (TIMESTAMP, DEFAULT NOW())

8.2. services Table
id (UUID, Primary Key)
name (VARCHAR, UNIQUE) - e.g., "Web Development", "App Development", "AI Solutions", "Academic Assistance"
code (VARCHAR, UNIQUE) - e.g., "WEBD", "APPD", "AIOL", "ACAD"
description (TEXT)
starting_number_sequence (INTEGER, DEFAULT 1) - To manage the unique ID sequencing for each service.
created_at (TIMESTAMP, DEFAULT NOW())

8.3. requests Table (Client Bookings/Inquiries)
id (UUID, Primary Key)
unique_id (VARCHAR, UNIQUE) - Generated based on service code and sequence.
client_id (UUID, Foreign Key to clients.id)
service_id (UUID, Foreign Key to services.id)
message (TEXT)
status (VARCHAR, DEFAULT 'New') - ENUM: ('New', 'Assigned', 'In Progress', 'Awaiting Client Feedback', 'Completed', 'Declined')
assigned_employee_id (UUID, Foreign Key to employees.id, NULLABLE)
submission_date (TIMESTAMP, DEFAULT NOW())
last_updated (TIMESTAMP, DEFAULT NOW())
admin_notes (TEXT, NULLABLE)

8.4. employees Table
id (UUID, Primary Key)
name (VARCHAR)
email (VARCHAR, UNIQUE)
password_hash (VARCHAR)
role (VARCHAR, DEFAULT 'employee') - ENUM: ('admin', 'employee')
skills (TEXT, NULLABLE) - Comma-separated or JSONB array
is_active (BOOLEAN, DEFAULT TRUE)
created_at (TIMESTAMP, DEFAULT NOW())

8.5. projects Table (To track progress of assigned requests)
id (UUID, Primary Key)
request_id (UUID, Foreign Key to requests.id, UNIQUE)
project_name (VARCHAR) - Can be derived from request details
start_date (DATE, NULLABLE)
end_date (DATE, NULLABLE)
budget (DECIMAL, NULLABLE)
actual_cost (DECIMAL, NULLABLE)
status (VARCHAR, DEFAULT 'Pending') - ENUM: ('Pending', 'Active', 'On Hold', 'Completed', 'Canceled')
created_at (TIMESTAMP, DEFAULT NOW())

8.6. billing Table
id (UUID, Primary Key)
project_id (UUID, Foreign Key to projects.id)
amount (DECIMAL)
currency (VARCHAR, DEFAULT 'USD')
invoice_number (VARCHAR, UNIQUE, NULLABLE)
payment_status (VARCHAR, DEFAULT 'Pending') - ENUM: ('Pending', 'Paid', 'Overdue', 'Refunded')
due_date (DATE, NULLABLE)
payment_date (DATE, NULLABLE)
created_at (TIMESTAMP, DEFAULT NOW())
__________________________________________________________________________________

9. Success Metrics
Website Traffic: Increase in unique visitors month-over-month.
Conversion Rate: Percentage of visitors who submit a contact form or book a service.
Client Satisfaction: Positive feedback and testimonials.
Operational Efficiency: Reduced time spent on manual client and employee management.
SEO Ranking: Improved search engine visibility for target keywords.
__________________________________________________________________________________

10. Conclusion
This PRD serves as a comprehensive guide for the development of the PathMakers self-branding freelance platform. Adherence to these requirements, especially regarding the UI/UX and technical implementation, will be crucial for delivering a high-quality product that meets our business objectives and impresses our clients.
