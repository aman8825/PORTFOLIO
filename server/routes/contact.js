const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { validateContactInput } = require('../middleware/validation');
const { handleContactSubmission } = require('../controllers/contactController');

// Rate limiting: maximum 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: {
    success: false,
    message: 'Too many contact requests from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/', contactLimiter, validateContactInput, handleContactSubmission);

module.exports = router;
