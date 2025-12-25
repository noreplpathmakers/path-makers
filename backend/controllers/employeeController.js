const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

exports.getMyTasks = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                r.id, r.unique_id, r.message, r.status, r.submission_date,
                r.quoted_price, r.admin_commands, r.admin_expected_date,
                r.tech_stack_frontend, r.tech_stack_backend, r.tech_stack_db,
                r.admin_review_message, r.github_link, r.hosted_link,
                c.name as client_name, c.email as client_email,
                CASE 
                    WHEN r.share_docs_with_employee = true THEN r.attachment_path 
                    ELSE null 
                END as attachment_path
            FROM requests r
            JOIN request_assignments ra ON r.id = ra.request_id
            JOIN clients c ON r.client_id = c.id
            WHERE ra.employee_id = $1
            ORDER BY r.submission_date DESC
        `, [req.user.id]);

        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateTaskStatus = async (req, res) => {
    const { taskId, status, githubLink, hostedLink } = req.body;
    try {
        // Ensure task is assigned to this employee via generic assignment table
        const check = await pool.query('SELECT * FROM request_assignments WHERE request_id = $1 AND employee_id = $2', [taskId, req.user.id]);
        if (check.rows.length === 0) {
            return res.status(403).json({ msg: 'Not authorized to update this task' });
        }

        if (status === 'Under Review') {
            await pool.query(
                'UPDATE requests SET status = $1, github_link = $2, hosted_link = $3 WHERE id = $4',
                [status, githubLink, hostedLink, taskId]
            );
        } else {
            await pool.query('UPDATE requests SET status = $1 WHERE id = $2', [status, taskId]);
        }

        res.json({ msg: 'Status updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getAnalytics = async (req, res) => {
    try {
        const userId = req.user.id;

        // Project Counts via assignments
        const counts = await pool.query(`
            SELECT 
                COUNT(*) FILTER (WHERE r.status != 'Completed') as active_count,
                COUNT(*) FILTER (WHERE r.status = 'Completed') as completed_count
            FROM request_assignments ra
            JOIN requests r ON ra.request_id = r.id
            WHERE ra.employee_id = $1
        `, [userId]);

        // Payment Stats
        const payments = await pool.query(`
            SELECT 
                payment_status,
                SUM(payment_amount) as total_amount
            FROM request_assignments
            WHERE employee_id = $1
            GROUP BY payment_status
        `, [userId]);

        const stats = {
            active_projects: parseInt(counts.rows[0].active_count || 0),
            completed_projects: parseInt(counts.rows[0].completed_count || 0),
            payments: {
                paid: 0,
                pending: 0
            }
        };

        payments.rows.forEach(p => {
            if (p.payment_status === 'Paid') stats.payments.paid = parseFloat(p.total_amount || 0);
            else stats.payments.pending += parseFloat(p.total_amount || 0); // Group all non-paid as pending
        });

        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
