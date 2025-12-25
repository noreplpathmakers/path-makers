ALTER TABLE requests DROP CONSTRAINT IF EXISTS requests_status_check;
ALTER TABLE requests ADD CONSTRAINT requests_status_check CHECK (status IN ('Pending', 'Confirmed', 'Ongoing', 'Payment', 'Completed', 'Canceled', 'New')); 
-- Keeping 'New' temporarily to support existing rows, or I can migrate them.
-- Better to migrate 'New' to 'Pending' then enforce new list.

UPDATE requests SET status = 'Pending' WHERE status = 'New';
-- Now restrict strictly
ALTER TABLE requests DROP CONSTRAINT IF EXISTS requests_status_check;
ALTER TABLE requests ADD CONSTRAINT requests_status_check CHECK (status IN ('Pending', 'Confirmed', 'Ongoing', 'Payment', 'Completed', 'Canceled'));
