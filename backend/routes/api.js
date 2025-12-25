const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});

// Public Routes
router.post('/public/contact', upload.single('attachment'), require('../controllers/publicController').createRequest); // Function: createRequest (Services)
router.post('/public/messages', require('../controllers/publicController').createContactMessage); // New: Contact Form
router.get('/public/track', require('../controllers/publicController').trackRequest);

// Auth Routes
router.post('/auth/login', authController.login);

// Employee Routes
router.get('/employee/tasks', auth, require('../controllers/employeeController').getMyTasks);
router.post('/employee/status', auth, require('../controllers/employeeController').updateTaskStatus);
router.get('/employee/analytics', auth, require('../controllers/employeeController').getAnalytics);

// Admin Routes (Protected)
router.get('/admin/stats', auth, adminController.getStats);
router.get('/admin/messages', auth, adminController.getContactMessages); // New: Messages
router.get('/admin/requests', auth, adminController.getRequests);
router.post('/admin/review', auth, adminController.reviewSubmission); // New: Review Submission
router.get('/admin/employees', auth, adminController.getEmployees);
router.post('/admin/assign', auth, adminController.assignEmployee);
router.post('/admin/employees', auth, adminController.addEmployee);
router.post('/admin/password', auth, adminController.updatePassword);
router.post('/admin/financials', auth, adminController.updateRequestFinancials);
router.get('/admin/clients', auth, adminController.getClients);
router.post('/admin/clients', auth, adminController.createClient);
router.put('/admin/clients/:id', auth, adminController.updateClient);
router.delete('/admin/clients/:id', auth, adminController.deleteClient);

router.put('/admin/employees/:id', auth, adminController.updateEmployee);
router.delete('/admin/employees/:id', auth, adminController.deleteEmployee);

router.get('/admin/export-db', auth, adminController.exportDatabase);

module.exports = router;
