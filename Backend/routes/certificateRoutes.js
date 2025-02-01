// routes/certificateRoutes.js
const express = require('express');
const router = express.Router();
const certificate = require('../controllers/certificateController');  // Import the new controller

// Define the route for generating ownership proof
router.get('/ownership-proof/:id',certificate.createcertificate);

module.exports = router;
