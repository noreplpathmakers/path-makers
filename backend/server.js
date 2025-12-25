const express = require('express');
const dns = require('dns');
// Force IPv4 to avoid IPv6 connection issues (ENETUNREACH)
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// Database Connection
const pool = require('./config/db');

// Test DB Connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to Database at', res.rows[0].now);
    }
});

// Routes
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
    res.send('PathMakers API Running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
