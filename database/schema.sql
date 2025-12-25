-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Clients Table
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    organization_name VARCHAR(255),
    address_door VARCHAR(100),
    address_city VARCHAR(100),
    address_district VARCHAR(100),
    address_state VARCHAR(100),
    address_pincode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Services Table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    description TEXT,
    starting_number_sequence INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Employees Table
CREATE TABLE IF NOT EXISTS employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'employee' CHECK (role IN ('admin', 'employee')),
    skills TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Requests Table (Client Bookings/Inquiries)
CREATE TABLE IF NOT EXISTS requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unique_id VARCHAR(50) UNIQUE,
    client_id UUID REFERENCES clients(id),
    service_id UUID REFERENCES services(id),
    subject VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'New' CHECK (status IN ('New', 'Assigned', 'In Progress', 'Awaiting Client Feedback', 'Completed', 'Declined')),
    assigned_employee_id UUID REFERENCES employees(id),
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    admin_notes TEXT,
    quoted_price VARCHAR(50),
    admin_commands TEXT,
    tech_stack_frontend VARCHAR(100),
    tech_stack_backend VARCHAR(100),
    tech_stack_db VARCHAR(100),
    share_docs_with_employee BOOLEAN DEFAULT FALSE,
    admin_expected_date DATE,
    price_fixed DECIMAL(10, 2) DEFAULT 0.00,
    amount_received DECIMAL(10, 2) DEFAULT 0.00,
    website_url TEXT,
    project_screenshots TEXT[]
);

-- 5. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES requests(id) UNIQUE,
    project_name VARCHAR(255),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10, 2),
    actual_cost DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Active', 'On Hold', 'Completed', 'Canceled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Billing Table
CREATE TABLE IF NOT EXISTS billing (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id),
    amount DECIMAL(10, 2),
    currency VARCHAR(10) DEFAULT 'USD',
    invoice_number VARCHAR(100) UNIQUE,
    payment_status VARCHAR(50) DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Paid', 'Overdue', 'Refunded')),
    due_date DATE,
    payment_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Request Assignments Table
CREATE TABLE IF NOT EXISTS request_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID REFERENCES requests(id) ON DELETE CASCADE,
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(request_id, employee_id)
);

-- 8. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    services TEXT,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'New'
);

-- Trigger to update last_updated in requests
CREATE OR REPLACE FUNCTION update_last_updated_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.last_updated = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_request_modtime ON requests;

CREATE TRIGGER update_request_modtime
BEFORE UPDATE ON requests
FOR EACH ROW
EXECUTE PROCEDURE update_last_updated_column();
