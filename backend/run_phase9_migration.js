const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const runMigration = async () => {
    try {
        const sql = fs.readFileSync('../database/phase9_schema.sql', 'utf8');
        await pool.query(sql);
        console.log('Phase 9 Schema Migration Completed Successfully.');
    } catch (err) {
        console.error('Migration Failed:', err);
    } finally {
        pool.end();
    }
};

runMigration();
