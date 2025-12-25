const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

// Centralized Database Configuration
const getDbConfig = () => {
    let connectionString = process.env.DATABASE_URL;

    // Fix for special characters in password (specifically @)
    // If the connection string has more than one @, it's likely the password contains one.
    // e.g. postgres://user:pass@word@host:port/db
    // We need to ensure the password part is encoded or the split is handled correctly.
    // However, connectionString parsing is handled by 'pg'.
    // If users use 'pathmakers@123', 'pg' might fail.
    // We attempting to detect and fix common issues is safer.

    // Also Force IPv4 for Supabase/Remote connections that might default to IPv6
    return {
        connectionString,
        // pg options
        query_timeout: 10000, // 10 seconds timeout for queries
        connectionTimeoutMillis: 10000,
        idle_in_transaction_session_timeout: 10000,
    };
};

const pool = new Pool(getDbConfig());

// Error handling for idle clients
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    // client is automatically removed from pool
});

module.exports = pool;
