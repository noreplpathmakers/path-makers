const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function runMigration() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        console.log("Starting Phase 10 Migration...");

        // Add payment columns to request_assignments
        console.log("Adding payment columns to request_assignments...");

        try {
            await client.query(`
                ALTER TABLE request_assignments 
                ADD COLUMN payment_amount DECIMAL(10, 2) DEFAULT 0.00,
                ADD COLUMN payment_status VARCHAR(50) DEFAULT 'Pending'
            `);
            console.log("Added payment_amount and payment_status");
        } catch (err) {
            if (err.code === '42701') {
                console.log("Columns already exist, skipping.");
            } else {
                throw err;
            }
        }

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
