const validateContactInput = (req, res, next) => {
  const { name, email, subject, message, _honeypot } = req.body;

  // Basic spam resistance (honeypot)
  if (_honeypot) {
    // If honeypot is filled, it's likely a bot. Silently return success to trick the bot.
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  }

  const errors = {};

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.name = 'Name is required';
  } else if (name.length > 100) {
    errors.name = 'Name cannot exceed 100 characters';
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!email || typeof email !== 'string' || email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Please provide a valid email address';
  }

  if (!subject || typeof subject !== 'string' || subject.trim() === '') {
    errors.subject = 'Subject is required';
  } else if (subject.length > 150) {
    errors.subject = 'Subject cannot exceed 150 characters';
  }

  if (!message || typeof message !== 'string' || message.trim() === '') {
    errors.message = 'Message is required';
  } else if (message.length > 2000) {
    errors.message = 'Message cannot exceed 2000 characters';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  // Sanitize by trimming
  req.body.name = name.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.subject = subject.trim();
  req.body.message = message.trim();

  next();
};

module.exports = { validateContactInput };
