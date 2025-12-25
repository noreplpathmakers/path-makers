const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function runMigration() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        console.log("Starting Phase 11 Migration...");

        // Add financial columns to requests
        console.log("Adding columns to requests...");
        const newCols = [
            'price_fixed DECIMAL(10, 2) DEFAULT 0.00',
            'amount_received DECIMAL(10, 2) DEFAULT 0.00',
            'website_url TEXT',
            'project_screenshots TEXT[]'
        ];

        for (const col of newCols) {
            try {
                await client.query(`ALTER TABLE requests ADD COLUMN ${col}`);
                console.log(`Added column: ${col}`);
            } catch (err) {
                if (err.code === '42701') {
                    console.log(`Column exists: ${col.split(' ')[0]}`);
                } else {
                    throw err;
                }
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
