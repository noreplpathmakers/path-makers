const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const runUpdates = async () => {
    try {
        const sql = fs.readFileSync(path.join(__dirname, 'updates_phase8.sql'), 'utf8');
        await pool.query(sql);
        console.log('Database schema updated successfully!');
    } catch (err) {
        console.error('Error updating schema:', err);
    } finally {
        pool.end();
    }
};

runUpdates();
