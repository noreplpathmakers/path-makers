const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const updateSchema = async () => {
    try {
        await pool.query('ALTER TABLE requests ADD COLUMN IF NOT EXISTS github_link TEXT');
        await pool.query('ALTER TABLE requests ADD COLUMN IF NOT EXISTS hosted_link TEXT');
        await pool.query('ALTER TABLE requests ADD COLUMN IF NOT EXISTS admin_review_message TEXT');
        console.log('Schema updated successfully');
    } catch (err) {
        console.error('Error updating schema:', err);
    } finally {
        pool.end();
    }
};

updateSchema();
