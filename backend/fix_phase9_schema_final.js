const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function runMigration() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        console.log("Starting Migration...");

        // 1. Create request_assignments table
        console.log("Creating/Checking request_assignments table...");
        await client.query(`
            CREATE TABLE IF NOT EXISTS request_assignments (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                request_id UUID REFERENCES requests(id) ON DELETE CASCADE,
                employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
                assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(request_id, employee_id)
            );
        `);

        // 2. Add metadata columns to requests
        console.log("Adding columns to requests...");
        const requestCols = [
            'quoted_price VARCHAR(255)',
            'admin_commands TEXT',
            'tech_stack_frontend VARCHAR(255)',
            'tech_stack_backend VARCHAR(255)',
            'tech_stack_db VARCHAR(255)',
            'share_docs_with_employee BOOLEAN DEFAULT FALSE',
            'admin_expected_date DATE'
        ];

        for (const col of requestCols) {
            try {
                // Extremely basic "ADD COLUMN IF NOT EXISTS" pattern via catch
                await client.query(`ALTER TABLE requests ADD COLUMN ${col}`);
                console.log(`Added column: ${col}`);
            } catch (err) {
                if (err.code === '42701') { // duplicate_column
                    console.log(`Column already exists (skipped): ${col.split(' ')[0]}`);
                } else {
                    throw err;
                }
            }
        }

        // 3. Add last_login_at to employees
        console.log("Adding last_login_at to employees...");
        try {
            await client.query(`ALTER TABLE employees ADD COLUMN last_login_at TIMESTAMP WITH TIME ZONE`);
            console.log("Added last_login_at");
        } catch (err) {
            if (err.code === '42701') {
                console.log("last_login_at already exists");
            } else {
                throw err;
            }
        }

        // 4. Migrate existing assignments (if needed)
        // Check if assigned_employee_id exists in requests and migrate if so
        console.log("Migrating legacy assignments...");
        await client.query(`
            INSERT INTO request_assignments (request_id, employee_id)
            SELECT id, assigned_employee_id 
            FROM requests 
            WHERE assigned_employee_id IS NOT NULL 
            ON CONFLICT (request_id, employee_id) DO NOTHING;
        `);

        await client.query('COMMIT');
        console.log("Migration Completed Successfully!");
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Migration Failed:", err);
    } finally {
        client.release();
        pool.end();
    }
}

runMigration();
