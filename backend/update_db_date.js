const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const updateDB = async () => {
    try {
        const sql = fs.readFileSync('../database/add_date_column.sql', 'utf8');
        await pool.query(sql);
        console.log('Database updated: Added expected_completion_date column.');
    } catch (err) {
        if (err.code === '42701') { // Duplicate column error
            console.log('Column already exists, skipping.');
        } else {
            console.error('Error updating DB:', err);
        }
    } finally {
        pool.end();
    }
};

updateDB();
