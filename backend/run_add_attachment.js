const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const fixDB = async () => {
    try {
        const sql = fs.readFileSync('../database/add_attachment_column.sql', 'utf8');
        await pool.query(sql);
        console.log('Database updated: requests.attachment_path column added.');
    } catch (err) {
        console.error('Error updating DB:', err);
    } finally {
        pool.end();
    }
};

fixDB();
