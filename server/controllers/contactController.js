const Contact = require('../models/Contact');
const { sendContactEmail } = require('../services/emailService');

const handleContactSubmission = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save to database
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    await newContact.save();

    // Try to send email, but don't fail the request if it fails
    // as long as we saved it to the DB, we have the message.
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      await sendContactEmail({ name, email, subject, message });
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully.'
    });

  } catch (error) {
    console.error('Contact Submission Error:', error);
    // Return a generic error to the client to avoid leaking internals
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    });
  }
};

module.exports = { handleContactSubmission };
