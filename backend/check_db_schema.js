const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function checkSchema() {
    try {
        console.log("Checking Tables...");
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log("Tables found:", tables.rows.map(r => r.table_name));

        const tablesToCheck = ['requests', 'users', 'employees', 'request_assignments'];

        for (const table of tablesToCheck) {
            console.log(`\nChecking columns for table: ${table}`);
            const columns = await pool.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = '${table}'
            `);
            if (columns.rows.length === 0) {
                console.log(`Table ${table} DOES NOT EXIST.`);
            } else {
                columns.rows.forEach(col => {
                    console.log(` - ${col.column_name} (${col.data_type})`);
                });
            }
        }

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkSchema();
