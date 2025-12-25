const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const fixDB = async () => {
    try {
        const sql = fs.readFileSync('../database/fix_email_constraint.sql', 'utf8');
        await pool.query(sql);
        console.log('Database updated: Email is now optional.');
    } catch (err) {
        console.error('Error updating DB:', err);
    } finally {
        pool.end();
    }
};

fixDB();
