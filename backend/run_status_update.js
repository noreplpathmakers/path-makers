const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const updateDB = async () => {
    try {
        const sql = fs.readFileSync('../database/update_status_enum.sql', 'utf8');
        await pool.query(sql);
        console.log('Database updated: Status constraint updated to new workflow.');
    } catch (err) {
        console.error('Error updating DB:', err);
    } finally {
        pool.end();
    }
};

updateDB();
