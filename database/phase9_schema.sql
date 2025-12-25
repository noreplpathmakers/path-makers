-- Add last_login_at to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP;

-- Add Project Metadata to requests
ALTER TABLE requests ADD COLUMN IF NOT EXISTS quoted_price VARCHAR(50);
ALTER TABLE requests ADD COLUMN IF NOT EXISTS admin_commands TEXT;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS tech_stack_frontend VARCHAR(100);
ALTER TABLE requests ADD COLUMN IF NOT EXISTS tech_stack_backend VARCHAR(100);
ALTER TABLE requests ADD COLUMN IF NOT EXISTS tech_stack_db VARCHAR(100);
ALTER TABLE requests ADD COLUMN IF NOT EXISTS share_docs_with_employee BOOLEAN DEFAULT FALSE;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS admin_expected_date DATE;

-- Create Assignments Table
CREATE TABLE IF NOT EXISTS request_assignments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_id UUID REFERENCES requests(id) ON DELETE CASCADE,
    employee_id UUID REFERENCES users(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(request_id, employee_id)
);

-- Migrate existing assignments (if any) and then drop the old column
INSERT INTO request_assignments (request_id, employee_id, assigned_at)
SELECT id, assigned_employee_id, created_at
FROM requests
WHERE assigned_employee_id IS NOT NULL
ON CONFLICT DO NOTHING;

-- Optionally drop the old column later, but keeping it for safety for now.
-- ALTER TABLE requests DROP COLUMN assigned_employee_id;
