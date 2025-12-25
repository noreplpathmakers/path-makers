-- Add attachment columns to requests
ALTER TABLE requests ADD COLUMN IF NOT EXISTS attachment_path TEXT;

-- Add address and org details to clients
ALTER TABLE clients ADD COLUMN IF NOT EXISTS organization_name VARCHAR(255);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS address_door VARCHAR(50);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS address_city VARCHAR(100);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS address_district VARCHAR(100);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS address_state VARCHAR(100);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS address_pincode VARCHAR(20);
