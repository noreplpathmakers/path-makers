const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const fixDB = async () => {
    try {
        const sql = fs.readFileSync('../database/fix_client_columns.sql', 'utf8');
        await pool.query(sql);
        console.log('Database updated: Client columns added successfully.');
    } catch (err) {
        console.error('Error updating DB:', err);
    } finally {
        pool.end();
    }
};

fixDB();
